import Joi from "joi";
import { ErrorObj } from "../@types/generic";

const validation = (schema: Joi.ObjectSchema, userInput: any) => {
  const { error } = schema.validate(userInput, { abortEarly: false });
  if (!error) {
    //no errors
    //schema is valid
    return null;
  }
  //schema is no valid so show the error
  let errorObj: ErrorObj = {};
  const { details } = error;
  for (let item of details) {
    let key = item.path[0];

    let { message } = item;
    errorObj[key] = message;
  }
  return errorObj;
};
export default validation;
