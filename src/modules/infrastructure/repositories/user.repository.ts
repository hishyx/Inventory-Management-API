import type { User as UserEntity } from "../../domain/entities/user.entity.js";
import type IUserRepository from "../../application/interfaces/repositories/user.repository.interface.js";
import { mongoUserToDomainEntity } from "../mappers/mongo.to.domain.js";
import User from "../database/mongo/models/user.model.js";
import type { newUserDTO } from "../../application/dto/user.dto.js";
import { isObjectIdOrHexString } from "mongoose";

export class MongoUserRepository implements IUserRepository {
  async getUserById(id: string): Promise<UserEntity | null> {
    if (!isObjectIdOrHexString(id)) return null;

    const user = await User.findById(id);

    if (!user) return null;

    return mongoUserToDomainEntity(user);
  }
  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ email });

    if (!user) return null;

    return mongoUserToDomainEntity(user);
  }
  async createUser(userData: newUserDTO): Promise<UserEntity | null> {
    const user = await User.insertOne(userData);

    if (!user) return null;

    return mongoUserToDomainEntity(user);
  }
  async updateUser(
    id: string,
    updatedData: newUserDTO,
  ): Promise<UserEntity | null> {
    if (!isObjectIdOrHexString(id)) return null;

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) return null;

    return mongoUserToDomainEntity(user);
  }
}
