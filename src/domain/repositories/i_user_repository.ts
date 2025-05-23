import { Service } from "typedi";

@Service()
export abstract class IUserRepository<T> {
  abstract register(
    email: string,
    password: string,
    username: string
  ): Promise<T>;
  abstract login(email: string, password: string): Promise<T>;
  abstract logout(userId: string): Promise<boolean>;
}
