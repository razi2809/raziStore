import { IAddress, IImage } from "./global";
interface IOpeningHoursInDay {
  opening?: string;
  closing?: string;
  close?: boolean;
}
interface IOpeningHours {
  Monday: IOpeningHoursInDay;
  Tuesday: IOpeningHoursInDay;
  Wednesday: IOpeningHoursInDay;
  Thursday: IOpeningHoursInDay;
  Friday: IOpeningHoursInDay;
  Saturday: IOpeningHoursInDay;
  Sunday: IOpeningHoursInDay;
}

interface IBusiness {
  _id: Types.ObjectId;
  businessEmail: string;
  businessPhoneNumber: string;
  businessName: string;
  businessDescription: string;
  address: IAddress;
  businessImage: IImage;
  OpeningHours: IOpeningHours;
  products: string[];
  categories: string[];
  likes: string[];
  orders: string[];
}
export { IBusiness };
