import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';

type CarouselProps = {
  children: React.ReactNode[];       // массив слайдов
  autoPlay?: boolean;               // включить автопрокрутку
  autoPlayInterval?: number;        // интервал автопрокрутки
  loop?: boolean;                   // зацикливание
};

const Carousel = ({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true
} : CarouselProps) => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  const nextSlide = () => {
    setIndex((prev) =>
      prev + 1 >= children.length ? (loop ? 0 : prev) : prev + 1
    );
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev - 1 < 0 ? (loop ? children.length - 1 : prev) : prev - 1
    );
  };

  // Автоматическая прокрутка
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => nextSlide(), autoPlayInterval);
    return () => clearInterval(timer);
  }, [index, autoPlay, autoPlayInterval]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true
  });

  return (
    <Box position="relative" overflow="hidden" {...handlers}>
      <Box sx={{
        transition:'transform 0.5s ease', display:'flex',
        transform: `translateX(-${index * 100}%)`,
        width: `${children.length * 100}%`,
      }}>
        {children.map((child, i) => (
          <Box key={i} flex="0 0 100%" width="100%">
            {child}
          </Box>
        ))}
      </Box>

      {/* Кнопки навигации */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: theme.palette.text.primary,
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: theme.palette.text.primary,
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default Carousel;