import { useParams } from "react-router-dom"
import { DataLoaderFromPromise } from "../loading/Loading"
import { type Product } from "../../types/ItemData"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import style from "./Product.module.css"
import { safeFetch } from "../../services/safeFetch"

const MyProduct = ({ data }: { data: Product }) => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate(-1)
    }
    return (
        <div className={style['container']}>
            <div className={style['content']}>
                <button onClick={onButtonClick}>Back</button>
                <p>{data.category}</p>
                <div className={style['img']} style={{ backgroundImage: `url(${data.imageURL})` }}>

                </div>
                <h3>{data.name}</h3>
                <p>{data.tags?.map((item) => <Link className={style['link']} to={`/products/?tag=${item}`}>{item}</Link>)}</p>
            </div>
        </div>
    )
}

const ProductPage = () => {
    const params = useParams()

    const id = params.id as string;

    const requestInit: RequestInit = {}
    requestInit.method = 'GET'

    const res = safeFetch<Product>(`/products/${id}`,requestInit)

    return (
        <DataLoaderFromPromise page={MyProduct} res={res} />
    )
}

export default ProductPage