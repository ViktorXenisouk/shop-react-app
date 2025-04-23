import FilterBlock from "./FilterBlock"
import filterStyle from "./Filters.module.css"
import style from "./VerticalFilterList.module.css"

const VerticalFilterList = ({ name, options }: { name: string, options: { title: string, value: string }[] }) => {



    return (
        <div className={filterStyle['container']}>
            <h4 className={filterStyle['title']}>{name}</h4>
            <div className={style['list']}>
                {options.map((item) => <FilterBlock value={item.value}>{item.title}</FilterBlock>)}
            </div>
        </div>
    )
}

export default VerticalFilterList