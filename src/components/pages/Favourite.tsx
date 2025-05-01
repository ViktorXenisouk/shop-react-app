import style from "./Basket.module.css"
import { type BasketInfo } from "../API/basket"
import { Loading } from "../UI/loading/Loading"
import { FavouriteCard } from "../card/favouriteCard/FavouriteCard"
import * as Cookie from "../utils/cookie"

const MyFavourite = ({ data }: { data:{data: string[]} }) => {
    console.log(data)

    const d = data.data

    return (
        <div className={style['container']}>
            {d && d.length > 0 ? d.map((item) => <FavouriteCard id={item} />) : 'is empty'}
        </div>
    )
}

const Favourite = () => {
    const url = process.env.REACT_APP_API_URL as string
    const token = Cookie.get('user_token')
    const requestInit: RequestInit = {}
    requestInit.method = 'GET'
    requestInit.headers = {
        'Authorization': `Bearer ${token}`
    }

    return (
        <Loading page={MyFavourite} url={`${url}/user/basket`} requestInit={requestInit} />
    )
}

export default Favourite