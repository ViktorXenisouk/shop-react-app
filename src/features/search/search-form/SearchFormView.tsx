import React from 'react';
import type { SearchItem } from '../../../types/search-item';
import { Autocomplete, Box, Typography, Avatar, IconButton, Divider, InputBase, Paper } from '@mui/material';
import { SearchSharp as SearchIcon } from '@mui/icons-material';

type Props = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    setCurrent: React.Dispatch<React.SetStateAction<string | SearchItem | null>>;
    options: SearchItem[] | undefined;
    isLoaded: boolean;
    submitHandler: () => void;
}

const SearchFormView: React.FC<Props> = (props) => {

    const { inputValue, setInputValue, setCurrent, options, isLoaded, submitHandler } = props

    return (
        <Autocomplete
            fullWidth
            freeSolo
            inputValue={inputValue}
            slotProps={{ paper: { sx: { border: 'none' } }, popper: { sx: { boxShadow: 5 } } }}
            onInputChange={(e, value) => setInputValue(value)}
            onChange={(e, value) => setCurrent(value)}
            options={options ?? []}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
            noOptionsText="Ничего не найдено"
            loading={!isLoaded}
            renderInput={(params) => (
                <>
                    <Paper
                        ref={params.InputProps.ref}
                        sx={{
                            p: '4px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            boxShadow: 5
                        }}>
                        <InputBase
                            {...params}
                            slotProps={{ input: { ...params.inputProps } }}
                            placeholder="Search"
                        />
                        <Divider
                            orientation="vertical"
                            sx={{
                                height: 28,
                                m: 0.5
                            }} />
                        <IconButton
                            onClick={submitHandler}
                            sx={{
                                width: 50,
                                height: 50
                            }}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </>
            )}
            renderOption={(props, option) =>
                typeof option === 'string' ? null : (
                    <Box
                        component="li"
                        {...props}
                        key={option.url}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, borderBottom: 'solid 2px', borderColor: 'secondary.main' }}
                    >
                        <Avatar src={option.icon} alt={option.name} sx={{ width: 32, height: 32 }} />
                        <Box>
                            <Typography>{option.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {option.type}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        />
    );
}

export default SearchFormView