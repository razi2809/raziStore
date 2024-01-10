import { ICreatebusinessInputs, IRegiserInputs } from "../../@types/inputs";

const normalCreateBusiness = (inputs: ICreatebusinessInputs) => {
  return {
    businessName: inputs.businessName,
    address: {
      state: "israel",
      city: inputs.city,
      street: inputs.street,
      buildingNumber: Number(inputs.buildingNumber),
      addressName: "default",
    },
    businessDescription: inputs.businessDescription,
    businessImage: {
      url: inputs.url,
      alt: inputs.alt,
    },
    businessEmail: inputs.email,

    businessPhoneNumber: inputs.businessPhoneNumber,
    OpeningHours: inputs.OpeningHours,
  };
};
export { normalCreateBusiness };
