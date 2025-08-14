import { ReactComponent as BasketIcon } from "../../../assets/icons/empty-basket.svg"
import style from "./animation.module.css"
import { Box, Typography } from "@mui/material"

const FavouriteEmpty = () => {
  return (
    <Box className={style['animated-strokes']} display="flex" flexDirection="column" alignItems="center" mt={5}>
      <BasketIcon/>
      <Typography>your basket is empty....</Typography>
    </Box>
  );

}

export default FavouriteEmpty