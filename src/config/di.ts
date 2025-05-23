import { Container } from "typedi";
import { IUserRepository } from "../domain/repositories/i_user_repository";
import { UserRepository } from "../data/repositories/user_repo";
import { UserResponseServer } from "../data/source/user";
import UserModel from "../data/models/user";
import { RegisterUsecase } from "../domain/usecases/user/register_usecase";
import UserController from "../interface/user/user_controller";
import LoginUsecase from "../domain/usecases/user/login_usecase";
import ReserveToken from "../utils/token";
import LogoutUsecase from "../domain/usecases/user/logout_usecase";
import { ITodsoRepository } from "../domain/repositories/i_todo_repository";
import { TodosResponseServer } from "../data/source/todo";
import TodoModel from "../data/models/todo";
import { TodosRepository } from "../data/repositories/todo_repo";
import { FetchTodosUsecase } from "../domain/usecases/todos/fetch_usecase";
import TodosController from "../interface/todos/todos_controller";
import CreateTodoUsecase from "../domain/usecases/todos/create_usecase";
import UpdateTodoUsecase from "../domain/usecases/todos/update_usecase";
import DeleteTodoUsecase from "../domain/usecases/todos/delete_usecase";
import FetchTodoUsecase from "../domain/usecases/todos/fetch_todo_usecase";

// Users Injections
const userDi = Container.of("userDi");

export const userRepository =
  userDi.get<IUserRepository<UserResponseServer<UserModel>>>(UserRepository);

export const registerUsecase = userDi.get<RegisterUsecase>(RegisterUsecase);

export const loginUsecase = userDi.get<LoginUsecase>(LoginUsecase);
export const logoutUsecase = userDi.get<LogoutUsecase>(LogoutUsecase);

export const userController = userDi.get<UserController>(UserController);

// Token
const tokenDi = Container.of("token");

export const tokenReserve = tokenDi.get<ReserveToken>(ReserveToken);

// Todos Injections

const todosDi = Container.of("todos");

export const todosRepository =
  todosDi.get<ITodsoRepository<TodosResponseServer<TodoModel>>>(
    TodosRepository
  );

export const fetchTodosUsecase =
  todosDi.get<FetchTodosUsecase>(FetchTodosUsecase);
export const createTodoUsecase =
  todosDi.get<CreateTodoUsecase>(CreateTodoUsecase);

export const updateTodoUsecase =
  todosDi.get<UpdateTodoUsecase>(UpdateTodoUsecase);
export const deleteTodoUsecase =
  todosDi.get<DeleteTodoUsecase>(DeleteTodoUsecase);

export const fetchTodoUsecase = todosDi.get<FetchTodoUsecase>(FetchTodoUsecase);

export const todosController = todosDi.get<TodosController>(TodosController);
