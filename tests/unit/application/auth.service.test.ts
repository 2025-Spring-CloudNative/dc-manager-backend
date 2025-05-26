import {
  userRegister,
  userLogin,
  userLogout,
  refreshAccessToken,
  getSession,
} from "../../../src/application/services/auth.service";
import { UserRole, IUser } from "../../../src/domain/user";

const mockUser: IUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  passwordHash: "hashedPassword",
  role: UserRole.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const safeUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  role: UserRole.User,
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

describe("auth.service", () => {
  const userRepo = {
    createUser: jest.fn().mockResolvedValue(1),
    getUserByEmail: jest.fn().mockResolvedValue(mockUser),
    getUserById: jest.fn().mockResolvedValue(mockUser),
    getUsers: jest.fn().mockResolvedValue([]),
    updateUser: jest.fn().mockResolvedValue(1),
    deleteUser: jest.fn().mockResolvedValue(1),
  };

  const passwordHasherRepo = {
    hash: jest.fn().mockResolvedValue("hashedPassword"),
    compare: jest.fn().mockResolvedValue(true),
  };

  const JWTRepo = {
    signAccess: jest.fn().mockReturnValue("access.token"),
    signRefresh: jest.fn().mockReturnValue("refresh.token"),
    decode: jest.fn().mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 }),
    verifyAccess: jest.fn().mockReturnValue(1),
    verifyRefresh: jest.fn().mockReturnValue(1),
  };

  const refreshTokenRepo = {
    createRefreshToken: jest.fn().mockResolvedValue(1),
    getRefreshTokenByToken: jest.fn().mockResolvedValue({
      token: "refresh.token",
      userId: 1,
      expiredAt: new Date(Date.now() + 3600 * 1000),
    }),
    deleteRefreshToken: jest.fn().mockResolvedValue(1),
    getRefreshTokens: jest.fn().mockResolvedValue([]),
    updateRefreshToken: jest.fn().mockResolvedValue(1),
  };

  it("should register a user", async () => {
    const result = await userRegister(
      userRepo,
      passwordHasherRepo,
      JWTRepo,
      refreshTokenRepo,
      { ...mockUser }
    );

    expect(result).toEqual({
      accessToken: "access.token",
      refreshToken: "refresh.token",
      user: safeUser,
    });
  });

  it("should login a user", async () => {
    const result = await userLogin(
      userRepo,
      passwordHasherRepo,
      JWTRepo,
      refreshTokenRepo,
      { email: "test@example.com", password: "password" }
    );

    expect(result).toEqual({
      accessToken: "access.token",
      refreshToken: "refresh.token",
      user: safeUser,
    });
  });

  it("should fail login with invalid password", async () => {
    passwordHasherRepo.compare.mockResolvedValueOnce(false);

    await expect(
      userLogin(userRepo, passwordHasherRepo, JWTRepo, refreshTokenRepo, {
        email: "test@example.com",
        password: "wrong",
      })
    ).rejects.toThrow("Invalid email or password");
  });

  it("should logout user by deleting refresh token", async () => {
    const result = await userLogout(refreshTokenRepo, "refresh.token");
    expect(result).toBe(1);
  });

  it("should refresh access token", async () => {
    const result = await refreshAccessToken(
      userRepo,
      JWTRepo,
      refreshTokenRepo,
      "refresh.token"
    );

    expect(result).toEqual({
      accessToken: "access.token",
      user: safeUser,
    });
  });

  it("should throw if refresh token is expired", async () => {
    refreshTokenRepo.getRefreshTokenByToken.mockResolvedValueOnce({
      token: "refresh.token",
      userId: 1,
      expiredAt: new Date(Date.now() - 1000),
    });

    await expect(
      refreshAccessToken(userRepo, JWTRepo, refreshTokenRepo, "refresh.token")
    ).rejects.toThrow("The refresh token has expired, user has been logged out");
  });

  it("should get session from access token", async () => {
    const result = await getSession(userRepo, JWTRepo, "access.token");
    expect(result).toEqual(safeUser);
  });

  it("should throw if access token is invalid", async () => {
    JWTRepo.verifyAccess.mockReturnValueOnce(null);

    await expect(getSession(userRepo, JWTRepo, "invalid.token")).rejects.toThrow("Unauthorized user");
  });
});
