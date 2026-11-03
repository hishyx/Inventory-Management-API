import type IInventoryService from "../../application/interfaces/services/inventory.services.interface.js";
import type { Request, Response } from "express";
import { getParam } from "../utils/validation.js";

export class InventoryControllers {
  constructor(private services: IInventoryService) {}

  addItem = async (req: Request, res: Response): Promise<void> => {
    const item = await this.services.addItem(req.body);

    res.json({ success: true });
  };

  editItem = async (req: Request, res: Response): Promise<void> => {
    const id = getParam(req.params.id);

    const item = await this.services.editItem(id, req.body);

    res.json({ success: true });
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    const items = await this.services.getAll();

    res.json(items);
  };

  getItem = async (req: Request, res: Response): Promise<void> => {
    const id = getParam(req.params.id);

    const item = await this.services.getItem(id);

    res.json(item);
  };

  removeItem = async (req: Request, res: Response): Promise<void> => {
    const id = getParam(req.params.id);

    await this.services.removeItem(id);

    res.json({ success: true });
  };
}
