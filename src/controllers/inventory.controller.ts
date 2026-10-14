import type { Request, Response } from "express";
import * as inventoryServices from "../services/inventory.services.js";
import httpError from "../utils/custom.error.class.js";
import { isValidObjectId } from "../utils/objectId.validation.js";

export const addItem = async (req: Request, res: Response) => {
  const item = await inventoryServices.addItem(req.body);

  res.json({ success: true, ...item });
};

export const editItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  isValidObjectId(id);

  const item = await inventoryServices.editItem(id, req.body);

  res.json({ success: true, ...item });
};

export const getAll = async (req: Request, res: Response) => {
  const items = await inventoryServices.getAll();

  res.json(items);
};

export const getItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  isValidObjectId(id);

  const item = await inventoryServices.getItem(id);

  res.json(item);
};

export const removeItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  isValidObjectId(id);

  await inventoryServices.removeItem(id);

  res.json({ success: true });
};
