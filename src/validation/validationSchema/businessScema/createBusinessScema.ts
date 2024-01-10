import Joi from "joi";
import { phonePattern } from "../../pattern/phonePattern";
import { ICreatebusinessInputs } from "../../../@types/inputs";
import validation from "../../validation";
import { IOpeningHours, IOpeningHoursInDay } from "../../../@types/business";
const daySchema = Joi.object<IOpeningHoursInDay>({
  opening: Joi.string().allow(""),
  closing: Joi.string().allow(""),
  close: Joi.boolean().allow(),
}).or("opening", "closing", "close");
const openingHoursScehma = Joi.object<IOpeningHours>({
  Sunday: daySchema.required(),
  Monday: daySchema,
  Tuesday: daySchema,
  Wednesday: daySchema,
  Thursday: daySchema,
  Friday: daySchema,
  Saturday: daySchema,
});
const createBusinessScema = Joi.object<ICreatebusinessInputs>({
  businessName: Joi.string().min(2).max(25).required().messages({
    "string.empty": "businessName cannot be empty",
    "any.required": "businessName is a required field",
  }),
  businessPhoneNumber: Joi.string()
    .min(9)
    .max(11)
    .pattern(phonePattern)
    .required()
    .messages({
      "string.empty": "businessPhoneNumber cannot be empty",
      "any.required": "businessPhoneNumber is a required field",
      "string.pattern.base": "businessPhoneNumber dont match the pattern",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required()
    .messages({
      "string.empty": "businessEmail cannot be empty",
      "any.required": "businessEmail is a required field",
      "string.email": "businessEmail is not valid",
    }),
  businessDescription: Joi.string().min(10).max(35).required().messages({
    "string.empty": "businessDescription cannot be empty",
    "any.required": "businessDescription is a required field",
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
  OpeningHours: openingHoursScehma.required().messages({
    "any.required": "OpeningHours is a required field",
  }),
});
const validateRegisterBusiness = (inputToCheck: ICreatebusinessInputs) =>
  validation(createBusinessScema, inputToCheck);
export { validateRegisterBusiness };
