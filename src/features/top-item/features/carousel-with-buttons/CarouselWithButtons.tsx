import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Stack, Typography,Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
        backgroundColor:'secondary.main',
        position: 'relative',
        maxWidth: '100%',
        overflow: 'hidden',
        border: 'black solid 1px',
        mx:'30px',
        height:height,
        alignContent:'center'
      }}
    >
      <Button
        onClick={() => scrollBy(-300)}
        sx={{
          position: 'absolute',
          top: '0px',
          bottom:'0px',
          left: '0px',
          zIndex: 1,
          color: atStart ? 'grey.400' : 'primary.main',
          bgcolor: 'white',
        }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <Box
        ref={scrollRef}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': { display: 'none' },
          height:'100%',
          alignContent:'center',
          mx:'68px'
        }}
      >
        <Stack
          direction="row"
          spacing={0}
          sx={{
            height:'100%',
            display:'flex',
            alignContent:'center'
          }}
        >
         {children}
        </Stack>
      </Box>

      <Button
        onClick={() => scrollBy(300)}
        sx={{
          position: 'absolute',
          top: '0px',
          bottom:'0px',
          right: '0px',
          zIndex: 1,
          color: atEnd ? 'grey.400' : 'primary.main',
          bgcolor: 'white',
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default CarouselWithButtons;
