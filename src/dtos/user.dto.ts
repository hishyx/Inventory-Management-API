import type Roles from "../utils/roles.enum.js";

export type userLoginDataDTO = {
  email: string;
  password: string;
};

export type jwtPayloadDTO = {
  name: string;
  email: string;
  role: Roles;
};

export type newUserDTO = {
  name: string;
  email: string;
  password: string;
  role: Roles;
};
