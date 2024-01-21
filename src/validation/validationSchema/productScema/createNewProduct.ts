import Joi from "joi";
import validation from "../../validation";
import { IProductInputs } from "../../../@types/generic";
const createBusinessScema = Joi.object<IProductInputs>({
  productName: Joi.string().min(2).max(25).required().messages({
    "string.empty": "businessName cannot be empty",
    "any.required": "businessName is a required field",
  }),

  description: Joi.string().min(7).max(15).required().messages({
    "string.empty": "description cannot be empty",
    "any.required": "description is a required field",
  }),
  alt: Joi.string().allow(""),
  url: Joi.string().required().messages({
    "string.empty": "url cannot be empty",
    "any.required": "url is a required field",
  }),
  categoryOne: Joi.string().min(3).max(7).required().messages({
    "string.empty": "categoryOne cannot be empty",
    "any.required": "categoryOne is a required field",
  }),
  categoryTwo: Joi.string().max(7).allow(""),
  categoryThree: Joi.string().max(7).allow(""),
  categoryFour: Joi.string().max(7).allow(""),
  price: Joi.number().required().messages({
    "string.empty": "price cannot be empty",
    "any.required": "price is a required field",
    "number.base": "price must be a number",
  }),
  productQuantity: Joi.number().required().messages({
    "string.empty": "productQuantity cannot be empty",
    "any.required": "productQuantity is a required field",
    "number.base": "productQuantity must be a number",
  }),
});
const validateNewProduct = (inputToCheck: IProductInputs) =>
  validation(createBusinessScema, inputToCheck);
export { validateNewProduct };
