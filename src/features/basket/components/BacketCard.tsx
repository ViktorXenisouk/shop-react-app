import { useState } from "react"
import style from "./BacketCard.module.css"
import { Link } from "react-router-dom"
import CountBlock from '../../countBlock/CountBlock';

const BacketCard = ({ id, name, count }: { id: string, name: string, count?: number }) => {
    const [cnt, setCnt] = useState(count)

    return (
        <div className={style['container']}>
            <Link to={`/product/${id}`}>{name}</Link>
            <CountBlock count={cnt} setCount={setCnt}/>
        </div>
    )
}

export default BacketCard;