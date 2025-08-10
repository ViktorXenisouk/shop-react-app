import { isValidPhoneNumber } from 'libphonenumber-js';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { PhoneLabel } from '../components/labels';

type Props = {
  value: string,
  onChange: (value: string) => void,
  setIsValid?: (value: boolean) => void,
}

const PhoneInput : React.FC<Props> = ({ value, onChange, setIsValid }) => {
  const [touched, setTouched] = useState(false);

  const isValid = isValidPhoneNumber(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    onChange(v)
    setIsValid?.(isValidPhoneNumber(v || ''))
    if (!touched) setTouched(true);
  };

  return (
    <TextField
      label={PhoneLabel}
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      onBlur={() => setTouched(true)}
      color={(isValid) ? 'success' : 'error'}
      error={touched && !isValid}
      helperText={
        touched && !isValid ? 'Please enter a valid phone number (eg +420423456789)' : ' '
      }
    />
  )
}

export default PhoneInput