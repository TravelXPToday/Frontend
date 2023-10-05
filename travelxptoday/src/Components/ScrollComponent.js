import { motion, useScroll, useSpring } from "framer-motion";

const ScrollComponent = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return(
    <motion.div className="fixed top-24 left-0 w-full bg-pink-500 z-50" style={{ height: '5px', scaleX, originX: 0 }} />

  )
};

export default ScrollComponent;
