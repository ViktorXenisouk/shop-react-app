import {Breadcrumbs,Link} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"


const CategoryParser = ({category}:{category:string}) => {

    const parse = (name: string) => {
        const parts = name.split('/')

        const allPaths: string[] = [];
        for (let i = 1; i <= parts.length; i++) {
            allPaths.push(parts.slice(0, i).join('/'));
        }

        const all = parts.map((item, i) => { return { name: parts[i], fullPath: allPaths[i] } })

        return all
    }

    return (
         <Breadcrumbs>
                        {parse(category).map((item) =>
                            <Link component={RouterLink} to={`/products/${item.fullPath}`}>
                                {item.name}
                            </Link>)}
                    </Breadcrumbs>
    )
}

export default CategoryParser