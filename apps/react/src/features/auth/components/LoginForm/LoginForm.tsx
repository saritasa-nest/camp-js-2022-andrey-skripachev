import { Login } from '@js-camp/core/models/login';
import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { FC, memo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { loginUser } from '@js-camp/react/store/user/dispatchers';
import { selectUserError } from '@js-camp/react/store/user/selectors';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { AppError } from '@js-camp/core/models/error-response';

import { FormTextField } from '../../../../app/components/FormTextField';

const loginValidationSchema = object({
  email: string()
    .email('Enter valid email')
    .required('Email is required'),
  password: string()
    .required('Password is required'),
});

const initialLoginValues: Login = {
  email: '',
  password: '',
};

const LoginFormComponent: FC = () => {

  const [isLoading, setIsLoading] = useState(false);

  const appDispatch = useAppDispatch();

  const userErrors = useAppSelector(selectUserError);

  const userValidationErrors = userErrors instanceof AppError ? userErrors.data : undefined;

  /**
   * Logins user with login data.
   * @param loginData Login data.
   */
  const login = async(loginData: Login): Promise<void> => {
    setIsLoading(true);
    await appDispatch(loginUser(loginData));
    setIsLoading(false);
  };

  return (
    <>
      <Typography component='h1' variant='h2'>Login</Typography>
      <Formik
        onSubmit={login}
        initialErrors={userValidationErrors}
        initialValues={initialLoginValues}
        validationSchema={loginValidationSchema}
      >
        {({ touched, errors, submitForm, values }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                autoComplete='email'
                component={FormTextField}
                name='email'
                type='email'
                label='Email'
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                autoComplete='current-password'
                component={FormTextField}
                name='password'
                type='password'
                label='Password'
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                fullWidth
                disabled={isLoading}
                type='submit'
                variant='contained'
                onClick={submitForm}
              >
                Login
              </Button>
            </Stack>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
      <Typography variant='button' component='span'>
        <Link to={'../register'}>Register</Link>
      </Typography>
    </>
  );
};

export const LoginForm = memo(LoginFormComponent);
