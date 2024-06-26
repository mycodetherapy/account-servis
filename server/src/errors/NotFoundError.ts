export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
