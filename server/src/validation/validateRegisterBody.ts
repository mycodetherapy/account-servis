// import { Joi, celebrate } from "celebrate";
// import validator from "validator";

// export const validateRegisterBody = celebrate({
//   body: Joi.object().keys({
//     password: Joi.string().min(4).max(30).required().messages({
//       'string.min': 'Минимальная длина поля 4 символа.',
//       'string.max': 'Максимальная длина поля 30 символов.',
//       'any.required': 'Поле обязательно для заполнения.',
//     }),
//     email: Joi.string().required().email().messages({
//       'any.required': 'Поле обязательно для заполнения.',
//       'string.email': 'Поле должно содержать адрес электронной почты.',
//     }),
//     name: Joi.string().min(2).max(30).messages({
//       'string.min': 'Минимальная длина поля 2 символа.',
//       'string.max': 'Максимальная длина поля 30 символов.',
//     }),
//     about: Joi.string().min(2).max(30).messages({
//       'string.min': 'Минимальная длина поля 2 символа.',
//       'string.max': 'Максимальная длина поля 30 символов.',
//     }),
//     avatar: Joi.string().custom((value, helpers) => {
//       if (validator.isURL(value)) {
//         return value;
//       }
//     }).messages({
//       'any.custom': 'Поле должно содержать ссылку.',
//     }),
//   }),
// });
