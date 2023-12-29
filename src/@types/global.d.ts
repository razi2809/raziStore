interface IImage {
  url: string;
  alt: string;
}
interface IName {
  firstName: string;
  lastName: string;
}
interface IAddress {
  state: string;
  street: string;
  city: string;
  buildingNumber: number;
}
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
export {
  IAddress,
  IImage,
  IName,
  IRegiserInputs,
  ErrorObj,
  IVerifyInputs,
  ILoginInputs,
  ITokenPayload,
  IUpdateInputs,
  ILocation,
};
