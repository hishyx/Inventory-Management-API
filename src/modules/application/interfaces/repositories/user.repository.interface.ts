import type { newUserDTO } from "../../dto/user.dto.js";
import type { User } from "../../../domain/entities/user.entity.js";

export default interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(userData: newUserDTO): Promise<User | null>;
  updateUser(id: string, updatedData: newUserDTO): Promise<User | null>;
}
