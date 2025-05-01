import { useParams } from "react-router-dom"
import { Loading } from "../UI/loading/Loading"
import { getItemById } from "../API/server"
import { type ItemData } from "../API/itemsData"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import style from "./Product.module.css"

const MyProduct = ({ data }: { data: ItemData }) => {
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

const Product = () => {
    const url = process.env.server as string

    const params = useParams()

    const id = params.id as string;

    const requestInit: RequestInit = {}
    requestInit.method = 'GET'

    return (
        <Loading page={MyProduct} url={`${url}/user/basket/${id}`} requestInit={requestInit} />
    )
}

export default Product