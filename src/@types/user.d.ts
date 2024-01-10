import { IAddress, IImage, IName } from "./inputs";

interface Iuser {
  email: string;
  phoneNumber: string;
  name: IName;
  address: IAddress[];
  image: IImage;
  isAdmin: boolean;
  isBusiness: boolean;
  verified: boolean;
  orders: string[];
  theme: "dark" | "light";
  _id: Types.ObjectId;
}
interface IImage {
  url: string;
  alt?: string;
}
interface IName {
  firstName: string;
  lastName: string;
}
interface IAddress {
  id: Types.ObjectId;
  addressName: string;
  state: string;
  street: string;
  city: string;
  buildingNumber: number;
}
/* interface IuserValidate {
    email: string;
    phoneNumber: string;
    firstName:string,
    lastName:string
    state: string,
    street: string,
    city: string,
    buildingNumber: Number;
    url:string,
    alt:string,
    isAdmin: boolean;
    isBusiness: boolean;
    orders: string[];
    theme: string;
    password:string,
    passworConfirmation:string
} */
export { Iuser, IAddress, IImage, IName };
