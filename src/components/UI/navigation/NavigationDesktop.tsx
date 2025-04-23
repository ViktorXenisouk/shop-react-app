import MyLink from "./link/MyLink"
import { Logo } from "./logo/Logo"
import style from './NavigationDesktop.module.css'
import navStyle from './Navbar.module.css'
import { LINK_DATA, EXPAND_LINK_DATA } from "../../API"
import { useEffect, useState } from "react"
import ExpandLink from './link/ExpandLink';
import Search from "../search/Search";
import { Link } from "react-router-dom"

const NavigationDesktop = ({ onSearchClick }: { onSearchClick: () => void }) => {
    const [event] = useState(new Event('close-all'))

    useEffect(() => {
        document.body.addEventListener('click', (ev) => {
            document.body.dispatchEvent(event);
        })
    })

    return (
            <div className={style['container']}>
                <div className={style["logo--container"]}>
                    <Logo />
                </div>
                <div className={style["nav-list--container"]}>
                    {
                        EXPAND_LINK_DATA.map((item) =>
                            <ExpandLink event={event} title={item.title} links={item.links} />)
                    }
                    {
                        LINK_DATA.map((item) =>
                            <MyLink to={item.to}>{item.title}</MyLink>)
                    }
                </div>
                <div className={style['right--container']}>
                    <button className={style['btn']} onClick={onSearchClick}>Search</button>
                    <Link className={style['btn']} to='/backet'>Basket</Link>
                    <button className={style['btn']}>Like</button>
                    <button className={style['btn']}>Authorisation</button>
                </div>
            </div>
    )
}

export { NavigationDesktop }