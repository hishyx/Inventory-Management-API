import type { jwtPayloadDTO } from "../dtos/user.dto.ts";

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayloadDTO;
    }
  }
}

export {};
