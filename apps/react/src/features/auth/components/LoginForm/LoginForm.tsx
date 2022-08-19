import { Login } from '@js-camp/core/models/login';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { FC, memo, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { loginUser } from '@js-camp/react/store/user/dispatchers';
import { selectUserError } from '@js-camp/react/store/user/selectors';
import { AppError } from '@js-camp/core/models/error-response';
import { Link } from 'react-router-dom';

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

  const userValidationError = useAppSelector(selectUserError);

  useEffect(() => {
    if (userValidationError instanceof AppError) {
      formik.setErrors({
        ...userValidationError.data,
      });
    }
  }, [userValidationError]);

  const formik = useFormik<Login>({
    initialValues: initialLoginValues,
    validationSchema: loginValidationSchema,
    onSubmit: login,
  });

  /**
   * Logins user with login data.
   * @param loginData Login data.
   */
  async function login(loginData: Login): Promise<void> {
    setIsLoading(true);
    await appDispatch(loginUser(loginData));
    setIsLoading(false);
  }

  return (
    <>
      <Typography component='h1' variant='h2'>Login</Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
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
          <Button
            disabled={isLoading}
            fullWidth
            type='submit'
            variant='contained'>Login</Button>
        </Stack>
      </form>
      <Typography variant='button' component='span'>
        <Link to={'../register'}>Register</Link>
      </Typography>
    </>
  );
};

export const LoginForm = memo(LoginFormComponent);
