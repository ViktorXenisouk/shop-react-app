import React from "react"
import { Autocomplete, TextField } from "@mui/material"

type Props = {
  onChange: (value: string) => void
}

const CategoryTypeInput: React.FC<Props> = ({ onChange }) => {
  const options = ['number', 'min-max', 'tags-horizontal', 'tags-vertical']
  const defaultValue = "tags-horizontal"
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