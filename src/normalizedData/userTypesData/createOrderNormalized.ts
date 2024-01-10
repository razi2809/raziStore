import { IOrder } from "../../@types/order";

const orderNormalized = (order: IOrder) => {
  const products = order.products.map((product) => {
    return {
      productId: product.product._id,
      productQuantity: product.quantity,
    };
  });
  return {
    products,
    price: order.price,
  };
};
export { orderNormalized };
