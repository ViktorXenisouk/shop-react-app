import { Breadcrumbs, Link } from "@mui/material"
import { Link as RouterLink, useSearchParams } from "react-router-dom"
import { Home } from "@mui/icons-material"


const CategoryParser = ({ category,renderMain }: { category: string,renderMain?:boolean }) => {
    const [searchParams, setSearchParams] = useSearchParams()

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
        {
            renderMain && 
            <Link component={RouterLink} to={`/?${searchParams.toString()}`} sx={{display: 'flex', alignItems: 'center' }}>
               <Home fontSize="inherit"  sx={{ mr: 0.5 }}/> Main
            </Link>
        }
            {parse(category).map((item) =>
                <Link component={RouterLink} to={`/products/${item.fullPath}?${searchParams.toString()}`}>
                    {item.name}
                </Link>)}
        </Breadcrumbs>
    )
}

export default CategoryParser