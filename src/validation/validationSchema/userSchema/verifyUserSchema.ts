import Joi from "joi";
import { IVerifyInputs } from "../../../@types/inputs";
import validation from "../../validation";

const verifyUserSchema = Joi.object<IVerifyInputs>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "email cannot be empty",
      "any.required": "email is a required field",
      "string.email": "must be a valid email",
    }),
  verificationCode: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.empty": "verificationCode cannot be empty",
      "any.required": "verificationCode is a required field",
      "string.guid": "verificationCode must be a valid code",
    }),
});
const validateVerify = (inputToCheck: IVerifyInputs) =>
  validation(verifyUserSchema, inputToCheck);
export { validateVerify };
