import { useState, useEffect } from "react"
import { Logo } from "./logo/Logo"
import { LINK_DATA, EXPAND_LINK_DATA } from "../../API"
import MyLink from "./link/MyLink"
import navStyle from './Navbar.module.css'
import style from './NavigationMobile.module.css'

const NavigationMobile = ({ onSearchClick }: { onSearchClick: () => void }) => {
    const [isMenuActive, setIsMenuActive] = useState(false)

    const [fixedContainerCSS,setFixedContainerCSS] = useState(style['default'])
    const [hiddenElCSS,setHiddenElCSS] = useState('def')

    const onBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        setIsMenuActive(false)
    }

    const onLinkClick = () => {
        setIsMenuActive(false)
    }

    const onClick = () => {
        setIsMenuActive((prev) => {
            setFixedContainerCSS(!prev? style['open']: style['close'])
            setHiddenElCSS(!prev? style['hidden']: style['showen'])
            return !prev
        })
    }

    const hidden = isMenuActive ? style['hidden'] : style['showen'];

    return (
        <div className={style['container']}>
            <div className={style["header--container"]}>
                <div className={style["header--content"]}>
                    <button className={style["main--btn"]} onClick={onClick}>{isMenuActive ? '...' : '---'}</button>
                    <Logo className={hiddenElCSS} />
                </div>
                <div className={style['header--content']}>
                    <button className={(style["btn"] + ' ' + hiddenElCSS)} onClick={onSearchClick}>
                        Search
                    </button>
                    <button className={style["btn"]}>
                    Basket
                    </button>
                </div>
            </div>
            <div onClick={onBackgroundClick} className={style['fixed--container'] + ' ' + fixedContainerCSS}>
                <div onClick={(ev) => ev.stopPropagation()} className={style["fixed-list--container"]}>
                    <div className={style["fixed-list"]}>
                        <button>Acaunt</button>
                        <button>Acaunt</button>
                        {EXPAND_LINK_DATA.map((item) =>
                            <div className={style['fixed-list--expand-link--container']}>
                                <p className={style['fixed-list--expand-link--title']}>{item.title}</p>
                                {item.links.map((item) => <MyLink onClick={onLinkClick} to={item.to}>{item.title}</MyLink>)}
                            </div>)}
                        <p className={style['fixed-list--expand-link--title']}>Other:</p>
                        {LINK_DATA.map((item) => <MyLink onClick={onLinkClick} to={item.to}>{item.title}</MyLink>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { NavigationMobile }