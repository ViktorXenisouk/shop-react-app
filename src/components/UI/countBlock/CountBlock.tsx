import style from "./CountBlock.module.css"
import { useState } from "react"

const CountBlock = ({ count, setCount }: { count?: number, setCount: React.Dispatch<React.SetStateAction<number | undefined>> }) => {

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = parseInt(event.target.value)
        setCount(value)
    }

    const onIncrease = () => {
        setCount((previous) => !previous ? undefined : (previous + 1))
    }

    const onDecrease = () => {
        setCount((previous) => !previous ? undefined : previous - 1 <= 0 ? 0 : (previous - 1))
    }

    return (
        <div className={style['container']}>
            <button onClick={onDecrease}>-</button>
            <input type="number" value={count} onChange={onChange} />
            <button onClick={onIncrease}>+</button>
        </div>
    )
}

export default CountBlock