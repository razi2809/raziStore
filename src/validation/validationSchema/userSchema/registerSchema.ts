import Joi from "joi";
import { phonePattern } from "../../pattern/phonePattern";
import { passwordPattern } from "../../pattern/passwordPattern";
import { IRegiserInputs } from "../../../@types/generic";
import validation from "../../validation";

const registerSchema = Joi.object<IRegiserInputs>({
  firstName: Joi.string().min(3).max(20).required().messages({
    "string.empty": "firstName cannot be empty",
    "any.required": "firstName is a required field",
  }),
  lastName: Joi.string().min(3).max(20).required().messages({
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
  alt: Joi.string().allow(""),
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
const validateRegister = (inputToCheck: IRegiserInputs) =>
  validation(registerSchema, inputToCheck);
export { validateRegister };
