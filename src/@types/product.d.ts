import { IImage } from "./user";

interface IProduct {
  productName: string;
  description: string;
  price: number;
  onSale: boolean;
  salePrice: number;
  productImage: IImage;
  businessId: string;
  categories: string;
  likes: string[];
  productQuantity: number;
  _id: Types.ObjectId;
}
export { IProduct };
