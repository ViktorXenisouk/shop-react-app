import { useEffect, useState } from "react"
import style from "./FilterBlock.module.css"


const FilterBlock = ({ children, value }: { children: string, value: string }) => {

    const [isEnable, setIsEnable] = useState(false)

    const onClick = () => {
        setIsEnable((previousValue) => !previousValue)
    }

    useEffect(() => {
        const onFilterRestart = () => {
            setIsEnable(false)
        }

        document.addEventListener('restart-filter', onFilterRestart)
        return () => document.removeEventListener('restart-filter', onFilterRestart)
    }, [])

    return (
        <div onClick={onClick} className={style['container'] + ' unselectable'}>
            <input className={style['input']} type="radio" value={value} checked={isEnable} />
            <p className={style['text']}>{children}</p>
        </div>
    )
}

export default FilterBlock