import { IRegiserInputs } from "../@types/global"

const normalRegister=(inputs:IRegiserInputs)=>{
    return{
        name:{
            firstName:inputs.firstName,
            lastName:inputs.lastName
        },
        address:{
            city:inputs.city,
            street:inputs.street,
            buildingNumber:Number(inputs.buildingNumber)
        },
        image:{
            url:inputs.url,
            alt:inputs.alt
        },
        email:inputs.email,
        password:inputs.password,
        passworConfirmation:inputs.passworConfirmation,
        phoneNumber:inputs.phoneNumber
    }
}
export {normalRegister}