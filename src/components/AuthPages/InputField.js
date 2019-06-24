import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function InputField({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, isValid }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  return (
    <>
      <TextField
        aria-describedby={field.name + "-popover"}
        {...field}
        {...props}
        label={field.name}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      {touched[field.name] && <Typography variant="caption" color="error" display="block" gutterBottom>{errors[field.name]}</Typography>}
    </>
  )
}
