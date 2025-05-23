import { Inject, Service } from "typedi";
import TodoModel from "../../../data/models/todo";
import {
  TodosResponseServer,
  UpdatedTodoItem,
} from "../../../data/source/todo";
import { ITodsoRepository } from "../../repositories/i_todo_repository";
import { TodosRepository } from "../../../data/repositories/todo_repo";

@Service()
class UpdateTodoUsecase {
  @Inject(() => TodosRepository)
  repository: ITodsoRepository<TodosResponseServer<TodoModel>>;

  constructor(repo: ITodsoRepository<TodosResponseServer<TodoModel>>) {
    this.repository = repo;
  }

  async call(todoId: string, newTodo: UpdatedTodoItem) {
    return this.repository.update(todoId, newTodo);
  }
}

export default UpdateTodoUsecase;
