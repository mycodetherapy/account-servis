export class ForbiddenError extends Error {
  statusCode: number;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = 403;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
