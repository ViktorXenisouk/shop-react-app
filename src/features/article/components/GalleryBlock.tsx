import React from "react";
import { Box } from "@mui/material"
import type { ArticleBlock } from "../../../types/article"

const GalleryBlock : React.FC<ArticleBlock> = ({ variant, image }) => {
  const align = {
    left: 'right',
    right: 'left',
  }[variant || 'left'];

  const columnPos = variant == 'left' ? '1' : '2'

  const Img = () => {
    return (
      <Box
        component="img"
        src={image}
        alt={`gallery-${image}`}
        sx={{ width: 'auto', height: '200px', objectFit: 'cover', borderRadius: 1, gridColumn: columnPos, justifyContent: align }}
      />
    )
  }

  if (variant == 'center')
    return (
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent={'center'} my={4}>
        <Box
          component="img"
          src={image}
          alt={`gallery-${image}`}
          sx={{ width: 'auto', height: '200px', objectFit: 'cover', borderRadius: 1 }}
        />
      </Box>
    )
  else if (variant == 'left')
    return (
      <Box display="grid" sx={{ gridTemplateColumns: 'repeat(2,  50%)', justifyContent: 'flex-end' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Img />
        </Box>
      </Box>
    )
  else
    return (
      <Box display="grid" sx={{ gridTemplateColumns: 'repeat(2,  50%)', justifyContent: 'center' }}>
        <Img />
      </Box>
    )
}

export default GalleryBlock