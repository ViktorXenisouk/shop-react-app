import ItemListManager from "./ItemListManager"
import { forwardRef, useImperativeHandle, useState } from "react"
import CategoryTagsInput from "./CategoryTagsInput"
import CategoryTypeInput from "./CategoryTypeInput"
import { Tags,Tag } from "../../../types/tags"
import { Stack, Paper, TextField, Divider } from "@mui/material"

import { Variant,CategoryProps,FilterItem } from "../../../types/catalog"

type ItemProps = {
    getInfo: () => FilterItem
}

const ItemComponentExample = forwardRef<ItemProps,{defaultData:FilterItem}>((props, ref) => {

    const [body, setBody] = useState<FilterItem>({title:props.defaultData.title,props:props.defaultData.props,variant:props.defaultData.variant})

    const nameHandler = (value: string) => {
        setBody((prev) => {
            prev.title = value;
            return prev;
        })
    }

    const tagsHandler = (value: string[]) => {
        setBody((prev) => {
            prev.props.tags = value;
            return prev;
        })
    }

    const myInputhandler = (value: string) => {
        setBody((prev) => {
            prev.variant = value as Variant;
            return prev;
        })
    }

    const getInfo = () => {
        return body
    }

    useImperativeHandle(ref, () => ({
        getInfo
    }))

    return (
        <Stack spacing={2} sx={{pb:'5px',mb:'30px',width:'100%',borderBottom:'black solid 1px'}}>
            <TextField sx={{width:'100%'}} defaultValue={body.title} onChange={(ev) => nameHandler(ev.target.value)} label='name' />
            <CategoryTypeInput onChange={myInputhandler} />
            <CategoryTagsInput defaultValue={body.props.tags} freeSolo onChange={tagsHandler} />
        </Stack>
    )
})

const CategoryListTagsManager = ({onChange,defaultValue}:{onChange:(value: FilterItem[])=>void,defaultValue?:FilterItem[]}) => {

    return (
        <ItemListManager title='tags' initialData={defaultValue} onChange={onChange} itemComponent={ItemComponentExample} />
    )
}

export default CategoryListTagsManager