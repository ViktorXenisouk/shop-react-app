import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Box, Chip } from '@mui/material';

const allTags = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'CSS'];

type Props = { defaultValue?: string[], onChange?: (value: string[]) => void }

const TagsInput = ({ defaultValue, onChange }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultValue || []);
  useEffect(() => {
    if (onChange)
      onChange(selectedTags)
  }, [selectedTags])
  return (
    <Autocomplete
      defaultValue={defaultValue}
      multiple
      options={allTags}
      value={selectedTags}
      onChange={(event, newValue) => setSelectedTags(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Выберите теги"
          placeholder="Начните ввод..."
        />
      )}
    />
  );
};

export default TagsInput;