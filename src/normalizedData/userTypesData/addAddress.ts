import { ILocation } from "../../@types/generic";

const addAdressNormalized = (address: ILocation, addressName: string) => {
  return {
    address: {
      addressName: addressName,
      state: "israel",
      street: address.street,
      city: address.city,
      buildingNumber: address.buildingNumber,
    },
  };
};
export { addAdressNormalized };
