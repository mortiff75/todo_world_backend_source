import { Service } from "typedi";
import { prismaClient } from "../../config/prisma";
import { hashPassword, verifyPassword } from "../../utils/generate_password";
import UserModel from "../models/user";

export type UserResponseServer<T> =
  | { success: true; data: T }
  | { success: false; error: any; statusCode?: number };

@Service()
export abstract class IUserData<T> {
  abstract register(
    email: string,
    password: string,
    username: string
  ): Promise<T>;
  abstract login(email: string, password: string): Promise<T>;
  abstract logout(userId: string): Promise<boolean>;
}
@Service()
export class UserDataApi implements IUserData<UserResponseServer<UserModel>> {
  // Register User

  async register(
    email: string,
    password: string,
    username: string
  ): Promise<UserResponseServer<UserModel>> {
    // HashPassword
    const hashedPassword = await hashPassword(password);

    const { id } = await prismaClient.user.create({
      data: { email, password: hashedPassword, username },
    });

    return {
      data: UserModel.register({ id, email, password, username }),
      success: true,
    };
  }
  // Login User
  async login(
    email: string,
    password: string
  ): Promise<UserResponseServer<UserModel>> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user)
      return {
        error: "Email or Password is wrong",
        success: false,
        statusCode: 400,
      };

    const passwordValidate = await verifyPassword(password, user.password);

    if (!passwordValidate)
      return {
        error: "Email or Password is wrong",
        success: false,
        statusCode: 400,
      };

    const { id, username } = user;

    return {
      success: true,
      data: UserModel.login({ email, id, username }),
    };
  }

  async logout(userId: string): Promise<boolean> {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    if (user) return true;

    return false;
  }
}
