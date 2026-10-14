import jwt from "jsonwebtoken";
import type { jwtPayloadDTO } from "../dtos/user.dto.js";
import httpError from "./custom.error.class.js";

export const generateAccessToken = (payload: jwtPayloadDTO): string => {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;

  if (!JWT_SECRET) throw new httpError("No jwt secret key found", 500);

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

export const verifyToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;

  if (!JWT_SECRET) throw new httpError("No jwt secret key found", 500);

  const payload = jwt.verify(token, JWT_SECRET);

  console.log("payload is ", payload);

  return payload as jwtPayloadDTO;
};
