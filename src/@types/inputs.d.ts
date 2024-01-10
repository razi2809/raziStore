import { IOpeningHours } from "./business";

interface IRegiserInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
  city: string;
  street: string;
  buildingNumber: number;
  url: string;
  alt: string;
}
interface IProductInputs {
  productName: string;
  description: string;
  categoryOne: string;
  categoryTwo?: string;
  categoryThree?: string;
  categoryFour?: string;
  price: number;
  productQuantity: number;
  url: string;
  alt: string;
}
interface ICreatebusinessInputs {
  businessName: string;
  email: string;
  businessPhoneNumber: string;
  businessDescription: string;
  city: string;
  street: string;
  buildingNumber: number;
  url: string;
  alt: string;
  OpeningHours: IOpeningHours;
}
interface IUpdateInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  buildingNumber: number;
  url?: string;
}
interface IVerifyInputs {
  email: string;
  verificationCode: string;
}
interface ILoginInputs {
  email: string;
  password: string;
}
interface ErrorObj {
  [key: string]: string;
}
interface ITokenPayload {
  email: string;
  iat?: string;
  userId: TypeExpressionOperatorReturningObjectId;
}
interface ILocation {
  buildingNumber: number;
  street: string;
  city: string;
}
interface IResetPasswordInputs {
  email: string;
  passwordResetCode: string;
  password: string;
  passwordConfirmation: string;
}
export {
  IRegiserInputs,
  ErrorObj,
  IVerifyInputs,
  ILoginInputs,
  ITokenPayload,
  IUpdateInputs,
  ILocation,
  IResetPasswordInputs,
  ICreatebusinessInputs,
  IProductInputs,
};
