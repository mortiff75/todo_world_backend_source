import { Service } from "typedi";
import { prismaClient } from "../../config/prisma";
import TodoModel from "../models/todo";
import AppError from "../../utils/custome_error";

export type UpdatedTodoItem = {
  title?: string;
  description?: string;
  createdAt?: string;
};

export type FetchTodosProps = {
  id: string;
  page?: number;
  limit?: number;
  search?: string;
};

export type TodosResponseServer<T> =
  | {
      success: true;
      data?: T | T[];
      totalPage?: number;
      next?: number | undefined;
      prev?: number | undefined;
      currentPage?: number;
    }
  | {
      success: false;
      error: any;
      statusCode?: number;
    };

@Service()
export abstract class ITodosData<T> {
  abstract fetchTodos(props: FetchTodosProps): Promise<T>;

  abstract create(newTodo: TodoModel): Promise<T>;
  abstract fetchTodo(id: string): Promise<T>;
  abstract delete(todoId: string): Promise<T>;
  abstract update(todoId: string, updatedItem: UpdatedTodoItem): Promise<T>;
}

@Service()
export class TodoDataApi implements ITodosData<TodosResponseServer<TodoModel>> {
  async fetchTodos({
    id,
    limit,
    page,
    search,
  }: FetchTodosProps): Promise<TodosResponseServer<TodoModel>> {
    const currentPage = (page ? page * 1 : 1) || 1;
    const lim = limit || 10;
    const skip = (currentPage - 1) * lim;

    const results = await prismaClient.todos.findMany({
      where: { title: { contains: search }, userId: id },

      skip,
      take: lim,
      orderBy: [{ createdAt: "desc" }],
    });

    const todos = results.map((todo) => TodoModel.fromMap(todo));

    const total = await prismaClient.todos.count({
      where: { userId: id, title: { contains: search } },
    });

    const totalPage = Math.ceil(total / lim);
    const next = currentPage < totalPage ? currentPage + 1 : undefined;
    const prev = currentPage > 1 ? currentPage - 1 : undefined;
    return {
      success: true,
      data: todos,
      totalPage,
      currentPage,
      next,
      prev,
    };
  }
  async create({
    title,
    userId,
    description,
    createdAt,
  }: TodoModel): Promise<TodosResponseServer<TodoModel>> {
    const todo = await prismaClient.todos.create({
      data: {
        title: title!,
        userId: userId!,
        description: description!,
        createdAt,
      },
    });

    return { success: true, data: new TodoModel({ ...todo }) };
  }

  async delete(todoId: string): Promise<TodosResponseServer<TodoModel>> {
    await prismaClient.todos.delete({ where: { id: todoId } });

    return { success: true };
  }
  async update(
    todoId: string,
    updatedItem: UpdatedTodoItem
  ): Promise<TodosResponseServer<TodoModel>> {
    const newTodo = await prismaClient.todos.update({
      data: { ...updatedItem },
      where: { id: todoId },
    });

    return { success: true, data: TodoModel.fromMap(newTodo) };
  }

  async fetchTodo(id: string): Promise<TodosResponseServer<TodoModel>> {
    const todo = await prismaClient.todos.findUnique({ where: { id } });

    if (!todo)
      return {
        success: false,
        error: new AppError({
          message: "This Todo Not Exist",
          statusCode: 400,
        }),
      };

    return { success: true, data: TodoModel.fromMap(todo) };
  }
}
