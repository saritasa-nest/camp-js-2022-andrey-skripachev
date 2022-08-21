import { FC, memo, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { registerUser } from '@js-camp/react/store/user/dispatchers';
import { selectUserError } from '@js-camp/react/store/user/selectors';
import { AppError } from '@js-camp/core/models/error-response';
import { Link } from 'react-router-dom';

interface RegistrationFormData extends Registration {

  /** Password confirmation. */
  readonly confirmPassword: string;
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

  const [isLoading, setIsLoading] = useState(false);

  const appDispatch = useAppDispatch();

  const userValidationError = useAppSelector(selectUserError);

  useEffect(() => {
    if (userValidationError instanceof AppError) {
      formik.setErrors({
        ...userValidationError.data,
      });
    }
  }, [userValidationError]);

  const formik = useFormik<RegistrationFormData>({
    initialValues: initialRegistrationValues,
    validationSchema: registrationValidationSchema,
    onSubmit: register,
  });

  /**
   * Registers user with form data.
   * @param registrationData Registration form data.
   */
  async function register(registrationData: RegistrationFormData): Promise<User | void> {
    setIsLoading(true);
    await appDispatch(registerUser(registrationData));
    setIsLoading(false);
  }

  return (
    <>
      <Typography component='h1' variant='h2'>Register</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            name='firstName'
            label='First name'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            variant='outlined' />
          <TextField
            fullWidth
            name='lastName'
            label='Last name'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            variant='outlined' />
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
          <Button
            disabled={isLoading}
            fullWidth
            type='submit'
            variant='contained'>Register</Button>
        </Stack>
      </form>
      <Typography variant='button' component='span'>
        <Link to={'../login'}>Login</Link>
      </Typography>
    </>
  );
};

export const RegisterForm = memo(RegisterFormComponent);