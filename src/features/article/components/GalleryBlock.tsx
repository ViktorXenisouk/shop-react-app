import { Box } from "@mui/material"
import type { ArticleBlock } from "../../../types/article" 

const GalleryBlock = ({variant,imgUrl}:ArticleBlock) => {
const justify = {
    left: 'flex-start',
    right: 'flex-end',
    center: 'center',
  }[variant || 'center'];

  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent={justify} my={4}>
      <Box
          component="img"
          src={imgUrl}
          alt={`gallery-${imgUrl}`}
          sx={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 1 }}
        />
    </Box>
  );
}

export default GalleryBlock