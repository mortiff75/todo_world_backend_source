import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { IUserRepository } from "../../repositories/i_user_repository";
import { UserRepository } from "../../../data/repositories/user_repo";
import { UserResponseServer } from "../../../data/source/user";
import UserModel from "../../../data/models/user";
import { tokenReserve } from "../../../config/di";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../../utils/custome_error";

@Service()
class LogoutUsecase {
  @Inject(() => UserRepository)
  private repository: IUserRepository<UserResponseServer<UserModel>>;

  constructor(repo: IUserRepository<UserResponseServer<UserModel>>) {
    this.repository = repo;
  }

  async call(res: Response, req: Request, next: NextFunction) {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      throw next({
        message: "You dont have any token Please Login again",
        statusCode: 401,
      });
    }

    const { id } = <JwtPayload>tokenReserve.verify(token);

    const result = await this.repository.logout(id);

    if (!result)
      throw new AppError({
        message: "Your token is expired or invalid Please Login",
        statusCode: 401,
      });

    res
      .clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" })
      .json({ success: true, message: "Logout Successfully" });
  }
}

export default LogoutUsecase;
