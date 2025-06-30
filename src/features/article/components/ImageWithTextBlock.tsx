import type { ArticleBlock } from "../../../types/article" 
import { Box,Grid,Typography } from "@mui/material"


const ImageWithTextBlock = ({text,image,variant}:ArticleBlock) => {

   if (variant === 'center') {
    return (
      <Box my={4}>
        <Typography variant="body1">
          {text}
        </Typography>
        <Box component="img" src={image} alt="" sx={{ width: '100%', borderRadius: 2 }} />
      </Box>
    );
  }

  const imageFirst = variant === 'left';

  return (
    <Grid container spacing={4} alignItems="center" my={4} flexDirection={{ xs: 'column', md: 'row' }}>
      {imageFirst && (
        <Grid size={{xs:12,md:6}}>
          <Box component="img" src={image} alt="" sx={{ height: '100%',maxWidth:'160px', borderRadius: 2 }} />
        </Grid>
      )}
      <Grid size={{xs:12,md:6}} sx={{display:'flex', justifyContent:'right'}}>
        <Typography align='right' variant="body1" sx={{width:'300px'}}>{text}</Typography>
      </Grid>
      {!imageFirst && (
        <Grid size={{xs:12,md:6}}>
          <Box component="img" src={image} alt="" sx={{ height: '100%',maxWidth:'300px', borderRadius: 2 }} />
        </Grid>
      )}
    </Grid>
  );
};

export default ImageWithTextBlock