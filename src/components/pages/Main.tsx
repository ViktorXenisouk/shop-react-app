import style from './Main.module.css';
import { useEffect, useState } from 'react';
import Catalog from '../UI/catalog/Catalog';

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
        <div className={style['container']}>
            <Catalog/>
            <div className={style['context']}>

            </div>
        </div>
    )
}

export default Main