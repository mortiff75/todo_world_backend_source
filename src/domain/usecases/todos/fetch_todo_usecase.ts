import { Inject, Service } from "typedi";
import { ITodsoRepository } from "../../repositories/i_todo_repository";
import { TodosResponseServer } from "../../../data/source/todo";
import TodoModel from "../../../data/models/todo";
import { TodosRepository } from "../../../data/repositories/todo_repo";

@Service()
class FetchTodoUsecase {
  @Inject(() => TodosRepository)
  private repository: ITodsoRepository<TodosResponseServer<TodoModel>>;

  constructor(repo: ITodsoRepository<TodosResponseServer<TodoModel>>) {
    this.repository = repo;
  }

  async call(id: string): Promise<TodosResponseServer<TodoModel>> {
    return this.repository.fetchTodo(id);
  }
}

export default FetchTodoUsecase;
