import { useMemo, useState } from "react"
import style from "./Search.module.css"

const Search = ({ isActive, setIsActive }: { isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [searchQuery, setSearchQuery] = useState('')
    const result = useMemo(() => {
        return ['none']
    }, [searchQuery])

    const onCancelClick = () => {
        setIsActive(false)
    }



    const stopPropagation: React.MouseEventHandler = (event) => {
        event.stopPropagation();
    }

    return (
        <div onClick={onCancelClick} className={style['container'] + ' ' + (!isActive ? style['hide'] : '')}>
            <div onClick={stopPropagation} className={style['content']}>
                <div className={style['search--container']}>
                    <button onClick={onCancelClick}>cancel</button>
                    <input type="text" onChange={(event) => setSearchQuery(event.target.value)} value={searchQuery} />
                    <button onClick={onCancelClick}>Search</button>
                </div>
                <div className={style['result']}>
                    {(result && result.length > 0) ? result.map((item) => item) : '...'}
                </div>
            </div>
        </div>
    )
}

export default Search