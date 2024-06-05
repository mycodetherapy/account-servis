import { BadRequestError } from "./BadRequestError";
import { DuplicateEmailError } from "./DuplicateEmailError";
import { ForbiddenError } from "./ForbiddenError";
import { NotFoundError } from "./NotFoundError";
import { UnauthorizedError } from "./UnauthorizedError";

const errors = {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  DuplicateEmailError,
  UnauthorizedError,
};

export default errors;