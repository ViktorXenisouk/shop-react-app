import style from "./Products.module.css"
import { getAllItemDatasAndBasket } from "../API/server"
import { Loading } from "../UI/loading/Loading"
import { ItemData } from "../API/itemsData"
import ProductCard from "../card/productCard/ProductCard"
import Filter from '../UI/filter/Filter';
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import dotenv from 'dotenv';

const MyProducts = ({ data }: { data: ItemData[] }) => {

    return (
        <div className={style['main']}>
            {data.map((item) => <ProductCard count={item.count} id={item.id} title={item.name} imgURL={item.imageURL} />)}
        </div>
    )
}

const Products = () => {
    const url = process.env.server as string

    const [searchParams, setSearchParams] = useSearchParams()

    const tag = searchParams.get('tag')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const requestInit: RequestInit = {}
    requestInit.method = 'GET'

    return (
        <div className={style['container']}>
            <div className={style['header']}>

            </div>
            <Loading page={MyProducts} url={`${url}/products/search/?tag=${tag}?category=${category}`} requestInit={requestInit} />
            <div className={style['filter']}>
                <Filter />
            </div>
        </div>
    )
}

export default Products