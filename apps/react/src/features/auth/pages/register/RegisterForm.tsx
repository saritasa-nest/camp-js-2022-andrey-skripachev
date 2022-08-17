import { FC, memo } from 'react';
import { useFormik } from 'formik';
import { Button, Grid, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { Registration } from '@js-camp/core/models/registration';
import Link from '@mui/material/Link';

import { UserService } from '../../../../api/services/user';

interface RegistrationFormData extends Registration {

  /** Password confirmation. */
  readonly confirmPassword: string;
}

/**
 * Registers user with form data.
 * @param registrationData Registration form data.
 */
async function register(registrationData: RegistrationFormData): Promise<void> {
  const currentUser = await UserService.register(registrationData);

  console.log(currentUser);
}

const registrationValidationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  email: yup
    .string()
    .email('Enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords doesn\'t match'),
});

const initialRegistrationValues: RegistrationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterFormComponent: FC = () => {
  const formik = useFormik<RegistrationFormData>({
    initialValues: initialRegistrationValues,
    validationSchema: registrationValidationSchema,
    onSubmit: register,
  });

  return (
    <>
      <Typography component='h1' variant='h2'>Register</Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='firstName'
              label='First name'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='lastName'
              label='Last name'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='email'
              autoComplete='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant='outlined' />

          </Grid>
          <Grid item xs={12}>
            <TextField
              type='password'
              autoComplete='password'
              fullWidth
              name='password'
              label='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='password'
              autoComplete='password'
              fullWidth
              name='confirmPassword'
              label='Confirm password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type='submit'
              variant='contained'>Register</Button>
          </Grid>
        </Grid>
      </form>
      <Link href='#/auth/login' variant="button">Login</Link>
    </>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
