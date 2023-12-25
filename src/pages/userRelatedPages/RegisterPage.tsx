import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import validation from "../../validation/validation";
import { log } from "console";
import { IRegiserInputs } from "../../@types/global";
import { validateRegister } from "../../validation/validationSchema/registerSchema";

const RegisterPage = () => {
  const [inputs, setInputs] = useState<IRegiserInputs>({
    firstName: "",
    lastName: "",
    email: "",phoneNumber:"",
    password: "",
    passworConfirmation: "",city:"",
    street:"",
    buildingNumber:null,
    url:"",
    alt:""
  });
  const handleInputsChage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((currentState) => ({
      //update the state  values
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
const joi=validateRegister(inputs)
console.log(joi);
  }
  return (
    <Grid>
      <Box component="form" noValidate onSubmit={(e)=>handleSubmit(e)} sx={{ mt: 3 }}>
        <Grid container spacing={4} sx={{ mt: 0 }}>
            <Grid container item md={6} sm={6} xs={12}>
          {Object.entries(inputs).map(([key, value]) => (
            <TextField
            key={key}
              autoFocus={key === "firstName" ? true : false}
              id={key}
              label={key}
              value={value}
              onChange={(e) => handleInputsChage(e)}
              type={key==="password"?"password":key==="passworConfirmation"?"password":key}
            />
          ))}
        </Grid> <Button
                type="submit"
                fullWidth
                // disabled={errorsState !== null}
                variant="contained"
              >
                regiser{" "}
              </Button>
      </Grid>
      </Box>
          
    </Grid>
  );
};

export default RegisterPage;
