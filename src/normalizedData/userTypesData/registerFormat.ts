import { IRegiserInputs } from "../../@types/inputs";

const normalRegister = (inputs: IRegiserInputs) => {
  return {
    name: {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
    },
    address: [
      {
        state: "israel",
        city: inputs.city,
        street: inputs.street,
        buildingNumber: Number(inputs.buildingNumber),
        addressName: "default",
      },
    ],
    image: {
      url: inputs.url,
      alt: inputs.alt,
    },
    email: inputs.email,
    password: inputs.password,
    passwordConfirmation: inputs.passwordConfirmation,
    phoneNumber: inputs.phoneNumber,
  };
};
export { normalRegister };
