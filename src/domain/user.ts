export enum UserRole {
    User = "user",
    Admin = "admin"
}

export interface IUser {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: UserRole
    createdAt?: Date
    updatedAt?: Date
}

export type SafeUser = Omit<IUser, "passwordHash">

export class UserEntity implements IUser {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: UserRole
    createdAt?: Date
    updatedAt?: Date

    constructor(user: IUser) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.passwordHash = user.passwordHash
        this.role = user.role
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
    }

    toSafeUser(): SafeUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    canUpdateUser(targetUser: IUser, data: Partial<IUser>): boolean {
        // admin
        if (this.role === UserRole.Admin) {
            return true
        }

        // user can only update their own info
        // user cannot update role
        if (
            this.id === targetUser.id &&
            (data.role === undefined || data.role === this.role)
        ) {
            return true
        }

        return false
    }
}
