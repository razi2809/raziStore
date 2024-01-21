import Joi from "joi";

import { IUpdatespecialNameInputs } from "../../../@types/generic";
import validation from "../../validation";

const speicalNameChangeSchema = Joi.object<IUpdatespecialNameInputs>({
  name: Joi.string().min(3).max(20).required().messages({
    "string.empty": "name cannot be empty",
    "any.required": "name is a required field",
  }),
});
const validateSpeicalNameChange = (inputToCheck: IUpdatespecialNameInputs) =>
  validation(speicalNameChangeSchema, inputToCheck);
export { validateSpeicalNameChange };
