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
}