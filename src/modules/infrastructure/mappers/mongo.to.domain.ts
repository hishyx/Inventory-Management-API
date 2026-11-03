import type { InventoryType } from "../database/mongo/models/inventory.model.js";
import type { HydratedDocument } from "mongoose";
import { InventoryItem } from "../../domain/entities/inventory-item.entity.js";
import type { UserType } from "../database/mongo/models/user.model.js";
import { User } from "../../domain/entities/user.entity.js";
import type { Roles } from "../../domain/enums/user.role.js";

type MongoInventoryDocument = HydratedDocument<InventoryType>;
type MongoUserDocument = HydratedDocument<UserType>;

export const mongoInventoryToDomainEntity = (
  item: MongoInventoryDocument,
): InventoryItem => {
  return new InventoryItem(
    item._id.toString(),
    item.name,
    item.stock,
    item.category,
    item.description,
    item.images,
  );
};

export const mongoUserToDomainEntity = (user: MongoUserDocument): User => {
  return new User(
    user._id.toString(),
    user.name,
    user.email,
    user.password,
    user.role as Roles,
  );
};
