import style from "./Basket.module.css"
import { type BasketInfo } from "./types"
import { DataLoaderFromHook } from "../loading/Loading"
import BasketCard from "./components/BacketCard"
import * as Cookie from "../../utils/cookie"
import { useRequest } from "../../hooks/useRequest"

const MyBasket = ({ data }: {data: BasketInfo[]}) => {
    console.log(data)

    return (
        <div className={style['container']}>
            {data && data.length > 0 ? data.map((item) => <BasketCard id={item.id} name={item.id.toString()} count={item.count} />) : 'is empty'}
        </div>
    )
}

const Basket = () => {
    const url = process.env.REACT_APP_API_URL as string
    const token = Cookie.get('user_token')
    const requestInit: RequestInit = {}
    requestInit.method = 'GET'
    requestInit.headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = useRequest<BasketInfo[]>(url,requestInit)

    return (
        <DataLoaderFromHook page={MyBasket} res={response} />
    )
}

export default Basket