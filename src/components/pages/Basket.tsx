import style from "./Basket.module.css"
import { getBasketInfo, BasketInfo } from "../API/basket"
import { Loading } from "../UI/loading/Loading"
import BasketCard from "../card/backetCard/BacketCard"

const MyBasket = ({ data }: { data: BasketInfo[] }) => {

    return (
        <div className={style['container']}>
{data.map((item) => <BasketCard id={item.id} name={item.id.toString()} count={item.count}/>)}
        </div>
    )
}

const Basket = () => {

    return (
        <Loading page={MyBasket} getData={getBasketInfo} />

    )
}

export default Basket