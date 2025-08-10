import { Box, Stack, Button, Typography } from "@mui/material"
import React, { useState } from "react"

type Props<T> = {
    onChange: (data: T[]) => void
    itemComponent: ItemComponentType<T, any>
    initialData?: T[],
    title:string,
}

type ItemComponentType<T, RefType> = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<{ getInfo: () => T }> & React.RefAttributes<RefType> & any
>

type ItemData<T> = {
    id: number
    ref: React.RefObject<{ getInfo: () => T }>
    props?: any
}

const ItemListManager = <T,>({ onChange, itemComponent, initialData,title }: Props<T>) => {

    
    const [items, setItems] = useState<ItemData<T>[]>(() =>
        initialData?.map((data, index) => ({
            id: Date.now() + index,
            ref: React.createRef<{ getInfo: () => T }>(),
            props: { defaultData: data }
        })) as [] ?? []
    )

    const addItem = (props?: any) => {
        const ref = React.createRef<{ getInfo: () => T }>() as React.RefObject<{ getInfo: () => T; }>
        const newItem: ItemData<T> = {
            id: Date.now(),
            ref,
            props
        }
        setItems(prev => {
            const newItems = [...prev, newItem]
            onChange(getData(newItems))
            return newItems
        })
    }

    const removeItem = (id: number) => {
        setItems(prev => {
            const newItems = prev.filter(item => item.id !== id)
            onChange(getData(newItems))
            return newItems
        })
    }

    const getData = (itemsArr: ItemData<T>[]) => {
        return itemsArr.map(item => {
            const instance = item.ref.current
            return instance ? instance.getInfo() : null
        }).filter(Boolean) as T[]
    }

    return (
        <Box>
            <Typography>{title}</Typography>
            <Stack spacing={2}>
                {items.map(item => (
                    <Box key={item.id} display="flex" alignItems="center" gap={1}>
                        {React.createElement(itemComponent, {
                            ...item.props,
                            ref: item.ref,
                            getInfo: undefined
                        })}
                        <Button onClick={() => removeItem(item.id)}>Удалить</Button>
                    </Box>
                ))}
                <Button onClick={() => addItem()}>Добавить элемент</Button>
            </Stack>
        </Box>
    )
}

export default ItemListManager