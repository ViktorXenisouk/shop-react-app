import React, { useEffect } from 'react';
import { Box, TextField, Typography, SxProps, OutlinedInput, styled } from '@mui/material';

type Props = {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
};

const RangeInput: React.FC<Props> = ({ min, max, onChange }) => {

  const handleMinChange = (val:number) => {
      onChange({ min: val, max: max });
    }

  const handleMaxChange = (val:number) => {
      onChange({ min: min, max: val });
  };

  const isError = min > max || max < min

  return (
    <Box sx={{ px: '0px' }} display="flex" alignItems="center" gap='1px'>
      <TextField
        sx={{ px: '8px', py: '2px', fontSize: '12px', width: '90px', '& input': { MozAppearance: 'textfield' } }}
        slotProps={ {htmlInput:{style: { padding: '8px' },min:0}}}
        placeholder='Min'
        type="number"
        value={min == 0 ? '' : min}
        onChange={(ev) => handleMinChange(parseInt(ev.target.value))}
        error={isError}
      />
      <Typography>—</Typography>
      <TextField
        sx={{ px: '8px', py: '2px', fontSize: '12px', width: '90px', '& input': { MozAppearance: 'textfield' } }}
        slotProps={ {htmlInput:{style: { padding: '8px' },min:0}}}
        placeholder='Max'
        type="number"
        value={max == 0 ? '' : max}
        onChange={(ev) => handleMaxChange(parseInt(ev.target.value))}
        error={isError}
      />
    </Box>
  );
};

export default RangeInput;