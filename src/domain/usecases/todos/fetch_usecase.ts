import { Inject, Service } from "typedi";
import { ITodsoRepository } from "../../repositories/i_todo_repository";
import {
  FetchTodosProps,
  TodosResponseServer,
} from "../../../data/source/todo";
import TodoModel from "../../../data/models/todo";
import { TodosRepository } from "../../../data/repositories/todo_repo";

@Service()
export class FetchTodosUsecase {
  @Inject(() => TodosRepository)
  private repo: ITodsoRepository<TodosResponseServer<TodoModel>>;

  constructor(repository: ITodsoRepository<TodosResponseServer<TodoModel>>) {
    this.repo = repository;
  }

  async call(props: FetchTodosProps) {
    return await this.repo.fetchTodos(props);
  }
}
