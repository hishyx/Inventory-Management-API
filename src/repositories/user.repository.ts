import type { newUserDTO, userLoginDataDTO } from "../dtos/user.dto.js";
import User from "../models/user.model.js";
import type Roles from "../utils/roles.enum.js";

export const getUser = async (identifier: string, isId: boolean = false) => {
  if (isId) {
    return await User.findById(identifier);
  }

  return await User.findOne({ email: identifier });
};

export const createUser = async (userData: newUserDTO) => {
  return await User.insertOne(userData);
};

export const updateUser = async (id: string, updatedData: newUserDTO) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};
