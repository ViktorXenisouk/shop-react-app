import type { ArticleBlock } from "../../../types/article"
import { Box, Typography } from "@mui/material"

const ParagraphBlock = ({ variant, text }: ArticleBlock) => {

  if (variant == 'center')
    return (
      <Box sx={{ display: 'grid', alignContent: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" align='center'>
          {text}
        </Typography>
      </Box>
    )

  const columnPos = variant == 'left' ? '1' : '2'

  const align = {
    left: 'right',
    right: 'left',
  }[variant || 'left'] as 'left' | 'right'

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 50%)',justifyContent:'center' }}>
      <Typography variant="body1" align={align} sx={{gridColumn: columnPos}}>
        {text}
      </Typography>
    </Box>
  );
}

export default ParagraphBlock