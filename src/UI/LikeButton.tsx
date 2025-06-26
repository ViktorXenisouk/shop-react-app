import { IconButton } from "@mui/material"
import { FavoriteBorder, Favorite } from "@mui/icons-material"

const LikeButton = ({ onClick, liked }: { onClick: () => void, liked: boolean }) => {
    return (
        <IconButton onClick={onClick}>
            {
                liked ? <Favorite /> : <FavoriteBorder />
            }
        </IconButton>
    )
}

export default LikeButton