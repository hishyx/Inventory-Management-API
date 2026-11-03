import type { Roles } from "../../domain/enums/user.role.js";

export type userLoginDataDTO = {
  email: string;
  password: string;
};

export type tokenPayloadDTO = {
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

export type loggedUser = {
  user: { name: string; email: string; role: Roles };
  token: string;
};
