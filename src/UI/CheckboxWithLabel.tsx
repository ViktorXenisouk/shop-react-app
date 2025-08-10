import { FormControlLabel,Checkbox } from '@mui/material';
import React from 'react';

type Props = {
  isSelected: boolean;
  label: string;
  onClick: ()=>void;
};

const CheckboxWithLabel : React.FC<Props> = ({ label,isSelected,onClick }) => {
  return (
    <FormControlLabel
    sx={{ml:'5px'}}
    labelPlacement='end'
    slotProps={{typography:{sx:{fontSize:'12px'}}}}

      control={
        <Checkbox
        size='small'
          checked={isSelected}
          onClick={onClick}
        />
      }
      label={label}
    />
  );
}

export default CheckboxWithLabel