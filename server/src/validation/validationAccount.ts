import { Joi, celebrate } from "celebrate";
import { isPath } from "../utils/utils";

export const validateAccount = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional().messages({
      "string.min": "Minimum field length is 2 characters.",
      "string.max": "Maximum field length is 30 characters.",
    }),
    password: Joi.string().min(4).max(30).optional().messages({
      "string.min": "Minimum field length is 4 characters.",
      "string.max": "Maximum field length is 30 characters.",
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
