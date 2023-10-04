import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import 'tailwindcss/tailwind.css';

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const Image = ({ id, imageUrl, text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section ref={ref} className="snap-start relative h-screen flex items-center justify-center">
      <img src={imageUrl} alt="Custom" className="w-full h-full object-cover"/>
      <motion.h2 style={{ y }} className="z-10 text-4xl text-white absolute">{text}</motion.h2>
    </section>
  );
}

const TravelerComponent = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001

  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchedImages = [
      {id: 1, url: 'https://images.unsplash.com/photo-1695753579372-498a4a382ec9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80', text: 'Custom Text 1'},
      {id: 2, url: 'https://images.unsplash.com/photo-1695638327343-f204623e1f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80', text: 'Custom Text 2'},
    ];

    setImages(fetchedImages);
  }, []); 

  return (
    <div className="relative snap snap-y-mandatory">
      {images.map((image) => (
        <Image id={image.id} imageUrl={image.url} text={image.text} key={image.id} />
      ))}
      <motion.div className="fixed top-24 left-0 w-full bg-pink-500 z-50" style={{ height: '5px', scaleX, originX: 0 }} />
    </div>
  );
}

export default TravelerComponent;
