import type { NextFunction, Request, Response } from "express";
import httpError from "../../application/utils/custom.error.class.js";
import type { ITokenService } from "../../application/interfaces/utils/jwt.token.service.interface.js";
import { Roles } from "../../domain/enums/user.role.js";

export class AuthMiddleware {
  constructor(private tokenService: ITokenService) {}

  isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new httpError("Authentication token required", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new httpError("Authentication token required", 401));
    }

    const user = this.tokenService.verifyToken(token);

    if (!user) {
      return next(new httpError("Invalid token", 401));
    }

    req.user = user;

    console.log(req.user);

    next();
  };

  isAuthorized = (...allowedRoles: Roles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;

      if (!user)
        throw new httpError("User not authenticated please try again", 401);

      if (!allowedRoles.includes(user.role))
        throw new httpError("User is not authorized for this action", 403);

      next();
    };
  };
}
