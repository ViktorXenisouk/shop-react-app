import { CATALOG_DATA } from "../../API/catalog.data"
import CatalogDisplayCard from "../../card/catalogDisplayCard/CatalogDisplayCard"
import style from "./CalalogDisplay.module.css"

const CatalogDisplay = ({ className, currentId, setIsMouseOver }: { className: string, currentId: number, setIsMouseOver: (value: boolean) => void }) => {
    const onMouseOver = () => {
        setIsMouseOver(true)
    }
    const onMouseOut = () => {
        setIsMouseOver(false)
    }
    return (
        <div className={(style['container'] + ' ' + className)} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            {
                currentId === -1 ? '' : CATALOG_DATA[currentId].catalogs?.map((item) => <CatalogDisplayCard name={item.name} path={item.path} subCataloge={item.catalogs} />)
            }

        </div>
    )
}

export default CatalogDisplay