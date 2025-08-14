import { FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';

type Props = {
  isSelected: boolean;
  label: string;
  onClick: () => void;
  color?:string;
};

const CheckboxWithLabel: React.FC<Props> = ({ label, isSelected, onClick,color='text.secondary' }) => {
  return (
    <FormControlLabel
      sx={{
        ml: 1
      }}
      labelPlacement='end'
      slotProps={{
        typography: {
          sx: { 
            color:color,
            fontSize: '12px'
           }
        }
      }}

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