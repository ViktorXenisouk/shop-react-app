import React, { useState, Fragment, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import type { Catalog } from '../../../types/catalog';
import { useRequest } from '../../../hooks/useRequest';

type Props = {
onChange?: (value?: string[]) => void,
 defaultValue?: string[]
}

const TagsInput : React.FC<Props> = ({ onChange, defaultValue }) => {
    const [open, setOpen] = useState(false);

    const [isLoaded, data, errors] = useRequest<Catalog[]>('/category/find/', { method: "GET" })

    let options = useMemo(() => {
        if (!data)
            return []

        let arr = [] as { group: string, tag: string }[]

        data?.forEach(cat => {
            if (cat.filter) {
                for (let categoryName in cat.filter) {
                    if (!('tags' in cat.filter[categoryName].props))
                        continue
                    for (let i = 0; i < cat.filter[categoryName].props.tags.length; i++) {
                        arr.push({ group: cat.name, tag: cat.filter[categoryName].props.tags[i] })
                    }
                }
            }
        })

        arr = arr.filter((item) => item.tag !== 'horizontal')

        return arr
    }, [data])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeHandler = (ev: any, value: { group: string, tag: string }[] | null) => {
        if (onChange) {
            const arr = value?.map((value) => value.tag) ?? undefined
            onChange(arr)
        }
    }

    return (
        <Autocomplete
            multiple
            defaultValue={defaultValue?.map((value) => { return { group: '', tag: value } }) || []}
            onChange={onChangeHandler}
            sx={{ width: 300 }}
            open={open}
            groupBy={(opt) => opt.group}
            onOpen={handleOpen}
            onClose={handleClose}
            options={options}
            getOptionLabel={(option) => option.tag}
            loading={!isLoaded}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="tags"
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

export default TagsInput