import FilterBlock from "./FilterBlock"
import style from "./HorizontalFilterList.module.css"
import filterStyle from "./Filters.module.css"

const HorizontalFilterList = ({ name, tags }: { name: string, tags:string[] }) => {

    

    return (
        <div className={filterStyle['container']}>
            <h4 className={filterStyle['title']}>{name}</h4>
            <div className={style['list']}>
                {tags.map((item) => <FilterBlock>{item}</FilterBlock>)}
            </div>
        </div>
    )
}

export default HorizontalFilterList