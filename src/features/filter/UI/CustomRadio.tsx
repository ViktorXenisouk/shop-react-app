import { useEffect, useState } from "react"
import { parseTag } from "../utils"
import style from "./FilterBlock.module.css"
import { RadioProps } from "@mui/material"

import { Radio, FormControlLabel } from '@mui/material';

type CustomRadioProps = {
    label: string;
    value: string;
    name: string;
};

const CustomRadio = ({ label, value, name }: CustomRadioProps) => {

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);

    /*
        const radios = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
        radios.forEach((radio) => {
            if ((radio as HTMLInputElement).value !== value) {
                const el = radio as HTMLInputElement;
                el.checked = false;
                el.classList.remove('some-class');
            }
        });
*/
        const thisRadio = document.querySelector(`input[type="radio"][value="${value}"]`);
        thisRadio?.classList.add(style['input']);
    };

    useEffect(() => {
        const onFilterRestart = () => {
            setChecked(false)
            const thisRadio = document.querySelector(`input[type="radio"][value="${value}"]`);
            thisRadio?.classList.remove(style['input']);
        }

        document.addEventListener('restart-filter', onFilterRestart)
        return () => document.removeEventListener('restart-filter', onFilterRestart)
    }, [])

      return (
    <FormControlLabel
      control={
        <Radio
          checked={checked}
          onClick={handleChange}
          value={value}
          name={name}
          className={checked ? style['input'] : ''}
        />
      }
      label={label}
    />
  );
}

export default CustomRadio