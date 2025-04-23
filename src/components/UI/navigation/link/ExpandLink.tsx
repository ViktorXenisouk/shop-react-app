import { useEffect, useState } from "react"
import { ExpandLinkType } from "../../../API"
import MyLink from "./MyLink"
import { Link } from "react-router-dom"
import style from './ExpandLink.module.css'

const ExpandLink = ({ title, links, event }: ExpandLinkType & { event: Event }) => {

    const [containerCSS, setContainerCSS] = useState(style['default'])

    const onTouchStart = () => {
        setContainerCSS(style['hide'])
    }

    const onTouchEnd = () => {
        setContainerCSS(style['show'])
    }

    const onLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        ev.stopPropagation()
        document.dispatchEvent(event)
    }

    return (
        <div onMouseOver={onTouchEnd} onMouseOut={onTouchStart} className={`${style['expand-link--container']} ${containerCSS}`}>
            <div className={style['expand-link']}>
                {title}
            </div>
            <div className={style['nav-link--container']}>
                <div className={style['nav-link--list']}>
                    {links.map((item) =>
                        <Link onClick={onLinkClick} className={style['expand-link--el']} to={item.to}>{item.title}</Link>)}
                </div>
            </div>
        </div>
    )
}

export default ExpandLink