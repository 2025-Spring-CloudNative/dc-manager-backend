import { IUser } from "../../domain/user"

export interface IUserRepository {
    getUsers(): Promise<IUser[]>
    getUserById(id: number): Promise<IUser>
    createUser(user: IUser): Promise<number>
    updateUser(id: number, user: Partial<IUser>): Promise<IUser>
    deleteUser(id: number): Promise<number>
}