import { Inject, Service } from "typedi";
import TodoModel from "../../../data/models/todo";
import { TodosResponseServer } from "../../../data/source/todo";
import { ITodsoRepository } from "../../repositories/i_todo_repository";
import { TodosRepository } from "../../../data/repositories/todo_repo";

@Service()
class DeleteTodoUsecase {
  @Inject(() => TodosRepository)
  repository: ITodsoRepository<TodosResponseServer<TodoModel>>;

  constructor(repo: ITodsoRepository<TodosResponseServer<TodoModel>>) {
    this.repository = repo;
  }

  async call(todoId: string) {
    return this.repository.delete(todoId);
  }
}

export default DeleteTodoUsecase;
