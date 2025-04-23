import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import * as dataCenterSchema from "../drizzle/schema/dataCenter.schema"
import * as roomSchema from "../drizzle/schema/room.schema"
import * as rackSchema from "../drizzle/schema/rack.schema"
import * as machineSchema from "../drizzle/schema/machine.schema"
import * as subnetSchema from "../drizzle/schema/subnet.schema"
import * as ipPoolSchema from "../drizzle/schema/ipPool.schema"
import * as serviceSchema from "../drizzle/schema/service.schema"
import * as ipAddressSchema from "../drizzle/schema/ipAddress.schema"

console.log(process.env.DATABASE_URL)
const schemas = {
    ...dataCenterSchema,
    ...roomSchema,
    ...rackSchema,
    ...machineSchema,
    ...subnetSchema,
    ...ipPoolSchema,
    ...serviceSchema,
    ...ipAddressSchema
}

// TODO: use singleton for this db instance / connection pool throughout the project
export const db = drizzle<typeof schemas>({
    connection: process.env.DATABASE_URL!,
    casing: "snake_case", // this will convert camelCase (in our schema definition) to snake_case (in actual db)
})
