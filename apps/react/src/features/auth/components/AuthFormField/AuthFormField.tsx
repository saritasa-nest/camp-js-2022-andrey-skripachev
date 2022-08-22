import TextField from '@mui/material/TextField';
import { FC, memo } from 'react';

const AuthFormFieldComponent: FC = () => (
  <TextField
    fullWidth
    variant='outlined'
  />
);

export const AuthFormField = memo(AuthFormFieldComponent);
