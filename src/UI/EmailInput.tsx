import { useState } from "react";
import { TextField } from "@mui/material";

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};

type Props = {
    value:string,
    onChange:(value:string)=>void,
    setIsValid?:(value:boolean)=>void
}

const EmailInput = ({value,onChange,setIsValid}:Props) => {
  const [touched, setTouched] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        setIsValid?.(validateEmail(e.target.value))
    if (!touched) setTouched(true);
  };

  const isValid = validateEmail(value);
    return (
 <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        error={touched && !isValid}
        helperText={
          touched && !isValid ? 'Введите корректный email (например: example@gmail.com)' : ' '
        }
      />
    )
}

export default EmailInput