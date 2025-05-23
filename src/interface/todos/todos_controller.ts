import { Service } from "typedi";
import { asyncHandler } from "../../utils/express_async_handler";
import { NextFunction, Request, Response } from "express";
import {
  createTodoUsecase,
  deleteTodoUsecase,
  fetchTodosUsecase,
  fetchTodoUsecase,
  updateTodoUsecase,
} from "../../config/di";
import AppError from "../../utils/custome_error";
import TodoModel from "../../data/models/todo";

type QueryType = {
  page: number | undefined;
  search: string | undefined;
  limit: number | undefined;
};

@Service()
class TodosController {
  // Fetch Todos
  fetch = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page, search } = req.query as QueryType;

      const result = await fetchTodosUsecase.call({
        page,
        search,
        id: req.user?.id!,
      });

      res.json(result);
    }
  );

  fetchTodo = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      console.log(id);

      const result = await fetchTodoUsecase.call(id);

      if (!result.success) throw result.error;

      res.json(result);
    }
  );

  create = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { title, description, createdAt } = req.body;
      const { id: userId } = req.user!;
      console.log(req.body);

      const result = await createTodoUsecase.call(
        TodoModel.fromMap({ title, description, userId, createdAt })
      );

      if (!result.success)
        throw new AppError({
          message: result.error,
          statusCode: result.statusCode,
        });

      res.status(201).json(result);
    }
  );

  update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { todoId } = req.params;

      const result = await updateTodoUsecase.call(todoId, {
        title: req.body?.title,
        description: req.body?.description,
        createdAt: req.body?.createdAt,
      });

      res.status(200).json(result);
    }
  );

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { todoId } = req.params;

      const result = await deleteTodoUsecase.call(todoId);

      res.json(result);
    }
  );
}
export default TodosController;
