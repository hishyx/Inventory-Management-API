import type { tokenPayloadDTO } from "../../application/dto/user.dto.ts";

declare global {
  namespace Express {
    interface Request {
      user?: tokenPayloadDTO;
    }
  }
}

export {};
