import { CatalogData } from "../../API/catalog.data"
import { Link } from "react-router-dom"
import style from "./CatalogDisplayCard.module.css"
import { useState } from "react"
import ScrollableObject from '../../UI/scrollableObject/ScrollableObject';

const CatalogDisplayCard = ({ name, path, subCataloge }: { name: string, path: string, subCataloge?: CatalogData[] }) => {

    const [CSS, setCSS] = useState(style['default'])

    const imgURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s'


    const onButtonClick = () => {
        setCSS((previous) => (previous == style['default'] || previous == style['hide']) ? style['show'] : style['hide'])
    }

    return (
        <div className={style['container']}>
            <div className={style['img']} style={{backgroundImage:`url(${imgURL})`}}>

            </div>
            <Link className={(style['link'] + ' ' + style['title'])} to={`/products${path}`}>{name}</Link>
            {
                ((subCataloge && subCataloge.length > 0) && (CSS == style['default'] || CSS == style['hide'])) ?
                <button className={(style['btn'] + ' ' + style['btn--more'])} onClick={onButtonClick}>More</button>
                :
                ''
            }
            {
                subCataloge ?
                    <div className={(style['sub-cataloge--container'] + ' ' + CSS)}>
                        <div className={style['sub-cataloge--content']}> 
                            {subCataloge.map((item) => <Link className={style['link']} to={`/products${item.path}`}>{item.name}</Link>)}
                        </div>
                        <button className={style['btn']} onClick={onButtonClick}>less</button>
                    </div>
                    :
                    ''
            }
        </div>
    )
}


export default CatalogDisplayCard