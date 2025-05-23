import { NextFunction, Request, Response } from "express";
import AppError from "./custome_error";
import { tokenReserve } from "../config/di";
import { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "./express_async_handler";
import { prismaClient } from "../config/prisma";

export const protect_auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token)
      throw new AppError({ message: "Token is missing", statusCode: 401 });

    const { id } = <JwtPayload>tokenReserve.verify(token);

    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user)
      throw new AppError({
        message: "Token invalid or expire please login again ):",
        statusCode: 401,
      });
    req.user = { ...user };
    next();
  }
);
