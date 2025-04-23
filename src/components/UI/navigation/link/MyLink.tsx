import { Link } from "react-router-dom"
import style from './MyLink.module.css'

const MyLink = ({ to, children ,onClick}: { to: string, children: string,onClick?:React.MouseEventHandler<HTMLAnchorElement>}) => {
    return (
        <Link onClick={onClick} className={style["nav-link"]} to={to}>
            {children}
        </Link>
    )
}

export default MyLink