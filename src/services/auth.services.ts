import * as userRepository from "../repositories/user.repository.js";
import type { newUserDTO, userLoginDataDTO } from "../dtos/user.dto.js";
import httpError from "../utils/custom.error.class.js";
import { generateAccessToken } from "../utils/jwt.helper.js";
import Roles from "../utils/roles.enum.js";
import bcrypt from "bcrypt";

export const login = async (loginData: userLoginDataDTO) => {
  if (!loginData || !loginData.email || !loginData.password)
    throw new httpError("Incomplete credentials");

  const { email, password } = loginData;

  if (!email.includes("@") || email.length == 0) {
    throw new httpError("Invalid email id ", 400);
  }

  const user = await userRepository.getUser(email);

  if (!user) throw new httpError("Invalid Credentials user not found", 404);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new httpError("Invalid Credentials", 404);

  const safeUser = {
    name: user.name,
    email: user.email,
    role: user.role as Roles,
  };

  const token = generateAccessToken(safeUser);

  return { user: safeUser, token: token };
};

export const createUser = async (userData: newUserDTO) => {
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

  const existingUser = await userRepository.getUser(userData.email);

  if (existingUser)
    throw new httpError(
      "User with same email already exists please login",
      409,
    );

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  const { password, ...safeUser } = user.toObject();

  return safeUser;
};

export const editUser = async (id: string, updatedUserData: newUserDTO) => {
  if (!updatedUserData) throw new httpError("Incomplete user information", 400);

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

  const existingUser = await userRepository.getUser(updatedUserData.email);

  if (existingUser && existingUser._id.toString() !== id)
    throw new httpError(
      "User with same email already exists please try another email ",
      409,
    );

  const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);

  const user = await userRepository.updateUser(id, {
    ...updatedUserData,
    password: hashedPassword,
  });

  if (!user) throw new httpError("The user doesn't exist");

  const { password, ...safeUser } = user.toObject();

  return safeUser;
};
