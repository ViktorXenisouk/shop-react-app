import React from "react"
import { ReactComponent as EmptyIcon } from "../../../assets/icons/empty-favourite.svg"
import style from "./FavouriteEmpty.module.css"
import { Box, Typography } from "@mui/material"

const FavouriteEmpty : React.FC = () => {
  return (
    <Box className={style['animated-strokes']} display="flex" flexDirection="column" alignItems="center" mt={5}>
      <EmptyIcon />
      <Typography>your favourite list is empty....</Typography>
    </Box>
  );

}

export default FavouriteEmpty