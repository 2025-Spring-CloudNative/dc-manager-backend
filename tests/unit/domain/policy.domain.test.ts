import { can, POLICY, Action, Resource } from "../../../src/domain/rbac/policy"
import { UserRole, IUser } from "../../../src/domain/user"



describe("can", () => {
    const adminUser: IUser = { id: 1, role: "admin" as UserRole, name: "Admin", email: "admin@example.com", passwordHash: "hash1" }
    const normalUser: IUser = { id: 2, role: "user" as UserRole, name: "User", email: "user@example.com", passwordHash: "hash2" }
    const unknownUser: IUser = { id: 3, role: "unknown" as UserRole, name: "Unknown", email: "unknown@example.com", passwordHash: "hash3" }

    it("should allow admin to perform any action on any resource", () => {
        (["create", "read", "update", "delete"] as Action[]).forEach(action => {
            (["DataCenter", "Room", "Rack", "Machine", "Service", "Subnet", "User"] as Resource[]).forEach(resource => {
                expect(can(adminUser, action, resource)).toBe(true)
            })
        })
    })

    it("should allow user to read DataCenter, Room, Rack, Subnet", () => {
        expect(can(normalUser, "read", "DataCenter")).toBe(true)
        expect(can(normalUser, "read", "Room")).toBe(true)
        expect(can(normalUser, "read", "Rack")).toBe(true)
        expect(can(normalUser, "read", "Subnet")).toBe(true)
    })

    it("should not allow user to create DataCenter, Room, Rack, Subnet", () => {
        expect(can(normalUser, "create", "DataCenter")).toBe(false)
        expect(can(normalUser, "create", "Room")).toBe(false)
        expect(can(normalUser, "create", "Rack")).toBe(false)
        expect(can(normalUser, "create", "Subnet")).toBe(false)
    })

    it("should allow user all actions on Machine, Service, User", () => {
        (["create", "read", "update", "delete"] as Action[]).forEach(action => {
            expect(can(normalUser, action, "Machine")).toBe(true)
            expect(can(normalUser, action, "Service")).toBe(true)
            expect(can(normalUser, action, "User")).toBe(true)
        })
    })

    it("should return false for unknown user role", () => {
        expect(can(unknownUser, "read", "DataCenter")).toBe(false)
        expect(can(unknownUser, "create", "Machine")).toBe(false)
    })

    it("should return false for actions not permitted", () => {
        expect(can(normalUser, "update", "DataCenter")).toBe(false)
        expect(can(normalUser, "delete", "Room")).toBe(false)
        expect(can(normalUser, "update", "Subnet")).toBe(false)
    })
})