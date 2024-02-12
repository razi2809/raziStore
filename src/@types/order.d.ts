import { IBusiness } from "./business";
import { IProduct } from "./product";
import { IAddress, IImage } from "./user";

interface IProductToOrder {
  product: IProduct;
  quantity: number;
}
type OrderState = {
  products: IProductToOrder[];
  business: IBusiness | null;
  price: number;
}[];
interface IOrder {
  products: IProductToOrder[];
  business: IBusiness | null;
  price: number;
}
export interface IProductOrder {
  productId: string;
  productName: string;
  productImage: IImage;
  productPrice: number;
  productQuantity: number;
}
interface IOrderData {
  _id: "6597d9798ff7b878d5c86eb1";
  products: IProductOrder[];
  business: {
    businessId: string;
    businessName: string;
    businessImage: IImage;
  };
  address: IAddress;
  userId: string;
  price: number;
  createdAt: Date;
}
export { OrderState, IOrder, IProductToOrder, IOrderData };
