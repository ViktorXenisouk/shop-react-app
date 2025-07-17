import { isValidPhoneNumber } from 'libphonenumber-js';
import { useState } from 'react';
import { TextField} from '@mui/material';

type Props = {
    value:string,
    onChange:(value:string)=>void,
    setIsValid?:(value:boolean)=>void
}

const PhoneInput = ({value,onChange,setIsValid}:Props) => {
  const [touched, setTouched] = useState(false);

  const isValid = isValidPhoneNumber(value || '');

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsValid?.(isValidPhoneNumber(value || ''))
    if (!touched) setTouched(true);
  };

  return (
    <TextField
        label="Телефон"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        error={touched && !isValid}
        helperText={
          touched && !isValid ? 'Введите корректный номер телефона (например, +420123456789)' : ' '
        }
      />
  )
}

export default PhoneInput