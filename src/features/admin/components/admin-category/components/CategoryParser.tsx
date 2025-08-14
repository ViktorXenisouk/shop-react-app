import React from "react"
import { Breadcrumbs, Link } from "@mui/material"
import { Link as RouterLink, useSearchParams } from "react-router-dom"
import { Home } from "@mui/icons-material"

type Props = {
    category: string,
    renderMain?: boolean
}


const CategoryParser: React.FC<Props> = ({ category, renderMain }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const parse = (name: string) => {
        const parts = name.replace('#root', '').split('/')

        const allPaths: string[] = [];
        for (let i = 1; i <= parts.length; i++) {
            allPaths.push(parts.slice(0, i).join('/'));
        }

        const all = parts.map((item, i) => { return { name: parts[i], fullPath: allPaths[i] } })

        return all
    }

    const onClick = (value: string) => {
        searchParams.set('parentPath', value)
        setSearchParams(searchParams)
    }

    return (
        <Breadcrumbs>
            <Link component='p' onClick={() => onClick('#root')} sx={{ display: 'flex', alignItems: 'center' }}>
                <Home fontSize="inherit" sx={{ mr: 0.5 }} /> Main
            </Link>
            /admin/categories/search/?parentPath=%23root
            {parse(category).map((item) =>
                <Link component='p' onClick={() => onClick(item.fullPath)}>
                    {item.name}
                </Link>)}
        </Breadcrumbs>
    )
}

export default CategoryParser