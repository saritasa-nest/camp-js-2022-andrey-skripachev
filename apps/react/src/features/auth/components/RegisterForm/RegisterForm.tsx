import { FC, memo, useState, useEffect } from 'react';
import { Field, FormikProvider, useFormik } from 'formik';
import { Button, Stack, Typography } from '@mui/material';
import * as yup from 'yup';
import { Registration } from '@js-camp/core/models/registration';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { registerUser } from '@js-camp/react/store/user/dispatchers';
import { selectUserError } from '@js-camp/react/store/user/selectors';
import { Link } from 'react-router-dom';
import { AppError } from '@js-camp/core/models/error-response';
import { TextField } from 'formik-mui';

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

  const userErrors = useAppSelector(selectUserError);

  const userValidationErrors = userErrors instanceof AppError ? userErrors.data : undefined;

  /**
   * Registers user with form data.
   * @param registrationData Registration form data.
   */
  const register = async(registrationData: RegistrationFormData): Promise<void> => {
    setIsLoading(true);
    await appDispatch(registerUser(registrationData));
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: initialRegistrationValues,
    validationSchema: registrationValidationSchema,
    onSubmit: register,
  });

  useEffect(() => {
    if (userValidationErrors) {
      formik.setErrors(userValidationErrors);
    }
  }, [userValidationErrors]);
  return (
    <>
      <Typography component='h1' variant='h2'>Register</Typography>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Field
              required
              name='firstName'
              label='First name'
              component={TextField}
            />
            <Field
              required
              name='lastName'
              label='Last name'
              component={TextField}
            />
            <Field
              required
              name='email'
              autoComplete='email'
              label='Email'
              component={TextField}
            />
            <Field
              required
              type='password'
              autoComplete='password'
              name='password'
              label='Password'
              component={TextField}
            />
            <Field
              required
              type='password'
              autoComplete='password'
              name='confirmPassword'
              label='Confirm password'
              component={TextField}
            />
            <Button
              disabled={isLoading}
              fullWidth
              type='submit'
              variant='contained'
            >Register</Button>
          </Stack>
        </form>
      </FormikProvider>
      <Typography variant='button' component='span'>
        <Link to={'../login'}>Login</Link>
      </Typography>
    </>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
