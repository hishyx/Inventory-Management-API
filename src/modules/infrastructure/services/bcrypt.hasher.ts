import type { IPasswordHasher } from "../../application/interfaces/utils/password.hasher.interface.js";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements IPasswordHasher {
  hash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  verify = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
  };
}
