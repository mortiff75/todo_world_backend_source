type AppErrorProps = {
  message: string;
  statusCode?: number;
};

class AppError extends Error {
  message: string;
  statusCode?: number;

  constructor({ message, statusCode }: AppErrorProps) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
