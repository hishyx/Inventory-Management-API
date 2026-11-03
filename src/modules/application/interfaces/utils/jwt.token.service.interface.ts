import type { tokenPayloadDTO } from "../../dto/user.dto.js";

export interface ITokenService {
  generateAccessToken(payload: tokenPayloadDTO): string;
  verifyToken(token: string): tokenPayloadDTO | null;
}
