import { IOrder } from "../../@types/order";
import { IAddress } from "../../@types/user";

const orderNormalized = (order: IOrder, address: IAddress) => {
  const products = order.products.map((product) => {
    return {
      productId: product.product._id,
      productQuantity: product.quantity,
    };
  });
  return {
    products,
    price: order.price,
    address: address,
  };
};
export { orderNormalized };
