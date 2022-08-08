import { motion } from 'framer-motion';

// export const Motion = ({ isVisible }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{
//       duration: 0.8,
//       delay: 0,
//       ease: [0, 0.71, 0.2, 1.01],
//     }}
//   />
// );

export const MotionAppearConfig = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0,
      ease: [0, 0.71, 0.2, 1.01],
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.8,
      delay: 0,
      ease: [0, 0.71, 0.2, 1.01],
    },
  },
};
