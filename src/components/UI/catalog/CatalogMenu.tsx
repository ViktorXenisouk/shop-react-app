import { useState } from "react"
import { CATALOG_DATA } from "../../API/catalog.data"
import style from "./CalalogMenu.module.css"
import CatalogCard from "../../card/catalogCard/CatalogCard"

const CatalogMenu = ({ currentId,onCurrentIndexUpdate, setIsMouseOver }: {currentId:number, onCurrentIndexUpdate: (id: number) => void, setIsMouseOver: (value: boolean) => void }) => {
    const [catalogData] = useState(CATALOG_DATA)

    const setCurrentId = (id: number) => {
        onCurrentIndexUpdate(id)
    }

    const onMouseOver = () => {
        setIsMouseOver(true)
    }
    const onMouseOut = () => {
        setIsMouseOver(false)
    }

    return (
        <div className={style['container']} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            {catalogData.map((item, i) => <CatalogCard isActive={currentId==i} setCurrentId={setCurrentId} catalogIndex={i}>{item.name}</CatalogCard>)}
        </div>
    )
}

export default CatalogMenu