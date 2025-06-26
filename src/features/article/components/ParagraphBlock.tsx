import type { ArticleBlock } from "../../../types/article" 
import { Box,Typography } from "@mui/material"

const ParagraphBlock = ({variant,text}:ArticleBlock) => {
const align = {
    left: 'left',
    right: 'right',
    center: 'center',
  }[variant || 'left'] as 'left' | 'right' | 'center';

  return (
    <Box my={3}>
      <Typography variant="body1" align={align}>
        {text}
      </Typography>
    </Box>
  );
}

export default ParagraphBlock