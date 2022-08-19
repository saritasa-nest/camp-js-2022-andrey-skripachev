import { FC, memo, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Stack, Typography } from '@mui/material';
import * as yup from 'yup';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { registerUser } from '@js-camp/react/store/user/dispatchers';
import { selectUserError } from '@js-camp/react/store/user/selectors';
import { Link } from 'react-router-dom';
import { AppError } from '@js-camp/core/models/error-response';

import { FormTextField } from '../../../../app/components/FormTextField';

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
  async function register(registrationData: RegistrationFormData): Promise<User | void> {
    setIsLoading(true);
    await appDispatch(registerUser(registrationData));
    setIsLoading(false);
  }

  return (
    <>
      <Typography component='h1' variant='h2'>Register</Typography>
      <Formik
        onSubmit={register}
        initialErrors={userValidationErrors}
        initialValues={initialRegistrationValues}
        validationSchema={registrationValidationSchema}
      >
        {({ touched, errors, submitForm, values }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                name='firstName'
                label='First name'
                component={FormTextField}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <Field
                name='lastName'
                label='Last name'
                component={FormTextField}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <Field
                name='email'
                autoComplete='email'
                label='Email'
                component={FormTextField}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                type='password'
                autoComplete='password'
                name='password'
                label='Password'
                component={FormTextField}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                type='password'
                autoComplete='password'
                name='confirmPassword'
                label='Confirm password'
                component={FormTextField}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Button
                disabled={isLoading}
                fullWidth
                type='submit'
                variant='contained'
                onClick={submitForm}
              >Register</Button>
            </Stack>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
      <Typography variant='button' component='span'>
        <Link to={'../login'}>Login</Link>
      </Typography>
    </>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
