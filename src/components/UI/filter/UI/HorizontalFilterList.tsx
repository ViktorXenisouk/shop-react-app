import FilterBlock from "./FilterBlock"
import style from "./HorizontalFilterList.module.css"
import filterStyle from "./Filters.module.css"

const HorizontalFilterList = ({ name, options }: { name: string, options: { title: string, value: string }[] }) => {

    

    return (
        <div className={filterStyle['container']}>
            <h4 className={filterStyle['title']}>{name}</h4>
            <div className={style['list']}>
                {options.map((item) => <FilterBlock value={item.value}>{item.title}</FilterBlock>)}
            </div>
        </div>
    )
}

export default HorizontalFilterList