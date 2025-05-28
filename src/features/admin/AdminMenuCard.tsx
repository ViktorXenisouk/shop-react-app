import style from "./AdminMenuCard.module.css"
import { Link } from "react-router-dom"

type AdminMenuCardProps = {
    name:string;
    href:string;
    imgURL?:string;
}
const AdminMenuCard = ({name,href,imgURL}:AdminMenuCardProps) => {

    return (
        <Link to={href} className={style['container']}>
            {name}
        </Link>
    )

}

export default AdminMenuCard