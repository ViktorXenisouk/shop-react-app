import CatalogMenu from "./CatalogMenu"
import CatalogDisplay from "./CatalogDisplay"
import { useEffect, useState } from "react"
import style from "./Catalog.module.css"
import { useTimer } from "../../hooks/useTimer"

const Catalog = () => {
    const [currentId, setCurrentId] = useState(-1)

    const [isCatalogMouseOver, setIsCatalogMouseOver] = useState(false)
    const [isCatalogDisplayMouseOver, setIsCatalogDisplayMouseOver] = useState(false)
    const [catalogDisplayCSS, setCatalogDisplayCSS] = useState(style['hide'])

    const timer = useTimer(() => setCurrentId(-1), 30000)

    useEffect(() => {
        if (!isCatalogMouseOver && !isCatalogDisplayMouseOver) {
            timer('reset')
        }
        else {
            timer('disactive')
        }
    }, [isCatalogMouseOver, isCatalogDisplayMouseOver])

    useEffect(() => {
        if (currentId == -1) {
            setCatalogDisplayCSS(style['hide'])
        }
        else {
            setCatalogDisplayCSS(style['active'])
        }
    }, [currentId])

    const onCurrentIdUpdate = (id: number) => {
        setCurrentId(id)
    }

    return (
        <div className={style['container']}>
            <div className={style['menu-container']}>
                <CatalogMenu currentId={currentId} onCurrentIndexUpdate={onCurrentIdUpdate} setIsMouseOver={setIsCatalogMouseOver} />
            </div>
            <div className={style['display-container']}>
                <CatalogDisplay className={catalogDisplayCSS} currentId={currentId} setIsMouseOver={setIsCatalogDisplayMouseOver} />
            </div>
        </div>
    )
}

export default Catalog