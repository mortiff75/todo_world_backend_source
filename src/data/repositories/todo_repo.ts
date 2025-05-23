import { Inject, Service } from "typedi";
import { ITodsoRepository } from "../../domain/repositories/i_todo_repository";
import TodoModel from "../models/todo";
import {
  FetchTodosProps,
  ITodosData,
  TodoDataApi,
  TodosResponseServer,
  UpdatedTodoItem,
} from "../source/todo";

@Service()
export class TodosRepository
  implements ITodsoRepository<TodosResponseServer<TodoModel>>
{
  @Inject(() => TodoDataApi)
  private data: ITodosData<TodosResponseServer<TodoModel>>;

  constructor(iTodoData: ITodosData<TodosResponseServer<TodoModel>>) {
    this.data = iTodoData;
  }
  fetchTodo(id: string): Promise<TodosResponseServer<TodoModel>> {
    return this.data.fetchTodo(id);
  }

  async fetchTodos(
    props: FetchTodosProps
  ): Promise<TodosResponseServer<TodoModel>> {
    return this.data.fetchTodos(props);
  }
  async create(newTodo: TodoModel): Promise<TodosResponseServer<TodoModel>> {
    return this.data.create(newTodo);
  }

  delete(todoId: string): Promise<TodosResponseServer<TodoModel>> {
    return this.data.delete(todoId);
  }
  update(
    todoId: string,
    updatedItem: UpdatedTodoItem
  ): Promise<TodosResponseServer<TodoModel>> {
    return this.data.update(todoId, updatedItem);
  }
}
