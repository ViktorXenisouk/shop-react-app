import React, { useState, useEffect } from 'react';
import './ImageCarousel.css'

interface CarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel = ({ images, interval = 3000 } : CarouselProps) => {
  console.log('render image carousel')
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex( (current) => (current - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="carousel--container">
      <div className="carousel-images" style={{backgroundImage:`url(${images[currentIndex]})`}}>

      </div>
      <button className="image-carousel--button prev" onClick={prevImage}>
        Prev
      </button>
      <button className="image-carousel--button next" onClick={nextImage}>
        Next
      </button>
      <div className='carousel--footer'>
        {images.map((item,i) => <div>{i === currentIndex ? '$':'*'}</div>)}
      </div>
    </div>
  );
};

export {ImageCarousel};