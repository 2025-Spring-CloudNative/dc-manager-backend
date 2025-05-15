import { IUser, UserEntity } from "../../domain/user"
import { RefreshTokenEntity } from "../../domain/refreshToken"
import { IUserRepository } from "../../persistence/repositories/user.repository"
import { IRefreshTokenRepository } from "../../persistence/repositories/refreshToken.repository"
import { IPasswordHasherRepository } from "../../persistence/repositories/hash.repository"
import { IJWTRepository } from "../../persistence/repositories/jwt.repository"

export type UserLoginInfo = {
    email: string
    password: string
}

export type SafeUser = Omit<IUser, "passwordHash">

/* assume auto-login after register */
export async function userRegister(
    userRepo: IUserRepository,
    passwordHasherRepo: IPasswordHasherRepository,
    JWTRepo: IJWTRepository,
    refreshTokenRepo: IRefreshTokenRepository,
    user: IUser,
) {
    const userEntity = new UserEntity(user)
    /* hash the password */
    userEntity.passwordHash = await passwordHasherRepo.hash(userEntity.passwordHash)
    
    const createdUserId = await userRepo.createUser(userEntity)

    /* generate accessToken and refreshToken */
    const accessToken = JWTRepo.signAccess(userEntity)
    const refreshToken = JWTRepo.signRefresh(userEntity)
    
    const refreshTokenEntity = new RefreshTokenEntity({
        userId: createdUserId,
        token: refreshToken,
        expiredAt: new Date(JWTRepo.decode(refreshToken).exp as number)
    })
    /* store refreshToken to database */
    const createdRefreshTokenId = await refreshTokenRepo
        .createRefreshToken(refreshTokenEntity)

    /* strip sensitive information of user */
    const { passwordHash, ...safeUser } = userEntity

    return {
        accessToken,
        refreshToken,
        user: safeUser as SafeUser
    }
}

export async function userLogin(
    userRepo: IUserRepository,
    passwordHasherRepo: IPasswordHasherRepository,
    JWTRepo: IJWTRepository,
    refreshTokenRepo: IRefreshTokenRepository,
    userLoginInfo: UserLoginInfo
) {
    const user = await userRepo.getUserByEmail(userLoginInfo.email)
    if (!user) {
        throw new Error("Invalid email or password")
    }
    
    const isPasswordValid = await passwordHasherRepo.compare(
        userLoginInfo.password,
        user.passwordHash
    )
    if (!isPasswordValid) {
        throw new Error("Invalid email or password")
    }
    const userEntity = new UserEntity(user)

    /* generate accessToken and refreshToken */
    const accessToken = JWTRepo.signAccess(userEntity)
    const refreshToken = JWTRepo.signRefresh(userEntity)

    const refreshTokenEntity = new RefreshTokenEntity({
        userId: user.id as number,
        token: refreshToken,
        expiredAt: new Date(JWTRepo.decode(refreshToken).exp as number)
    })
    
    const createdRefreshTokenId = await refreshTokenRepo
        .createRefreshToken(refreshTokenEntity)

    /* strip sensitive information of user */
    const { passwordHash, ...safeUser } = userEntity

    return {
        accessToken,
        refreshToken,
        user: safeUser as SafeUser
    }
}

export async function userLogout(
    refreshTokenRepo: IRefreshTokenRepository,
    refreshToken: string
) {
    const deletedRefreshTokenId = await refreshTokenRepo
        .deleteRefreshToken(refreshToken)
    
    return deletedRefreshTokenId
}

export async function refreshAccessToken(
    userRepo: IUserRepository,
    JWTRepo: IJWTRepository,
    refreshTokenRepo: IRefreshTokenRepository,
    refreshToken: string
) {
    const userId = JWTRepo.verifyRefresh(refreshToken)
    const existRefreshToken = await refreshTokenRepo
        .getRefreshTokenByToken(refreshToken)

    /* check whether the refreshToken is expired or not */
    const now: Date = new Date()
    if (now > existRefreshToken.expiredAt) {
        const deletedRefreshTokenId = await refreshTokenRepo
            .deleteRefreshToken(refreshToken)
        
        throw new Error("The refresh token has expired, user has been logged out")
    }

    const user = await userRepo.getUserById(userId)
    const accessToken = JWTRepo.signAccess(user)

    /* strip sensitive information of user */
    const { passwordHash, ...safeUser } = user
    return {
        accessToken,
        user: safeUser as SafeUser
    }
}

export async function getSession(
    userRepo: IUserRepository,
    JWTRepo: IJWTRepository,
    accessToken: string
) {
    const userId = JWTRepo.verifyAccess(accessToken)
    if (!userId) {
        throw new Error('Unauthorized user')
    }
    const user = await userRepo.getUserById(userId)
    const { passwordHash, ...safeUser } = user

    return safeUser as SafeUser
}