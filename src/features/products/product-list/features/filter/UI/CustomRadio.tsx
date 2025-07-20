import { Radio, FormControlLabel } from '@mui/material';

type CustomRadioProps = {
  isSelected: boolean;
  label: string;
  addOrRemoveTag: (tag: string) => void;
  value: string;
};

const CustomRadio = ({ label, value,isSelected,addOrRemoveTag }: CustomRadioProps) => {

  const handleChange = () => {
    addOrRemoveTag(value)
  };

  return (
    <FormControlLabel
      control={
        <Radio
          checked={isSelected}
          onClick={handleChange}
        />
      }
      label={label}
    />
  );
}

export default CustomRadio