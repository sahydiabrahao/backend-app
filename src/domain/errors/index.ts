export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
    this.name = 'InvalidCredentialsError';
  }
}

export class MissingParamsError extends Error {
  constructor() {
    super('Missing params error');
    this.name = 'MissingParamsError';
  }
}

export class InternalServerError extends Error {
  constructor() {
    super('Internal server error');
    this.name = 'InternalServerError';
  }
}
