import { Login } from '@js-camp/core/models/login';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { FC, memo } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

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
  const formik = useFormik<Login>({
    initialValues: initialLoginValues,
    validationSchema: loginValidationSchema,
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <>
      <Typography component='h1' variant='h2'>Login</Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
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
            <Button
              fullWidth
              type='submit'
              variant='contained'>Login</Button>
          </Grid>
        </Grid>
      </form>
      <Link href='#/auth/register' variant="button">Register</Link>
    </>
  );
};

export const LoginForm = memo(LoginFormComponent);
