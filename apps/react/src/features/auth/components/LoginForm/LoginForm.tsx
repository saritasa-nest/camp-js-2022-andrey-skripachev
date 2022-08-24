import { FC, memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Field, FormikProvider, useFormik } from 'formik';
import { TextField } from 'formik-mui';
import { object, string } from 'yup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Alert, Snackbar, Stack } from '@mui/material';
import { Login } from '@js-camp/core/models/login';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { loginUser } from '@js-camp/react/store/user/dispatchers';
import { selectUserValidationError } from '@js-camp/react/store/user/selectors';

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
  const [generalError, setGeneralError] = useState<string | null>(null);

  const appDispatch = useAppDispatch();

  const userErrors = useAppSelector(selectUserValidationError);

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
    if (userErrors) {
      setGeneralError(userErrors.detail);
    }
  }, [userErrors]);

  const handleSnackbarClose = () => {
    setGeneralError(null);
  };

  return (
    <>
      <Typography component='h1' variant='h2'>Login</Typography>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Field
              required
              autoComplete='email'
              component={TextField}
              name='email'
              type='email'
              label='Email'
            />
            <Field
              required
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
      <Snackbar
        open={generalError !== null}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity='error'>{generalError}</Alert>
      </Snackbar>
    </>
  );
};

export const LoginForm = memo(LoginFormComponent);
