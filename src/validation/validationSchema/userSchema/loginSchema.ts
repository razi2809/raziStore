import Joi from "joi";
import { ILoginInputs } from "../../../@types/inputs";
import validation from "../../validation";
import { passwordPattern } from "../../pattern/passwordPattern";

const loginScema = Joi.object<ILoginInputs>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "email cannot be empty",
      "any.required": "email is a required field",
      "string.email": "email is not valid",
    }),
  password: Joi.string()
    .pattern(passwordPattern)
    .messages({
      "string.pattern.base":
        "password should be at least one special charcter and one upper case charcter",
      "string.empty": "password should be at least 7 charcters",
      "string.min": "Password must be at least 7 characters long",
    })
    .min(7)
    .max(20)
    .required(),
});
const validateLogin = (inputToCheck: ILoginInputs) =>
  validation(loginScema, inputToCheck);
export { validateLogin };
