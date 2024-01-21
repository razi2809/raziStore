import Joi from "joi";

import validation from "../../validation";
import { IUpdateDescriptionInput } from "../../../@types/generic";

const DescriptionChangeSchema = Joi.object<IUpdateDescriptionInput>({
  description: Joi.string().min(10).max(35).required().messages({
    "string.empty": "description cannot be empty",
    "any.required": "description is a required field",
  }),
});
const validateDescrptionChange = (inputToCheck: IUpdateDescriptionInput) =>
  validation(DescriptionChangeSchema, inputToCheck);
export { validateDescrptionChange };
