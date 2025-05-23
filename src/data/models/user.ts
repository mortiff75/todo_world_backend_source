import * as yup from "yup";

export const userRequestValidate = yup.object().shape({
  username: yup.string().trim().required("Please Add Username"),
  email: yup
    .string()
    .email("Please Add valid Email")
    .trim()
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password is weak")
    .required("Please Add Password"),
});

export interface UserProps {
  id?: string;
  email: string;
  password?: string;
  username?: string;
  token?: string | null;
}

class UserModel {
  private id?: string;
  email: string;
  password?: string;
  username?: string;
  token?: string | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.username = props.username;
    this.token = props.token;
  }

  get getId(): string | undefined {
    return this.id;
  }

  static register({
    email,
    password,
    username,
    id: string,
  }: UserProps): UserModel {
    return new UserModel({ email, password, username });
  }

  static login({ email, id, token, username }: UserProps): UserModel {
    return new UserModel({ email, id, token, username });
  }
}

export default UserModel;
