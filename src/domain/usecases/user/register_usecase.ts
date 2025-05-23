import { Inject, Service } from "typedi";
import { IUserRepository } from "../../repositories/i_user_repository";
import { UserResponseServer } from "../../../data/source/user";
import UserModel, { userRequestValidate } from "../../../data/models/user";
import { UserRepository } from "../../../data/repositories/user_repo";

@Service()
export class RegisterUsecase {
  repository: IUserRepository<UserResponseServer<UserModel>>;

  constructor(
    @Inject(() => UserRepository)
    repo: IUserRepository<UserResponseServer<UserModel>>
  ) {
    this.repository = repo;
  }

  async call(email: string, password: string, username: string) {
    // @Validation User Request
    await userRequestValidate.validate(
      { email, password, username },
      { abortEarly: false }
    );

    return await this.repository.register(email, password, username);
  }
}
