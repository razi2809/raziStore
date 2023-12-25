import { IAddress, IImage, IName } from "./global";

interface Iuser {
    email: string;
    phoneNumber: string;
    name: IName;
    address: IAddress;
    image:IImage
    isAdmin: boolean;
    isBusiness: boolean;
    orders: string[];
    theme: string;
    _id: Types.ObjectId;
}
interface IuserValidate {
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
}
export{Iuser ,IuserValidate}