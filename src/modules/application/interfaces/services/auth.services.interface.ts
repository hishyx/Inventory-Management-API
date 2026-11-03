import type {
  loggedUser,
  newUserDTO,
  userLoginDataDTO,
} from "../../dto/user.dto.js";

export default interface IAuthService {
  login(loginData: userLoginDataDTO): Promise<loggedUser>;
  createUser(userData: newUserDTO): Promise<void>;
  editUser(id: string, updatedUserData: newUserDTO): Promise<void>;
}
