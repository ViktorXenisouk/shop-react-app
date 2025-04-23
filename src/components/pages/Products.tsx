import style from "./Products.module.css"
import { getAllItemDatasAndBasket } from "../API/server"
import { Loading } from "../UI/loading/Loading"
import { ItemData } from "../API/itemsData"
import ProductCard from "../card/productCard/ProductCard"
import Filter from '../UI/filter/Filter';
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { URLSearchParams } from 'node:url'

const shop = ({ data }: { data: ItemData[] }) => {

    return (
        <div className={style['main']}>
            {data.map((item) => <ProductCard count={item.count} id={item.id} title={item.name} imgURL={item.imageURL} />)}
        </div>
    )
}

const Products = () => {

    const params = useParams()

    const [searchParams,setSearchParams] = useSearchParams()

    const tag = searchParams.get('tag')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    console.log(tag,category,search)

    return (
        <div className={style['container']}>
            <div className={style['header']}>

            </div>
            <Loading getData={getAllItemDatasAndBasket} params={{tags:tag,category:category,name:search,page:10,count:1}} page={shop} />
            <div className={style['filter']}>
                <Filter/>
            </div>
        </div>
    )
}

export default Products