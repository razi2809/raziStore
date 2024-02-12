import Joi from "joi";

import { IContactInputs } from "../../../@types/generic";
import validation from "../../validation";
import { phonePattern } from "../../pattern/phonePattern";

const contactMeSchema = Joi.object<IContactInputs>({
  fullName: Joi.string().min(2).max(20),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "email cannot be empty",
      "any.required": "email is a required field",
      "string.email": "email is not valid",
    }),
  phoneNumber: Joi.string()
    .min(9)
    .max(11)
    .pattern(phonePattern)
    .required()
    .messages({
      "string.empty": "phoneNumber cannot be empty",
      "any.required": "phoneNumber is a required field",
      "string.pattern.base": "phoneNumber dont match the pattern",
    }),
  request: Joi.string().min(10).max(40),
  freeText: Joi.string().min(2).max(35),
});
const validateContactMe = (inputToCheck: IContactInputs) =>
  validation(contactMeSchema, inputToCheck);
export { validateContactMe };
