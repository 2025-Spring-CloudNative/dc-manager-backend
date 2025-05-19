import bcrypt from "bcryptjs"

export interface IPasswordHasherRepository {
    hash(raw: string): Promise<string>
    compare(raw: string, hashed: string): Promise<boolean>
}

export class PasswordHasherRepository implements IPasswordHasherRepository {
    async hash(raw: string) {
        const hashed = await bcrypt.hash(raw, 10)
        return hashed
    }

    async compare(raw: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(raw, hashed)       
    }
}