import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';

type Props = {
  src: string;
  alt?: string;
  width?: number | string | any;
  height?: number | string | any;
  zoomScale?: number;
};

const ZoomOnHoverImage: React.FC<Props> = ({
  src,
  alt = '',
  width = 400,
  height = 300,
  zoomScale = 2,
}) => {
  const [transformOrigin, setTransformOrigin] = useState('center center');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setTransformOrigin('center center');
  };

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        width,
        height,
        overflow: 'hidden',
        borderRadius: 2,
        position: 'relative',
        cursor: 'zoom-in',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          transformOrigin: transformOrigin,
          '&:hover': {
            transform: `scale(${zoomScale})`,
          },
        }}
      />
    </Box>
  );
};

export default ZoomOnHoverImage;