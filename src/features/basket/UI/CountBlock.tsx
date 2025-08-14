import React, { useState, useEffect } from "react";
import { IconButton, Box, TextField } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
    count?: number;
    setCount?: React.Dispatch<React.SetStateAction<number>>;
    onChange?: (count: number) => void,
}

const CountBlock: React.FC<Props> = ({ count = 0, setCount, onChange, }) => {

    const [inputValue, setInputValue] = useState(count.toString());

    useEffect(() => {
        setInputValue(count.toString())
    }, [count])

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
            setCount?.(parsed);
            onChange?.(parsed)
        }
    };

    const onIncrease = () => {
        const newCount = count + 1;
        setCount?.(newCount);
        setInputValue(newCount.toString());
        onChange?.(newCount)
    };

    const onDecrease = () => {
        const newCount = count - 1 < 0 ? 0 : count - 1;
        onChange?.(newCount)
        if (count <= 0) {
            return
        }
        setInputValue(newCount.toString())
    };

    const onBlur = () => {
        if (inputValue.trim() === "" || isNaN(Number(inputValue))) {
            setInputValue('0');
            setCount?.(0)
            onChange?.(0)

        } else {
            const parsed = parseInt(inputValue, 10);
            if (!isNaN(parsed)) {
                setCount?.(parsed);
                setInputValue(parsed.toString());
                onChange?.(parsed)
            }
        }
    };


    return (
        <Box display="flex" alignItems="center">
            <IconButton onClick={onDecrease}>
                <RemoveIcon />
            </IconButton>
            <TextField
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                value={inputValue !== '0' ? inputValue : count.toString()}
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
                sx={{
                    maxWidth: '100px',
                    minWidth: '40px',
                    alignItems: 'center',
                    textAlign: 'center',
                    '& input': { MozAppearance: 'textfield' }
                }}
            />
            <IconButton onClick={onIncrease}>
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default CountBlock;