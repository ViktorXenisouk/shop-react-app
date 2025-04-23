import { Link } from "react-router-dom"
import style from "./ProductCard.module.css"
import { useEffect, useState } from "react";
import CountBlock from "../../UI/countBlock/CountBlock";

type ItemCardProps = {
    title: string;
    id: string;
    imgURL: string;
    count?: number;
}
const ProductCard = ({ title, id, imgURL, count }: ItemCardProps) => {

    const [cnt, setCnt] = useState(count)

    useEffect(() => {
        if(!cnt || cnt<= 0){

        }

    },[cnt])

    const onLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    }

    const onBucketClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    }

    return (
        <div className={style['container']}>
            <div className={style['image']} style={{ backgroundImage: `url(${imgURL})` }} />
            <Link to={`/product/${id}`} className={style['title']}>{title}</Link>
            <p className={style['discription']}></p>
            <div className={style['btn--container']}>
                <button className={style['btn']} onClick={onLikeClick}>
                    like
                </button>
                {
                    !cnt || cnt <= 0 ?
                        <button className={style['btn']} onClick={onBucketClick}>
                            Add to bucket
                        </button>
                        :
                        <CountBlock count={cnt} setCount={setCnt} />
                }
            </div>
        </div>
    )
}

export default ProductCard