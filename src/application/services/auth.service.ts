import { IUser, UserEntity } from "../../domain/user"
import { RefreshTokenEntity } from "../../domain/refreshToken"
import { IUserRepository } from "../../persistence/repositories/user.repository"
import { IRefreshTokenRepository } from "../../persistence/repositories/refreshToken.repository"
import { IPasswordHasherRepository } from "../../persistence/repositories/hash.repository"
import { IJWTRepository } from "../../persistence/repositories/jwt.repository"

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
    
    const createdRefreshTokenId = await refreshTokenRepo
        .createRefreshToken(refreshTokenEntity)

    return {
        accessToken,
        refreshToken,
        user
    }
}