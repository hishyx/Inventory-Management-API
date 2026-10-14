import type { NextFunction, Request, Response } from "express";
import httpError from "../utils/custom.error.class.js";
import { verifyToken } from "../utils/jwt.helper.js";
import type Roles from "../utils/roles.enum.js";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new httpError("Authentication token required", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new httpError("Authentication token required", 401));
  }

  const user = verifyToken(token);

  console.log("hello");

  if (!user) throw new httpError("Invalid token", 401);

  req.user = user;

  console.log(req.user);

  next();
};

export const isAuthorized = (...allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user)
      throw new httpError("User not authenticated please try again", 401);

    if (!allowedRoles.includes(user.role))
      throw new httpError("User is not authorized for this action", 403);

    next();
  };
};
