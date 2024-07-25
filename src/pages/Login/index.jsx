import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import styles from "./Login.module.scss";

export const Login = () => {
const isAuth = useSelector(selectIsAuth);
const dispatch = useDispatch();

const { 
  register, 
  handleSubmit, 
  setError, 
  formState: {errors, isValid}, 
} = useForm({
      defaultValues: {
            email: 'test@gddd.ua',
            password: "3DACWxapzyvdK",
  },
  mode: 'onChange',
});

  const onSubmit = (values) => {
     dispatch(fetchAuth(values));
  };

  if(isAuth){
    return <Navigate to='/' />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Log in to the account
      </Typography>
    <form onSubmit= {handleSubmit(onSubmit)} >
    <TextField
        className={styles.field}
        label="E-Mail"
        error= {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email', { required: 'Email please'})}
        fullWidth
      />
      <TextField className={styles.field} label="Password" 
       error= {Boolean(errors.password?.message)}
       helperText={errors.password?.message}
      {...register('password', { required: 'Password please'})}
      fullWidth />
      <Button type='submit' size="large" variant="contained" fullWidth>
        Entered
      </Button>
    </form>
    </Paper>
  );
};
