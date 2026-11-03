import type { newUserDTO, userLoginDataDTO } from "../dto/user.dto.js";
import httpError from "../utils/custom.error.class.js";
import type IAuthService from "../interfaces/services/auth.services.interface.js";

import { Roles } from "../../domain/enums/user.role.js";
import type IUserRepository from "../interfaces/repositories/user.repository.interface.js";
import type { IPasswordHasher } from "../interfaces/utils/password.hasher.interface.js";
import type { ITokenService } from "../interfaces/utils/jwt.token.service.interface.js";

export class AuthServices implements IAuthService {
  constructor(
    private repo: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private tokenService: ITokenService,
  ) {}
  login = async (loginData: userLoginDataDTO) => {
    if (!loginData || !loginData.email || !loginData.password)
      throw new httpError("Incomplete credentials");

    const { email, password } = loginData;

    if (!email.includes("@") || email.length == 0) {
      throw new httpError("Invalid email id ", 400);
    }

    const user = await this.repo.getUserByEmail(email);

    if (!user) throw new httpError("Invalid credentials", 401);

    const isMatch = await this.passwordHasher.verify(password, user.getPassword());

    if (!isMatch) throw new httpError("Invalid credentials", 401);

    const safeUser = {
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole() as Roles,
    };

    const token = this.tokenService.generateAccessToken(safeUser);

    return { user: safeUser, token: token };
  };

  createUser = async (userData: newUserDTO) => {
    if (!userData) throw new httpError("Incomplete user information", 400);

    if (!userData.name || userData.name.length == 0)
      throw new httpError("Invalid Username", 400);

    if (
      !userData.email ||
      userData.email.length == 0 ||
      !userData.email.includes("@")
    )
      throw new httpError("Invalid Email", 400);

    if (!userData.password || userData.password.length < 4)
      throw new httpError("Password should be atleast 4 charecters", 400);

    if (!Object.values(Roles).includes(userData.role))
      throw new httpError("Please provide a valid role");

    const existingUser = await this.repo.getUserByEmail(userData.email);

    if (existingUser)
      throw new httpError(
        "User with same email already exists please login",
        409,
      );

    const hashedPassword = await this.passwordHasher.hash(userData.password);

    const createdUser = await this.repo.createUser({
      ...userData,
      password: hashedPassword,
    });

    if (!createdUser) throw new httpError("Failed to create user", 500);
  };

  editUser = async (id: string, updatedUserData: newUserDTO) => {
    if (!updatedUserData)
      throw new httpError("Incomplete user information", 400);

    if (!updatedUserData.name || updatedUserData.name.length == 0)
      throw new httpError("Invalid Username", 400);

    if (
      !updatedUserData.email ||
      updatedUserData.email.length == 0 ||
      !updatedUserData.email.includes("@")
    )
      throw new httpError("Invalid Email", 400);

    if (!updatedUserData.password || updatedUserData.password.length < 4)
      throw new httpError("Password should be atleast 4 charecters", 400);

    if (!Object.values(Roles).includes(updatedUserData.role))
      throw new httpError("Please provide a valid role");

    const existingUser = await this.repo.getUserByEmail(updatedUserData.email);

    if (existingUser && existingUser.id !== id)
      throw new httpError(
        "User with same email already exists please try another email ",
        409,
      );

    const hashedPassword = await this.passwordHasher.hash(updatedUserData.password);

    const updatedUser = await this.repo.updateUser(id, {
      ...updatedUserData,
      password: hashedPassword,
    });

    if (!updatedUser) throw new httpError("User doesn't exist", 404);
  };
}
