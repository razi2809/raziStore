import { IProductInputs } from "../../@types/generic";

export const newProductNormalized = (inputs: IProductInputs) => {
  const categories = [
    inputs.categoryOne,
    inputs.categoryTwo,
    inputs.categoryThree,
    inputs.categoryFour,
  ].filter((category) => category && category.trim() !== "");

  return {
    productName: inputs.productName,
    description: inputs.description,
    price: Number(inputs.price),
    productImage: {
      url: inputs.url,
      alt: inputs.alt,
    },
    productQuantity: Number(inputs.productQuantity),
    categories,
  };
};
