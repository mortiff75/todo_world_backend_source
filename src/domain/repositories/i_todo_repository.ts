import { Service } from "typedi";
import TodoModel from "../../data/models/todo";
import { FetchTodosProps, UpdatedTodoItem } from "../../data/source/todo";

@Service()
export abstract class ITodsoRepository<T> {
  abstract fetchTodos(props: FetchTodosProps): Promise<T>;

  abstract create(newTodo: TodoModel): Promise<T>;
  abstract fetchTodo(id: string): Promise<T>;

  abstract delete(todoId: string): Promise<T>;
  abstract update(todoId: string, updatedItem: UpdatedTodoItem): Promise<T>;
}
