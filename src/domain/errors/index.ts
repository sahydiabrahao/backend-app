export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidCredentialsError extends HttpError {
  constructor() {
    super('Invalid credentials', 401);
  }
}

export class MissingParamsError extends HttpError {
  constructor() {
    super('Missing required parameters', 400);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super('An internal server error occurred', 500);
  }
}

export class MissingTokenError extends HttpError {
  constructor() {
    super('Missing or invalid token', 401);
  }
}

export class ExpiredTokenError extends HttpError {
  constructor() {
    super('Token expired', 401);
  }
}

export class EmailAlreadyExistsError extends HttpError {
  constructor() {
    super('Email already in use', 409);
  }
}
