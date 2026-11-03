import type { inventoryItemDTO } from "../../application/dto/item.dto.js";
import Inventory from "../database/mongo/models/inventory.model.js";
import type { InventoryItem } from "../../domain/entities/inventory-item.entity.js";
import type IInventoryRepository from "../../application/interfaces/repositories/inventory.repository.interface.js";
import { mongoInventoryToDomainEntity } from "../mappers/mongo.to.domain.js";
import { isObjectIdOrHexString } from "mongoose";

export class MongoInventoryRepository implements IInventoryRepository {
  async addItem(item: inventoryItemDTO): Promise<InventoryItem | null> {
    const createdItem = await Inventory.insertOne(item);

    if (!createdItem) return null;

    return mongoInventoryToDomainEntity(createdItem);
  }
  async getItemById(id: string): Promise<InventoryItem | null> {
    if (!isObjectIdOrHexString(id)) return null;

    const item = await Inventory.findById(id);

    if (!item) return null;

    return mongoInventoryToDomainEntity(item);
  }
  async getItemByName(name: string): Promise<InventoryItem | null> {
    const item = await Inventory.findOne({ name });

    if (!item) return null;

    return mongoInventoryToDomainEntity(item);
  }
  async editItemById(
    id: string,
    newData: inventoryItemDTO,
  ): Promise<InventoryItem | null> {
    if (!isObjectIdOrHexString(id)) return null;

    const item = await Inventory.findByIdAndUpdate(id, newData, { new: true });

    if (!item) return null;

    return mongoInventoryToDomainEntity(item);
  }
  async getAllItems(): Promise<InventoryItem[]> {
    const items = await Inventory.find({});

    return items.map((item) => mongoInventoryToDomainEntity(item));
  }
  async deleteItem(id: string): Promise<boolean> {
    if (!isObjectIdOrHexString(id)) return false;

    const item = await Inventory.findByIdAndDelete(id);

    return item !== null;
  }
}
