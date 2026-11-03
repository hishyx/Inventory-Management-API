import { Roles } from "../enums/user.role.js";
export class User {
  constructor(
    public readonly id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: Roles,
  ) {}

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
  }
}
