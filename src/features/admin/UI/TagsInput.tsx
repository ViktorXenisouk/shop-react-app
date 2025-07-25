import { useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import type { Catalog } from '../../../types/catalog';
import { useRequest } from '../../../hooks/useRequest';


const TagsInput = ({ onChange, defaultValue }: { onChange?: (value?: string[]) => void, defaultValue?: string[] }) => {
    const [open, setOpen] = useState(false);

    const [isLoaded, data, errors] = useRequest<Catalog[]>('/category/find/', { method: "GET" })

    let options = [] as { group: string, tag: string }[]

    data?.forEach(cat => {
        if (cat.filter) {
            for (let categoryName in cat.filter) {
                for (let tagName in cat.filter[categoryName].props.tags) {
                    options.push({ group: cat.name, tag: tagName })
                }
            }
        }
    })

    options = options.filter((item) => item.tag !== 'horizontal')

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