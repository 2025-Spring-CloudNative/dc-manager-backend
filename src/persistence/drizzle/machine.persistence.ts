import { eq, ilike, desc, asc, and, SQL } from "drizzle-orm"
import { PgColumn } from "drizzle-orm/pg-core"
import { IMachine } from "../../domain/machine"
import { IMachineRepository } from "../repositories/machine.repository"
import { db } from "./index"
import { machineTable } from "./schema/machine.schema"
import { ipAddressTable } from "./schema/ipAddress.schema"
import { MachineQueryParams } from "../../application/services/machine.service"

function buildMachineQueryFilters(queryParams?: MachineQueryParams): SQL[] {
    if (!queryParams) {
        return []
    }
    const filters: SQL[] = []
    if (queryParams.name) {
        filters.push(ilike(machineTable.name, `%${queryParams.name}%`))
    }
    if (queryParams.macAddress) {
        filters.push(ilike(machineTable.macAddress, `%${queryParams.macAddress}%`))
    }
    if (queryParams.status) {
        filters.push(ilike(machineTable.status, `%${queryParams.status}%`))
    }
    if (queryParams.rackId) {
        filters.push(eq(machineTable.rackId, queryParams.rackId))
    }
    return filters
}

function buildMachineQueryOrder(queryParams?: MachineQueryParams): SQL[] {
    if (!queryParams || !queryParams.sortBy) {
        return []
    }
    let column: PgColumn
    switch(queryParams.sortBy) {
        case 'name':
            column = machineTable.name
            break
        case 'unit':
            column = machineTable.unit
            break
        case 'macAddress':
            column = machineTable.macAddress
            break
        case 'status':
            column = machineTable.status
            break
        case 'createdAt':
            column = machineTable.createdAt
            break
        default:
            column = machineTable.id
            break
    }
    const orderFn = queryParams.sortOrder === 'desc' ? desc : asc
    return [orderFn(column)]
}

export class MachineDrizzleRepository implements IMachineRepository {
    async getMachines(machineQueryParams?: MachineQueryParams) {
        const filters = buildMachineQueryFilters(machineQueryParams)
        const order = buildMachineQueryOrder(machineQueryParams)

        const machines = await db
            .select()
            .from(machineTable)
            .where(filters.length ? and(...filters) : undefined)
            .orderBy(...order)

        return machines
    }

    async getMachinesWithIPAddress() {
        const machinesWithIPAddress = await db.query.ipAddressTable.findMany({
            with: {
                machine: true
            }
        })
        return machinesWithIPAddress
    }

    async getMachineById(id: number) {
        const [machine] = await db
            .select()
            .from(machineTable)
            .where(eq(machineTable.id, id))
        
        return machine as IMachine
    }

    async getMachineByIdWithIPAddress(id: number) {
        const machineWithIPAddress = await db.query.ipAddressTable.findFirst({
            with: {
                machine: true
            },
            where: eq(ipAddressTable.machineId, id)
        })
        return machineWithIPAddress as Object
    }

    async createMachine(machine: IMachine) {
        const [createdMachine] = await db
            .insert(machineTable)
            .values(machine)
            .returning({ id: machineTable.id })

        return createdMachine?.id as number
    }

    async updateMachine(id: number, machine: Partial<IMachine>) {
        const [updatedMachine] = await db
            .update(machineTable)
            .set(machine)
            .where(eq(machineTable.id, id))
            .returning()
        
        return updatedMachine as IMachine
    }

    async deleteMachine(id: number) {
        const [deletedMachine] = await db
            .delete(machineTable)
            .where(eq(machineTable.id, id))
            .returning({ id: machineTable.id })
        
        return deletedMachine?.id as number
    }
}
