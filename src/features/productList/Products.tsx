import style from "./Products.module.css"
import { DataLoaderFromPromise } from "../loading/Loading"
import { Product } from "../../types/ItemData"
import ProductCard from "./ProductCard"
import Filter from '../filter/Filter';
import { useSearchParams } from "react-router-dom"
import { safeFetch } from "../../services/safeFetch";
import { useLocation } from "react-router-dom";

const MyProducts = ({ data }: { data: Product[] }) => {

    const getProducts = () => {

        return data.map((item) => <ProductCard count={0} id={item._id} title={item.name} imgURL={item.imageURL} />)
    }

    return (
        <div className={style['main']}>
            {getProducts()}
        </div>
    )
}

const Products = () => {
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const tagsParam = queryParams.get('tags'); // строка или null

    // 2. Получаем путь после /products/
    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const requestInit: RequestInit = {}
    requestInit.method = 'GET'

    const res = safeFetch<Product[]>(`/products/search/${subPath}`, requestInit)

    return (
        <div className={style['container']}>
            <div className={style['header']}>

            </div>
            <DataLoaderFromPromise page={MyProducts} res={res} />
            <div className={style['filter']}>
                <Filter />
            </div>
        </div>
    )
}

export default Products