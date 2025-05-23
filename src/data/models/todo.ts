type TodoProps = {
  id?: string;
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
};

class TodoModel {
  private id?: string;
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;

  constructor({
    createdAt,
    description,
    id,
    title,
    updatedAt,
    userId,
  }: TodoProps) {
    this.createdAt = createdAt;
    this.description = description;
    this.id = id;
    this.title = title;
    this.updatedAt = updatedAt;
    this.userId = userId;
  }

  static fromMap(json: any): TodoModel {
    return new TodoModel({
      id: json["id"] ?? undefined,
      title: json["title"] ?? undefined,
      createdAt: json["createdAt"] ?? undefined,
      updatedAt: json["updatedAt"] ?? undefined,
      description: json["description"] ?? undefined,
      userId: json["userId"] ?? undefined,
    });
  }
}

export default TodoModel;
