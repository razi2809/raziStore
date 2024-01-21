import Joi from "joi";

import { IUpdateNameInputs } from "../../../@types/generic";
import validation from "../../validation";

const nameChangeSchema = Joi.object<IUpdateNameInputs>({
  firstName: Joi.string().min(3).max(20).required().messages({
    "string.empty": "firstName cannot be empty",
    "any.required": "firstName is a required field",
  }),
  lastName: Joi.string().min(3).max(20).required().messages({
    "string.empty": "lastName cannot be empty",
    "any.required": "lastName is a required field",
  }),
});
const validateNameChange = (inputToCheck: IUpdateNameInputs) =>
  validation(nameChangeSchema, inputToCheck);
export { validateNameChange };
