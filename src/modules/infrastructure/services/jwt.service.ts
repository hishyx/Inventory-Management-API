import type { tokenPayloadDTO } from "../../application/dto/user.dto.js";
import type { ITokenService } from "../../application/interfaces/utils/jwt.token.service.interface.js";
import jwt from "jsonwebtoken";
import env from "../../../config/zod.env.js";

export class JwtService implements ITokenService {
  generateAccessToken = (payload: tokenPayloadDTO): string => {
    const JWT_SECRET = env.JWT_SECRET_KEY;

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return token;
  };

  verifyToken = (token: string): tokenPayloadDTO | null => {
    const JWT_SECRET = env.JWT_SECRET_KEY;

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      return payload as tokenPayloadDTO;
    } catch (err) {
      return null;
    }
  };
}
