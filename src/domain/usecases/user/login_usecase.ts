import { Inject, Service } from "typedi";
import { IUserRepository } from "../../repositories/i_user_repository";
import { UserRepository } from "../../../data/repositories/user_repo";
import { UserResponseServer } from "../../../data/source/user";
import UserModel, { userRequestValidate } from "../../../data/models/user";

type LoginUsecaseProps = {
  email: string;
  password: string;
};

@Service()
class LoginUsecase {
  @Inject(() => UserRepository)
  private repo: IUserRepository<UserResponseServer<UserModel>>;

  constructor(repository: IUserRepository<UserResponseServer<UserModel>>) {
    this.repo = repository;
  }

  async call({ email, password }: LoginUsecaseProps) {
    // Validate UserInputes
    await userRequestValidate.validate(
      { email, password, username: "a" },
      { abortEarly: false }
    );

    return await this.repo.login(email, password);
  }
}

export default LoginUsecase;
