import { Joi, celebrate } from "celebrate";
import { isPath } from "../utils/utils";

export const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(4).max(30).required().messages({
      "string.min": "Minimum field length is 4 characters.",
      "string.max": "Maximum field length is 30 characters.",
    }),
    email: Joi.string().required().email().messages({
      "string.email": "Field must contain an email address.",
    }),
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Minimum field length is 2 characters.",
      "string.max": "Maximum field length is 30 characters.",
    }),
    birthDate: Joi.date().iso().required().messages({
      "date.iso": " Field must contain the date in ISO format.",
    }),
    gender: Joi.string().valid("male", "female", "other").required().messages({
      "any.only":
        "Gender field must be one of the values: male, female, other.",
    }),
    profilePhoto: Joi.string().custom((value, helpers) => {
      if (!isPath(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }).messages({
      'any.invalid': 'The field must contain a valid path.',
    }),
  }),
});
