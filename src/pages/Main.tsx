import style from './Main.module.css';
import { useEffect, useState } from 'react';
import Catalog from '../features/catalog/Catalog';
import {Box} from "@mui/material"

const Main = () => {
    const [currentId,setCurrentId] = useState(-1)

    const [isCatalogMouseOver,setIsCatalogMouseOver] = useState(false)
    const [isCatalogDisplayMouseOver,setIsCatalogDisplayMouseOver] = useState(false)

    useEffect(() => {
        if(!isCatalogMouseOver && !isCatalogDisplayMouseOver){
            setCurrentId(-1)
        }
    },[isCatalogMouseOver,isCatalogDisplayMouseOver])

    const onCurrentIdUpdate = (id:number) => {
        setCurrentId(id)
    }

    return (
        <Box display='flex'>
            <Catalog/>
            <div className={style['context']}>

            </div>
        </Box>
    )
}

export default Main