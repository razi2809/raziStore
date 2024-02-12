import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../@types/order";
import { IProduct } from "../@types/product";
import { IBusiness } from "../@types/business";
const initialState: OrderState = [
  {
    products: [],
    business: null,
    price: 0,
  },
];
const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    updateOrder: (
      state,
      action: PayloadAction<{
        product: IProduct;
        quantity: number;
        business: IBusiness;
      }>
    ) => {
      const { product, quantity, business } = action.payload;

      const orderIndex = state.findIndex(
        (order) => order.business?._id === business._id
      );
      if (orderIndex === -1) {
        // If the order doesn't exist, create a new one
        state.push({
          products: [{ product, quantity }],
          business: business,
          price: product.price * quantity,
        });
      } else {
        // Reference to the order we want to update
        const order = state[orderIndex];
        // Calculate the price for the new quantity of the product
        const addedPrice = product.price * quantity;
        // Check if the product already exists in the order
        const productExists = order.products.some(
          (p) => p.product._id === product._id
        );
        if (productExists) {
          // If the product exists, update its quantity and recalculate the total price
          order.products = order.products.map((p) =>
            p.product._id === product._id
              ? { product: p.product, quantity: quantity }
              : p
          );
          const oldValue = order.products
            .filter((p) => p.product._id !== product._id)
            .map((p) => p.quantity * p.product.price);
          const sumOldValues = oldValue.reduce((a, b) => a + b, 0);
          order.price = sumOldValues + addedPrice;
        } else {
          // Add the product to the order
          order.products.push({ product, quantity });
          order.price += addedPrice;
        }
      }
    },
    deleteProduct: (
      state,
      action: PayloadAction<{ product: IProduct; businessId: string }>
    ) => {
      const { product, businessId } = action.payload;
      const orderIndex = state.findIndex(
        (order) => order.business?._id === businessId
      );
      if (orderIndex === -1) {
        // If the order doesn't exist, do nothing
        return;
      }
      // Reference to the order we want to update
      const order = state[orderIndex];
      // Calculate the total price of all products in the order, excluding the product to be deleted
      const oldValue = order.products
        .filter((p) => p.product._id !== product._id)
        .map((p) => p.quantity * p.product.price);
      const sumOldValues = oldValue.reduce((a, b) => a + b, 0);
      // Remove the product from the order
      order.products = order.products.filter(
        (p) => p.product._id !== product._id
      );
      if (order.products.length === 0) {
        state.splice(orderIndex, 1);
        return;
      }
      // Update the total price of the order
      order.price = sumOldValues;
    },
    updateProductQuanity: (
      state,
      action: PayloadAction<{
        product: IProduct;
        quantity: number;
      }>
    ) => {
      const { product, quantity } = action.payload;
      // Find the index of the order that matches the business ID of the product

      const orderIndex = state.findIndex(
        (order) => order.business?._id === product.businessId
      );
      // Reference to the order we want to update

      const order = state[orderIndex];
      // Check if the product already exists in the order

      const productExists = order.products.some(
        (p) => p.product._id === product._id
      );
      // If the product does not exist in the order, do nothing and return
      if (!productExists) {
        return;
      }
      // Calculate the price for the new quantity of the product
      const addedPrice = product.price * quantity;
      // Update the quantity of the product in the order

      order.products = order.products.map((p) =>
        p.product._id === product._id
          ? { product: p.product, quantity: quantity }
          : p
      );
      // Calculate the total price of all other products in the order

      const oldValue = order.products
        .filter((p) => p.product._id !== product._id)
        .map((p) => p.quantity * p.product.price);
      const sumOldValues = oldValue.reduce((a, b) => a + b, 0);
      // Update the total price of the order

      order.price = sumOldValues + addedPrice;
    },
    deleteOrder: (state, action: PayloadAction<{ BusinessId: string }>) => {
      const { BusinessId } = action.payload;
      const orderIndex = state.findIndex(
        (order) => order.business?._id === BusinessId
      );
      if (orderIndex === -1) {
        // If the order doesn't exist, do nothing
        return;
      }
      state.splice(orderIndex, 1);
    },
  },
});
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
