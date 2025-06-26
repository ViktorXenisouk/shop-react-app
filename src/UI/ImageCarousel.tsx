import React, { useState } from 'react';
import { Box, IconButton, MobileStepper, Paper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {Grow} from "@mui/material"
import ZoomOnHoverImage from './ZoomOnHoverImage';

const ImageCarousel = ({imgs}:{imgs:{url:string,name:string}[]}) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = imgs.length;

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1 >= maxSteps ? 0 : prev + 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 < 0 ? maxSteps - 1 : prev - 1));
  };

  return (
    <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        {imgs[activeStep].name}
      </Paper>

 <ZoomOnHoverImage
        src={imgs[activeStep].url}
        alt={imgs[activeStep].name}
      />

      <MobileStepper
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