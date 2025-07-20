import ItemListManager from "./ItemListManager"
import { forwardRef, useImperativeHandle, useState } from "react"
import CategoryTagsInput from "./CategoryTagsInput"
import CategoryTypeInput from "./CategoryTypeInput"
import { Tags,Tag } from "../../../types/tags"
import { Stack, Paper, TextField, Divider } from "@mui/material"

type ItemProps = {
    getInfo: () => { name: string, tags: string[],type:string }
}

const ItemComponentExample = forwardRef<ItemProps,{defaultData:{ name: string, tags: Tag, type: string}}>((props, ref) => {

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
        <Stack spacing={2} sx={{pb:'5px',mb:'30px',width:'100%',borderBottom:'black solid 1px'}}>
            <TextField sx={{width:'100%'}} defaultValue={body.name} onChange={(ev) => nameHandler(ev.target.value)} label='name' />
            <CategoryTypeInput onChange={myInputhandler} />
            <CategoryTagsInput defaultValue={body.tags} freeSolo onChange={tagsHandler} />
        </Stack>
    )
})

const CategoryListTagsManager = ({onChange,defaultValue}:{onChange:(value: Tag[])=>void,defaultValue?:Tag[]}) => {

    return (
        <ItemListManager title='tags' initialData={defaultValue} onChange={onChange} itemComponent={ItemComponentExample} />
    )
}

export default CategoryListTagsManager