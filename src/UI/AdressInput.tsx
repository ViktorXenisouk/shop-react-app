import React from 'react';
import { Address } from '../types/adress';
import { TextField, MenuItem, Grid } from '@mui/material';

const countries = ['Spain', 'Czech Republic', 'Greece', 'Germany', 'USA'];

type Props = {
  value: Address;
  onChange?: (val: Address) => void;
};

const AddressInput = ({ value, onChange }:Props) => {
  const handleChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, [field]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{xs:12}}>
        <TextField
          label="Street and House Number"
          fullWidth
          value={value.street}
          onChange={handleChange('street')}
        />
      </Grid>

      <Grid size={{xs:6}}>
        <TextField
          label="City"
          fullWidth
          value={value.city}
          onChange={handleChange('city')}
        />
      </Grid>

      <Grid size={{xs:6}}>
        <TextField
          label="Postal Code"
          fullWidth
          value={value.postalCode}
          onChange={handleChange('postalCode')}
        />
      </Grid>

      <Grid size={{xs:12}}>
        <TextField
          label="Country"
          select
          fullWidth
          value={value.country}
          onChange={handleChange('country')}
        >
          {countries.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default AddressInput;