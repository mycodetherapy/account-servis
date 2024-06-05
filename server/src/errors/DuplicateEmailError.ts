export class DuplicateEmailError extends Error {
  statusCode: number;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = 409;
    Object.setPrototypeOf(this, DuplicateEmailError.prototype);
  }
}
