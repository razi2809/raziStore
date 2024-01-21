import Joi from "joi";

import validation from "../../validation";
import { IUpdateQuantityInput } from "../../../@types/generic";

const quantityChangeSchema = Joi.object<IUpdateQuantityInput>({
  quantity: Joi.number().required().messages({
    "string.empty": "productQuantity cannot be empty",
    "any.required": "productQuantity is a required field",
    "number.base": "productQuantity must be a number",
  }),
});
const validateQuantityChange = (inputToCheck: IUpdateQuantityInput) =>
  validation(quantityChangeSchema, inputToCheck);
export { validateQuantityChange };
