import { Inject, Service } from "typedi";
import { IUserRepository } from "../../domain/repositories/i_user_repository";
import UserModel from "../models/user";
import { IUserData, UserDataApi, UserResponseServer } from "../source/user";

@Service()
export class UserRepository
  implements IUserRepository<UserResponseServer<UserModel>>
{
  @Inject(() => UserDataApi)
  data: IUserData<UserResponseServer<UserModel>>;

  constructor(source: IUserData<UserResponseServer<UserModel>>) {
    this.data = source;
  }

  register(
    email: string,
    password: string,
    username: string
  ): Promise<UserResponseServer<UserModel>> {
    return this.data.register(email, password, username);
  }
  async login(
    email: string,
    password: string
  ): Promise<UserResponseServer<UserModel>> {
    return this.data.login(email, password);
  }

  logout(userId: string): Promise<boolean> {
    return this.data.logout(userId);
  }
}
