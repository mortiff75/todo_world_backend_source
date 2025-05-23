import express from "express";
import { todosController } from "../../config/di";
import { protect_auth } from "../../utils/authorize_secure";

const router = express();

router
  .get("/", protect_auth, todosController.fetch)
  .post("/", protect_auth, todosController.create)
  .put("/:todoId", protect_auth, todosController.update)
  .delete("/:todoId", protect_auth, todosController.delete)
  .get("/:id", protect_auth, todosController.fetchTodo);

export default router;
