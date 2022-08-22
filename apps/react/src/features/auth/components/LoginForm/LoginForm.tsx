import { Login } from '@js-camp/core/models/login';
import { Field, FormikProvider, useFormik } from 'formik';
import { object, string } from 'yup';
import { FC, memo, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { loginUser } from '@js-camp/react/store/user/dispatchers';
import { selectUserError } from '@js-camp/react/store/user/selectors';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { AppError } from '@js-camp/core/models/error-response';
import { TextField } from 'formik-mui';

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

  const formik = useFormik({
    initialValues: initialLoginValues,
    validationSchema: loginValidationSchema,
    onSubmit: login,
  });

  useEffect(() => {
    if (userValidationErrors) {
      formik.setErrors(userValidationErrors);
    }
  }, [userValidationErrors]);

  return (
    <>
      <Typography component='h1' variant='h2'>Login</Typography>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Field
              autoComplete='email'
              component={TextField}
              name='email'
              type='email'
              label='Email'
            />
            <Field
              autoComplete='current-password'
              component={TextField}
              name='password'
              type='password'
              label='Password'
            />
            <Button
              fullWidth
              disabled={isLoading}
              type='submit'
              variant='contained'
            >
              Login
            </Button>
          </Stack>
        </form>
      </FormikProvider>
      <Typography variant='button' component='span'>
        <Link to={'../register'}>Register</Link>
      </Typography>
    </>
  );
};

export const LoginForm = memo(LoginFormComponent);
