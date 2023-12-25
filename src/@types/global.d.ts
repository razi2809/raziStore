interface IImage{
    url:string,
    alt:string
} 
interface IName{
    firstName:string,
    lastName:string
}
interface IAddress{
    state: string,
    street: string,
    city: string,
    buildingNumber: Number;
}
interface IRegiserInputs{
    firstName: string,
      lastName: string,
      email: string,
      phoneNumber:string,
      password: string,
      passworConfirmation: string,
      city:string,
      street:string,
      buildingNumber:number | null,
      url:string,
      alt:string
  }
export{
      IAddress, IImage,IName,IRegiserInputs
}