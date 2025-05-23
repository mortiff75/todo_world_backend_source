import { NextFunction, Request, Response } from "express";
import AppError from "./custome_error";
import { ValidationError } from "yup";
import { JsonWebTokenError } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

export function handleErrorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let message: string | any = error.message || "Internal Server Error";
  let statusCode: number = error.statusCode || 500;

  if (error instanceof JsonWebTokenError) {
    message = "Invalid Token Please Login Again";
    statusCode = 401;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      message = "Someone registered with this email";
      statusCode = 401;
    }

    if (error.code === "P2025") {
      message = error.meta?.cause;
      statusCode = 400;
    }
  }

  if (error instanceof ValidationError) {
    message = undefined;
    statusCode = 400;
    message = error.errors;
  }
  //  IF IN STATE PRODUCTION
  const env = process.env.NODE_ENV;

  if (env?.trim() === "development") {
    res.status(statusCode).json({
      message,
      stackTrace: new AppError({ message, statusCode }).stack,
    });

    return;
  }

  res.status(statusCode).json({ message });
}
