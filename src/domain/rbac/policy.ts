import { UserRole, IUser } from "../user"

const actions = ["*", "create", "read", "update", "delete"] as const
export type Action = (typeof actions)[number]

const resources = [
    "*",
    "DataCenter",
    "Room",
    "Rack",
    "Machine",
    "Service",
    "Subnet",
    "User"
] as const
export type Resource = (typeof resources)[number]

export type Permission = {
    resource: Resource
    action: Action[]
}

export type RBACPolicy = {
    [key in UserRole]: Permission[]
}

export const POLICY: RBACPolicy = {
    admin: [
        {
            resource: "*",
            action: ["*"]
        }
    ],
    user: [
        {
            resource: "DataCenter",
            action: ["read"]
        },
        {
            resource: "Room",
            action: ["read"]
        },
        {
            resource: "Rack",
            action: ["read"]
        },
        {
            resource: "Machine",
            action: ["*"]
        },
        {
            resource: "Service",
            action: ["*"]
        },
        {
            resource: "Subnet",
            action: ["read"]
        },
        {
            resource: "User",
            action: ["*"]
        }
    ]
} as const

/*
Core Helper Function
usage: 
    can(userObject, "read", "DataCenter")   // true
    can(userObject, "create", "DataCenter") // false
*/
export function can(user: IUser, action: Action, resource: Resource): boolean {
    const permissions = POLICY[user.role] ?? []
    for (const p of permissions) {
        if (
            p.resource === "*" ||
            (p.resource === resource && p.action.includes("*")) ||
            p.action.includes(action)
        ) {
            return true
        }
    }
    return false
}
