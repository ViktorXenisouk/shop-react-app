import React from "react"
import { Button } from "@mui/material"
import { FavoriteBorder, Favorite } from "@mui/icons-material"

type Props = {
    onClick: () => void,
    liked: boolean
}

const LikeButtonWithText: React.FC<Props> = ({ onClick, liked }) => {
    return (
        <Button
            onClick={onClick}
            variant="outlined"
            startIcon={liked ?
                <Favorite sx={{ color: 'red' }} />
                :
                <FavoriteBorder />}
            sx={{
                width: '100%',
                mx: '0px !important'
            }}>
            {
                liked ?
                    'is liked'
                    :
                    'like'
            }
        </Button>
    )
}

export default LikeButtonWithText