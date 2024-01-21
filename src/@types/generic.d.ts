import { IOpeningHours } from "./business";

export interface IRegiserInputs {
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
export interface IUpdateNameInputs {
  firstName: string;
  lastName: string;
}
export interface IUpdatespecialNameInputs {
  name: string;
}
export interface IUpdateEmailInput {
  email: string;
}
export interface IUpdatePhoneInput {
  phoneNumber: string;
}
export interface IUpdateDescriptionInput {
  description: string;
}
export interface IUpdateQuantityInput {
  quantity: number;
}
export interface IProductInputs {
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
export interface ICreatebusinessInputs {
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
export interface IUpdateInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  buildingNumber: number;
  url?: string;
}
export interface IVerifyInputs {
  email: string;
  verificationCode: string;
}
export interface ILoginInputs {
  email: string;
  password: string;
}
export interface ErrorObj {
  [key: string]: string;
}
export interface ITokenPayload {
  email: string;
  iat?: string;
  userId: TypeExpressionOperatorReturningObjectId;
}
export interface ILocation {
  buildingNumber: number;
  street: string;
  city: string;
}
export interface IResetPasswordInputs {
  email: string;
  passwordResetCode: string;
  password: string;
  passwordConfirmation: string;
}
export type changeType =
  | "name"
  | "email"
  | "phoneNumber"
  | "businessName"
  | "businessDescription"
  | "image"
  | "productName"
  | "productDescription"
  | "productQuantity";
