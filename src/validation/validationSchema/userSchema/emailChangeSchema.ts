import Joi from "joi";

import { IUpdateEmailInput } from "../../../@types/inputs";
import validation from "../../validation";

const emailChangeSchema = Joi.object<IUpdateEmailInput>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "email cannot be empty",
      "any.required": "email is a required field",
      "string.email": "email is not valid",
    }),
});
const validateEmailChange = (inputToCheck: IUpdateEmailInput) =>
  validation(emailChangeSchema, inputToCheck);
export { validateEmailChange };
