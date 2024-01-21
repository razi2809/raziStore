import Joi from "joi";
import { IUpdatePhoneInput } from "../../../@types/generic";
import validation from "../../validation";
import { phonePattern } from "../../pattern/phonePattern";

const phoneChangeSchema = Joi.object<IUpdatePhoneInput>({
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
});
const validatePhoneChange = (inputToCheck: IUpdatePhoneInput) =>
  validation(phoneChangeSchema, inputToCheck);
export { validatePhoneChange };
