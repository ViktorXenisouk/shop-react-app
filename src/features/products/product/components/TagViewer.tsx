import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Typography } from "@mui/material"

type Props = {
    tags?: string[]
}

const TagsViewer: React.FC<Props> = ({ tags }) => {
    return (
        <Typography>Tags: {tags?.map((item) =>
            <Typography
                component={RouterLink} to={`/products/?tag=${item}`}
                sx={{
                    color: 'black',
                    '&:hover': {
                        colot: 'rgb(60, 60, 60)',
                        textDecoration: 'underline',
                    }
                }}>
                {item},
            </Typography>)}
        </Typography>)
}

export default TagsViewer