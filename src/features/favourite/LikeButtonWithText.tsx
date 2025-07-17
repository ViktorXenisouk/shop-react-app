import { Button } from "@mui/material"
import { FavoriteBorder, Favorite } from "@mui/icons-material"

const LikeButtonWithText = ({ onClick, liked }: { onClick: () => void, liked: boolean }) => {
    return (
        <Button variant="outlined" startIcon={liked ? <Favorite sx={{color:'red'}}/> : <FavoriteBorder />} onClick={onClick} sx={{width:'100%',mx:'0px !important'}}>
            {
                liked ? 'is liked' : 'like'
            }
        </Button>
    )
}

export default LikeButtonWithText