import Joi from "joi";
import { phonePattern } from "../../pattern/phonePattern";
import { IUpdateInputs } from "../../../@types/inputs";
import validation from "../../validation";

const UpdateUserScehma = Joi.object<IUpdateInputs>({
  firstName: Joi.string().min(2).max(256).required().messages({
    "string.empty": "firstName cannot be empty",
    "any.required": "firstName is a required field",
  }),
  lastName: Joi.string().min(2).max(256).required().messages({
    "string.empty": "lastName cannot be empty",
    "any.required": "lastName is a required field",
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
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required()
    .messages({
      "string.empty": "email cannot be empty",
      "any.required": "email is a required field",
      "string.email": "email is not valid",
    }),
  url: Joi.string().required().messages({
    "string.empty": "url cannot be empty",
    "any.required": "url is a required field",
  }),
  street: Joi.string().min(2).max(256).required().messages({
    "string.empty": "street cannot be empty",
    "any.required": "street is a required field",
  }),
  city: Joi.string().min(2).max(256).required().messages({
    "string.empty": "city cannot be empty",
    "any.required": "city is a required field",
  }),
  buildingNumber: Joi.number().required().messages({
    "string.empty": "buildingNumber cannot be empty",
    "any.required": "buildingNumber is a required field",
    "number.base": "Building number must be a number",
  }),
});
const validateUpdateUser = (inputToCheck: IUpdateInputs) =>
  validation(UpdateUserScehma, inputToCheck);
export { validateUpdateUser };
