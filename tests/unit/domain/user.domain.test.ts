import { UserEntity, UserRole, IUser } from "../../../src/domain/user"

describe("UserEntity", () => {
  const baseUser: IUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    passwordHash: "hashed",
    role: UserRole.User,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  it("should create UserEntity correctly", () => {
    const user = new UserEntity(baseUser)
    expect(user.email).toBe("alice@example.com")
    expect(user.role).toBe(UserRole.User)
  })

  it("should convert to safe user (without passwordHash)", () => {
    const user = new UserEntity(baseUser)
    const safe = user.toSafeUser()

    expect(safe).not.toHaveProperty("passwordHash")
    expect(safe).toMatchObject({
      id: baseUser.id,
      name: baseUser.name,
      email: baseUser.email,
      role: baseUser.role
    })
  })

  describe("canUpdateUser", () => {
    it("Admin can update any user", () => {
      const admin = new UserEntity({ ...baseUser, id: 99, role: UserRole.Admin })
      const target: IUser = { ...baseUser, id: 2 }

      const result = admin.canUpdateUser(target, { name: "new name", role: UserRole.User })
      expect(result).toBe(true)
    })

    it("Admin can update themselves", () => {
      const admin = new UserEntity({ ...baseUser, role: UserRole.Admin })
      const result = admin.canUpdateUser(admin, { name: "admin updated" })
      expect(result).toBe(true)
    })

    it("User can update themselves without changing role", () => {
      const user = new UserEntity(baseUser)
      const result = user.canUpdateUser(baseUser, { name: "new name" })
      expect(result).toBe(true)
    })

    it("User cannot change their own role", () => {
      const user = new UserEntity(baseUser)
      const result = user.canUpdateUser(baseUser, { role: UserRole.Admin })
      expect(result).toBe(false)
    })

    it("User cannot update other users", () => {
      const user = new UserEntity(baseUser)
      const otherUser: IUser = { ...baseUser, id: 2, name: "Bob" }

      const result = user.canUpdateUser(otherUser, { name: "hacked" })
      expect(result).toBe(false)
    })

    it("User cannot update other users even without changing role", () => {
      const user = new UserEntity(baseUser)
      const otherUser: IUser = { ...baseUser, id: 2, name: "Bob" }

      const result = user.canUpdateUser(otherUser, { name: "legit change" })
      expect(result).toBe(false)
    })
  })
})
