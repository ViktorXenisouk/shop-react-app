import type { ArticleBlock } from "../../../types/article"
import { Box, Grid, Typography } from "@mui/material"


const ImageWithTextBlock = ({ text, image, variant }: ArticleBlock) => {
  const img = (
    <Box
      component="img"
      src={image}
      alt={`gallery-${image}`}
      sx={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: 1, gridColumn: '2' }}
    />
  )

  if (variant == 'center')
    return (
      <Box my={4}>
        <Typography variant="body1">
          {text}
        </Typography>
        {img}
      </Box>
    )
  else if (variant == 'left')
    return (
      <Box display="grid" sx={{ gridTemplateColumns: 'repeat(2, 50%)', justifyContent: 'center' }}>
        {img}
      </Box>
    )
  else
  return (
    <Box display="grid" sx={{ gridTemplateColumns: 'repeat(2,  50%)', justifyContent: 'center' }}>
      <Box
        component="img"
        src={image}
        alt={`gallery-${image}`}
        sx={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: 1, gridColumn: '2' }}
      />
    </Box>
  )

  const imageFirst = variant === 'left';

  return (
    <Grid container spacing={4} alignItems="center" my={4} flexDirection={{ xs: 'column', md: 'row' }}>
      {imageFirst && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component="img" src={image} alt="" sx={{ height: '100%', maxWidth: '160px', borderRadius: 2 }} />
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'right' }}>
        <Typography align='right' variant="body1" sx={{ width: '300px' }}>{text}</Typography>
      </Grid>
      {!imageFirst && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component="img" src={image} alt="" sx={{ height: '100%', maxWidth: '300px', borderRadius: 2 }} />
        </Grid>
      )}
    </Grid>
  );
};

export default ImageWithTextBlock