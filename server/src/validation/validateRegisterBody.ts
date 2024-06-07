import { Joi, celebrate } from "celebrate";
import validator from "validator";

export const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(4).max(30).required().messages({
      'string.min': 'Minimum field length is 4 characters.',
      'string.max': 'Maximum field length is 30 characters.',
      'any.required': 'Field is required.',
    }),
    email: Joi.string().required().email().messages({
      'any.required': 'Field is required.',
      'string.email': 'Field must contain an email address.',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Minimum field length is 2 characters.',
      'string.max': 'Maximum field length is 30 characters.',
    }),
    birthDate: Joi.date().iso().required().messages({
        'any.required': 'Field is required.',
        'date.iso': ' Field must contain the date in ISO format.',
      }),
    gender: Joi.string().valid("male", "female", "other").required().messages({
        'any.required': 'Field is required.',
        'any.only': 'Gender field must be one of the values: male, female, other.',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
    }).messages({
      'any.custom': 'Field must contain a link',
    }),
  }),
});
