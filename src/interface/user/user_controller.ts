import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { asyncHandler } from "../../utils/express_async_handler";
import {
  loginUsecase,
  logoutUsecase,
  registerUsecase,
  tokenReserve,
} from "../../config/di";
import AppError from "../../utils/custome_error";

@Service()
class UserController {
  // @Rgister
  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password, username } = req.body;

      const result = await registerUsecase.call(email, password, username);

      if (!result.success)
        throw new AppError({
          message: result.error,
          statusCode: result.statusCode,
        });

      res.json(result);
    }
  );

  // @ Login User
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      const result = await loginUsecase.call({ email, password });

      if (!result.success)
        throw new AppError({
          message: result.error,
          statusCode: result.statusCode,
        });

      tokenReserve.reserve(result.data.getId!, res, result.data);
    }
  );

  // @logout User

  logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      await logoutUsecase.call(res, req, next);
    }
  );
}

export default UserController;
