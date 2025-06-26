import { IconButton, Box, TextField, SxProps } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useEffect } from 'react';

const CountBlock = ({
    count = 0,
    setCount,
    onChange,
}: {
    count?: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    onChange?: (count: number) => void,
}) => {
    useEffect(() => {
setInputValue(count.toString())
    },[count])
    const [inputValue, setInputValue] = useState(count.toString());

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // запрещаем всё, что не цифры, Backspace, Delete, Arrow и Tab
        const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
        ];
        if (
            !/[0-9]/.test(e.key) &&
            !allowedKeys.includes(e.key)
        ) {
            e.preventDefault();
        }
    };

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const parsed = parseInt(value);
        if (!isNaN(parsed) && parsed >= 0) {
            setCount(parsed);
            if (onChange)
                onChange(parsed)
        }
    };

    const onIncrease = () => {
        const newCount = count + 1;
        setCount(newCount);
        setInputValue(newCount.toString());
        if (onChange)
            onChange(newCount)
    };

    const onDecrease = () => {
        const newCount = count - 1 < 0 ? 0 : count - 1;
        setCount(newCount);
        setInputValue(newCount.toString());
        if (onChange)
            onChange(newCount)
    };

    const onBlur = () => {
        // Если значение пустое или невалидное, возвращаемся к текущему count
        if (inputValue.trim() === "" || isNaN(Number(inputValue))) {
            setInputValue('0');
            setCount(0)
            if (onChange)
                onChange(0)
        } else {
            const parsed = parseInt(inputValue, 10);
            if (!isNaN(parsed)) {
                setCount(parsed);
                setInputValue(parsed.toString());
                if (onChange)
                    onChange(parsed)
            }
        }
    };


    return (
        <Box display="flex" alignItems="center">
            <IconButton onClick={onDecrease}>
                <RemoveIcon />
            </IconButton>
            <TextField
                sx={{ maxWidth: 100, '& input': { MozAppearance: 'textfield' }, alignItems: 'center' }}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                value={inputValue}
                type="number"
                onChange={changeHandler}
                slotProps={{
                    htmlInput: {
                        min: 0,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                    }
                }}
                size="small"
            />
            <IconButton onClick={onIncrease}>
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default CountBlock;