import { app } from "../app";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

// Routes Modules
import userRouter from "../interface/user/user_router";
import todosRouter from "../interface/todos/todos_router";
import { handleErrorMiddleware } from "./handle_error";
import { corsOptionsDelegate } from "../config/cors_config";

config({ path: ".env" });

app.use(cors(corsOptionsDelegate));

app.use(express.json());

app.use(cookieParser());

// Routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todos", todosRouter);

// Handle Errors Middleware
app.use(handleErrorMiddleware);
