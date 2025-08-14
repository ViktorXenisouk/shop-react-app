import React from "react"
import { IconButton } from "@mui/material"
import { FavoriteBorder, Favorite } from "@mui/icons-material"

type Props = {
    onClick: () => void,
    liked: boolean
}

const LikeButton: React.FC<Props> = ({ onClick, liked }) => {
    return (
        <IconButton onClick={onClick}>
            {
                liked ? 
                <Favorite sx={{ color: 'red' }} /> : 
                <FavoriteBorder />
            }
        </IconButton>
    )
}

export default LikeButton