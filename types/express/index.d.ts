declare namespace Express {
  export interface Request {
    user?: UserProps;
  }
}

interface UserProps {
  id: string;
  email: string;
  password?: string;
  username?: string;
  token?: string | null;
}
