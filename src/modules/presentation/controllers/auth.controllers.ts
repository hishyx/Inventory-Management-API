import type { Request, Response } from "express";
import type IAuthService from "../../application/interfaces/services/auth.services.interface.js";
import { getParam } from "../utils/validation.js";

export class AuthControllers {
  constructor(private services: IAuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const response = await this.services.login(req.body);

    res.json(response);
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    const response = await this.services.createUser(req.body);

    res.json(response);
  };

  editUser = async (req: Request, res: Response): Promise<void> => {
    const id = getParam(req.params.id);

    const response = await this.services.editUser(id, req.body);

    res.json(response);
  };
}
