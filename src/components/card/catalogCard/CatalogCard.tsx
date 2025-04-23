import style from "./CatalogCard.module.css"

const CatalogCard = ({ children,isActive ,catalogIndex,setCurrentId }: { children: string,isActive:boolean; catalogIndex: number,setCurrentId:(id:number)=>void }) => {
    const onMouseOver = () => {
        setCurrentId(catalogIndex)
        console.log('currentId:',catalogIndex)
    }

    return (
        <div onMouseOver={onMouseOver} className={(style['container'] + ' ' + (isActive?style['active']:''))}>
            {children}
        </div>
    )
}

export default CatalogCard