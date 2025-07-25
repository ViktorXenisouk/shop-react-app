import React, { useState } from 'react';
import { Box, IconButton, MobileStepper, Paper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Grow } from "@mui/material"
import ZoomOnHoverImage from './ZoomOnHoverImage';

const ImageCarousel = ({ imgs }: { imgs: { url: string, name: string }[] }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = imgs.length;

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1 >= maxSteps ? 0 : prev + 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 < 0 ? maxSteps - 1 : prev - 1));
  };

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Box sx={{width:'100%',display:'flex' , justifyContent:'center',}}>
        <ZoomOnHoverImage
          src={imgs[activeStep].url}
          alt={imgs[activeStep].name}
          width='700px'
          height='500px'
        />
      </Box>

      <MobileStepper
      sx={{width:'100%',px:'0px !important'}}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton onClick={handleNext} size="large">
            <KeyboardArrowRight />
          </IconButton>
        }
        backButton={
          <IconButton onClick={handleBack} size="large">
            <KeyboardArrowLeft />
          </IconButton>
        }
      />
    </Box>
  );
};

export default ImageCarousel;