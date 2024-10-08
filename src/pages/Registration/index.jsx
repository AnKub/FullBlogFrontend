import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors, isValid }, 
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (data.error) {
      const errorMsg = data.error.message || 'Registration failed. Please try again.';
      setError('fullName', { type: 'manual', message: errorMsg });
      setError('email', { type: 'manual', message: errorMsg });
      setError('password', { type: 'manual', message: errorMsg });
      return alert(errorMsg);
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Registration successful, but no token received.');
    }
  };

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField  
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Full Name please' })}
          className={styles.field} 
          label="Full Name" 
          fullWidth 
        />
        
        <TextField  
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Email please' })}
          className={styles.field} 
          label="E-Mail" 
          fullWidth 
        />
        
        <TextField  
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Password please' })}
          className={styles.field} 
          label="Password" 
          fullWidth 
        />

        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};
