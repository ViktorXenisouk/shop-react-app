import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

type Props = {
  children: React.ReactNode,
  height?:string,
}

const CarouselWithButtons = ({ children,height = '300px' }: Props) => {
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

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '100%',
        overflow: 'hidden',
        border: 'black solid 1px',
        height:height,
        alignContent:'center'
      }}
    >
      <IconButton
        onClick={() => scrollBy(-300)}
        disabled={atStart}
        sx={{
          position: 'absolute',
          top: '40%',
          left: 0,
          zIndex: 1,
          color: atStart ? 'grey.400' : 'primary.main',
          bgcolor: 'white',
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box
        ref={scrollRef}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': { display: 'none' },
          height:'100%',
          alignContent:'center'
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            py: 2,
            height:'100px'
          }}
        >
         {children}
        </Stack>
      </Box>

      <IconButton
        onClick={() => scrollBy(300)}
        disabled={atEnd}
        sx={{
          position: 'absolute',
          top: '40%',
          right: 0,
          zIndex: 1,
          color: atEnd ? 'grey.400' : 'primary.main',
          bgcolor: 'white',
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default CarouselWithButtons;
