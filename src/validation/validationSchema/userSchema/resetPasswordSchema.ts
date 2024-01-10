import Joi from "joi";
import { passwordPattern } from "../../pattern/passwordPattern";
import { IResetPasswordInputs } from "../../../@types/inputs";
import validation from "../../validation";

const resetPasswordSchema = Joi.object<IResetPasswordInputs>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
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
  passwordConfirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "passwords does not match",
      "string.empty": "passworConfirmation cannot be empty",
    }),
  passwordResetCode: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.empty": "verificationCode cannot be empty",
      "any.required": "verificationCode is a required field",
      "string.guid": "verificationCode must be a valid code",
    }),
});
const validateResetPassword = (inputToCheck: IResetPasswordInputs) =>
  validation(resetPasswordSchema, inputToCheck);
export { validateResetPassword };
