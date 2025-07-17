import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

type Props = { defaultValue?: string[], onChange?: (value: string[]) => void,freeSolo?:boolean,options: string[]}

const MultipleChoice = ({ defaultValue, onChange,freeSolo,options }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultValue || []);

  useEffect(() => {
    if (onChange) {
      onChange(selectedTags);
    }
  }, [selectedTags, onChange]);

  const handleChange = (event : React.SyntheticEvent, newValue: (string | null)[]) => {
    // Обработка новых значений, где могут быть строки или null
    // Удаляем null и приводим к массиву строк
    const sanitizedValues = newValue.filter((v): v is string => v !== null);
    setSelectedTags(sanitizedValues);
  };

  const handleInputChange = (event : React.SyntheticEvent, value: string, reason: string) => {
    // Когда пользователь вводит новую строку
    if (reason === 'freeSolo') {
      // Если пользователь вводит новую строку и она ещё не в списке
      if (value && !selectedTags.includes(value)) {
        setSelectedTags(prev => [...prev, value]);
      }
    }
  };
  return (
    <Autocomplete
      multiple
      freeSolo={freeSolo}
      options={options}
      value={selectedTags}
      onChange={handleChange}
      onInputChange={handleInputChange}
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

//export default MultipleChoice;