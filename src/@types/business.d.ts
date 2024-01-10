import { IAddress, IImage } from "./user";

interface IOpeningHoursInDay {
  opening?: string;
  closing?: string;
  close?: boolean;
}
type Day =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

/* interface IOpeningHours {
  [day in Day]: IOpeningHoursInDay;
} */
interface IOpeningHours extends Record<Day, IOpeningHoursInDay> {}

interface IBusiness {
  _id: Types.ObjectId;
  businessEmail: string;
  businessPhoneNumber: string;
  businessName: string;
  businessDescription: string;
  address: IAddresss;
  businessImage: IImage;
  OpeningHours: IOpeningHours;
  products: string[];
  categories: string[];
  likes: string[];
  orders: string[];
}

export { IBusiness, Day, IOpeningHours, IOpeningHoursInDay };
