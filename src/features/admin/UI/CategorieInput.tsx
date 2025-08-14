import React, { useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import type { Catalog } from '../../../types/catalog';
import { useRequest } from '../../../hooks/useRequest';

type Props = {
    onChange?: (value?: string) => void,
    defaultValue?:string
}

const CategorieInput : React.FC<Props> = ({ onChange,defaultValue }) => {
    const [open, setOpen] = useState(false);

    const [isLoaded, data, errors] = useRequest<Catalog[]>('/category/find/', { method: "GET" })

    const options = data?.map((cat) => cat.fullPath) || []

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeHandler = (ev: any, value: string | null) => {
        if (onChange) {
            onChange(value ?? undefined)
        }
    }

    return (
        <Autocomplete
            onChange={onChangeHandler}
            sx={{ width: 300 }}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            options={options}
            defaultValue={defaultValue}
            loading={!isLoaded}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="categorie"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {!isLoaded ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                        },
                    }}
                />
            )}
        />
    );
}

export default CategorieInput