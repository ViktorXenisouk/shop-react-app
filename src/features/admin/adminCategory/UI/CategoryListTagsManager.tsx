import ItemListManager from "../ItemListManager"
import { Box, Stack, TextField, Button } from "@mui/material"
import { useParams } from "react-router-dom"
import { forwardRef, useImperativeHandle, useState } from "react"
import CategoryTagsInput from "../UI/CategoryTagsInput"
import CategoryTypeInput from "../UI/CategoryTypeInput"
import { Tags } from "../type"

type ItemProps = {
    getInfo: () => { name: string, tags: string[],type:string }
}

const ItemComponentExample = forwardRef<ItemProps,{defaultData:{ name: string, tags: Tags, type: string}}>((props, ref) => {

    const [body, setBody] = useState<{ name: string; tags: string[]; type: string }>(() => ({
        name: props.defaultData?.name || '',
        tags: props.defaultData?.tags.tags || [],
        type: props.defaultData?.type || '',
    }))

    console.log(props.defaultData)
    const nameHandler = (value: string) => {
        setBody((prev) => {
            prev.name = value;
            return prev;
        })
    }

    const tagsHandler = (value: string[]) => {
        setBody((prev) => {
            prev.tags = value;
            return prev;
        })
    }

    const myInputhandler = (value: string) => {
        setBody((prev) => {
            prev.type = value;
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
        <Box>
            <TextField defaultValue={body.name} onChange={(ev) => nameHandler(ev.target.value)} label='name' />
            <CategoryTypeInput onChange={myInputhandler} />
            <CategoryTagsInput defaultValue={body.tags} freeSolo onChange={tagsHandler} />
        </Box>
    )
})

const CategoryListTagsManager = ({onChange,defaultValue}:{onChange:(value: Tags[])=>void,defaultValue?:Tags[]}) => {

    return (
        <ItemListManager title='tags' initialData={defaultValue} onChange={onChange} itemComponent={ItemComponentExample} />
    )
}

export default CategoryListTagsManager