import type { Request, Response } from "express";
import * as authServices from "../services/auth.services.js";
import { isValidObjectId } from "../utils/objectId.validation.js";

export const login = async (req: Request, res: Response) => {
  const response = await authServices.login(req.body);

  res.json(response);
};

export const createUser = async (req: Request, res: Response) => {
  const response = await authServices.createUser(req.body);

  res.json(response);
};

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  isValidObjectId(id);

  const response = await authServices.editUser(id, req.body);

  res.json(response);
};
