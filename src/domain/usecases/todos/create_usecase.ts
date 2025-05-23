import { Inject, Service } from "typedi";
import { ITodsoRepository } from "../../repositories/i_todo_repository";
import { TodosRepository } from "../../../data/repositories/todo_repo";
import { TodosResponseServer } from "../../../data/source/todo";
import TodoModel from "../../../data/models/todo";

@Service()
class CreateTodoUsecase {
  @Inject(() => TodosRepository)
  repository: ITodsoRepository<TodosResponseServer<TodoModel>>;

  constructor(repo: ITodsoRepository<TodosResponseServer<TodoModel>>) {
    this.repository = repo;
  }

  async call(newTodo: TodoModel): Promise<TodosResponseServer<TodoModel>> {
    const result = await this.repository.create(newTodo);
    return result;
  }
}

export default CreateTodoUsecase;
