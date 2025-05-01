import { useEffect, useState } from "react"
import filterBlockStyle from "./UI/FilterBlock.module.css"
import style from "./Filter.module.css"
import { Loading } from "../loading/Loading"
import { type FilterData } from "../../API/filterData"
import { getFilterDataByCategory } from "../../API/server"
import HorizontalFilterList from "./UI/HorizontalFilterList"
import VerticalFilterList from "./UI/VerticalFilterList"


const MyFilter = ({data} : {data:FilterData[]}) => {
    const [event] = useState(new Event('restart-filter'))

    const onResetClick = () => {
        document.dispatchEvent(event)
        console.log('on restart')
    }

    const onSearchClick= () => {
        const tags = [] as string[]
        const elements = document.getElementsByClassName(filterBlockStyle['input'])
        for(let i = 0; i < elements.length; i++){
            const el = elements.item(i) as HTMLInputElement | null
            if(!el || el.checked === false)
                continue
            tags.push(el.value)
        }
        console.log(tags)
    }

    return(
        <div className={style['container']}>
            <div className={style['content']}>
            {
                data.map((item) => item.type==='vertical' ? 
                <VerticalFilterList name={item.name} options={item.options}/> : 
                <HorizontalFilterList name={item.name} options={item.options}/>)
            }
            </div>
            <div className={style['btn--container']}>
            <button className={style['btn']} onClick={onSearchClick}>Show Goods</button>
            <button className={style['btn']} onClick={onResetClick}>Reset Filter</button>
            </div>
        </div>
    )
}

const Filter = () => {
       const url = process.env.server as string
       const requestInit: RequestInit = {}
       requestInit.method = 'GET'
   
       return (
           <Loading page={MyFilter} url={`${url}/user/basket`} requestInit={requestInit} />
   
       )
}

export default Filter