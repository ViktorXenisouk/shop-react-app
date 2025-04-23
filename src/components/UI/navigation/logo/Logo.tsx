import { Link } from "react-router-dom"
import style from './Logo.module.css'
import animStyle from "../NavigationMobile.module.css"

const Logo = ({ className }:{className?:string}) => {

    return (
        <Link className={(style["logo"] + ' ' + (className))} to='/'>
            Logo
        </Link>
    )
}

export { Logo }


//style={{ display: isHidden ? 'none' : 'inline' }}