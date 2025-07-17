import { useState } from "react";
import { TextField } from "@mui/material";

const validateCount = (value:string,count:number) => {
return value.length >= count
}

type Props = {
    value:string,
    onChange:(value:string)=>void,
    min:number,
label:string,
    setIsValid?:(value:boolean)=>void
}

const MinCountInput = ({value,onChange,min=4,label,setIsValid}:Props) => {
  const [touched, setTouched] = useState(false);

    const isValid = validateCount(value,min);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
setIsValid?.(validateCount(e.target.value,min))
    if (!touched) setTouched(true);
  };

    return (
 <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        error={touched && !isValid}
        helperText={
          touched && !isValid ? `lenght is not more than ${min})` : ' '
        }
      />
    )
}

export default MinCountInput