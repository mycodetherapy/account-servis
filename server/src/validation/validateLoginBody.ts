import { Joi, celebrate } from "celebrate";

export const validateLoginBody = celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(4).max(30).required().messages({
      "string.min": "Minimum field length is 4 characters.",
      "string.max": "Maximum field length is 30 characters.",
    }),
    email: Joi.string().required().email().messages({
      "string.email": "Field must contain an email address.",
    }),
  }),
});
