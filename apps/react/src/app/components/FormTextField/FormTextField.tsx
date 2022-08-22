import { fieldToTextField, TextFieldProps } from 'formik-mui';
import { ChangeEvent, FC, memo, useCallback } from 'react';
import MuiTextField from '@mui/material/TextField';

const FormTextFieldComponent: FC<TextFieldProps> = (props: TextFieldProps) => {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;

  const onChange = useCallback((event: ChangeEvent) => {
    const { target } = event;

    if (target instanceof HTMLInputElement) {
      const { value } = target;
      setFieldValue(name, value);
    }
  }, [setFieldValue, name]);

  return <MuiTextField variant='outlined' fullWidth {...fieldToTextField(props)} onChange={event => onChange(event)} />;
};

export const FormTextField = memo(FormTextFieldComponent);
