import Joi from "joi";
import validation from "../../validation";

const emailScema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "email cannot be empty",
      "any.required": "email is a required field",
      "string.email": "email is not valid",
    }),
});
const validateEmail = (inputToCheck: { email: string }) =>
  validation(emailScema, inputToCheck);
export { validateEmail };
