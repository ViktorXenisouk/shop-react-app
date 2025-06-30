import { Box } from "@mui/material"
import type { ArticleBlock } from "../../../types/article" 

const GalleryBlock = ({variant,image}:ArticleBlock) => {
const justify = {
    left: 'flex-start',
    right: 'flex-end',
    center: 'center',
  }[variant || 'center'];

  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent={justify} my={4}>
      <Box
          component="img"
          src={image}
          alt={`gallery-${image}`}
          sx={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: 1 }}
        />
    </Box>
  );
}

export default GalleryBlock