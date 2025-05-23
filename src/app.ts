import express from "express";
import "reflect-metadata";

export const app = express();

// Setup Middlewares
import "./utils/middlewares";
