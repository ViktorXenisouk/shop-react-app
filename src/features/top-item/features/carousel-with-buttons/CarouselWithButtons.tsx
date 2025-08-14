import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Stack, Typography, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselButton from './UI/CarouselButton';
import { useTheme, useMediaQuery } from '@mui/material';

type Props = {
  children: React.ReactNode,
  height?: string,
}

const CarouselWithButtons = ({ children, height = '300px' }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;

    setAtStart(el.scrollLeft === 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScrollPosition(); // Проверка при монтировании
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollPosition);
    return () => el.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  if (isMobile) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 5,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'primary.main',
          position: 'relative',
          maxWidth: '100%',
          overflow: 'hidden',
          mx: '30px',
          height: height,
          alignContent: 'center'
        }}
      >
        <Box
          ref={scrollRef}
          sx={{
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': { display: 'none' },
            height: '100%',
            alignContent: 'center',
            mx: '10px',
            borderRadius: '3px',
            bgcolor: 'transparent'
          }}
        >
          <Stack
            direction="row"
            spacing={0}
            sx={{
              height: '100%',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}
          >
            {children}
          </Stack>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        borderRadius: 5,
        borderWidth: '1px',
        borderStyle: 'solid',
          borderColor: 'primary.main',
        bgcolor: 'background.paper',
        position: 'relative',
        maxWidth: '100%',
        overflow: 'hidden',
        mx: '30px',
        height: height,
        alignContent: 'center',
      }} >
      <CarouselButton onClick={() => scrollBy(-300)} disabled={atStart} left='0px' icon={<ArrowBackIosNewIcon />} />

      <Box
        ref={scrollRef}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': { display: 'none' },
          height: '100%',
          alignContent: 'center',
          mx: '80px',
          backgroundColor: 'transparent'
        }}
      >
        <Stack
          direction="row"
          spacing={0}
          sx={{
            height: '100%',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
          }}
        >
          {children}
        </Stack>
      </Box>

      <CarouselButton onClick={() => scrollBy(300)} disabled={atEnd} right='0px' icon={<ArrowForwardIosIcon />} />
    </Box>
  );
};

export default CarouselWithButtons;
