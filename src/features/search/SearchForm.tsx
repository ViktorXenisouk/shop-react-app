import {
    Autocomplete,
    Box,
    CircularProgress,
    TextField,
    Typography,
    Avatar,
    IconButton,
    Stack
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SearchItem } from '../../types/searchItem';
import { useRequest } from '../../hooks/useRequest';
import { SxProps } from '@mui/material';

const SearchForm = ({ onSubmit }: { onSubmit?: () => void }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [current, setCurrent] = useState<SearchItem | null | string>(null);

    // 🔄 Автоматически загружаем подсказки при изменении inputValue
    const [isLoaded, options] = useRequest<SearchItem[]>(
        `/search/help/?search=${encodeURIComponent(inputValue)}`,
        { method: 'GET' }
    );

    // 🔍 Обработка отправки формы
    const submitHandler = () => {
        const searchTerm = inputValue.trim();
        if (searchTerm) {
            const url = `/search/${encodeURIComponent(searchTerm)}`;
            console.log(url);
            navigate(url);
            onSubmit?.();
        }
    };

    // ▶️ Если выбран конкретный элемент — переходим сразу
    useEffect(() => {
        if (current) {
            if (typeof current === 'string') {
                navigate(current);
            }
            else if (typeof current === 'object' && current.url in current) {
                navigate(current.url);
            }
            onSubmit?.();
        }
    }, [current]);

    return (
        <Stack direction="row" sx={{ mt: 10 }}>
            <Autocomplete
                fullWidth
                freeSolo // 👈 разрешаем произвольный ввод
                inputValue={inputValue}
                onInputChange={(e, value) => setInputValue(value)}
                onChange={(e, value) => setCurrent(value)} // выбор из подсказки
                options={options ?? []}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                noOptionsText="Ничего не найдено"
                loading={!isLoaded}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Поиск"
                        variant="outlined"
                        fullWidth
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {!isLoaded && <CircularProgress color="inherit" size={20} />}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }
                        }}
                    />
                )}
                renderOption={(props, option) =>
                    typeof option === 'string' ? null : (
                        <Box
                            component="li"
                            {...props}
                            key={option.url}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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

            <IconButton onClick={submitHandler} sx={{ width: 50, height: 50 }}>
                <SearchIcon />
            </IconButton>
        </Stack>
    );
};

export default SearchForm;