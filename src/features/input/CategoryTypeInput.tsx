import { Autocomplete, TextField } from "@mui/material"

const CategoryTypeInput = ({ onChange }: { onChange: (value: string) => void }) => {
  const options = ['horizontal', 'vertical']
  const defaultValue = "horrizontal"
  const changeHandler = (event: any, value: string | null) => {
    onChange(value || defaultValue)
  }
  return (
    <Autocomplete
      disablePortal
      options={options}
      defaultValue={defaultValue}
      onChange={changeHandler}
      renderInput={(params) => <TextField {...params} label="Tag type" />}
    />
  );
}

export default CategoryTypeInput