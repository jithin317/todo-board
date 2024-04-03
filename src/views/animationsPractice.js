import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function Animations() {
  const scrollRef = useRef(null);
  return (
    <div className="flex flex-col items-center justify-center h-[200vh] w-full">
      <div className="flex items-center justify-center h-[100vh] w-full">
        <motion.div
          className="bg-slate-900 w-[200px] h-[200px] rounded-[50%]"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 2,
            delay: 0.9,
            ease: [0, 0.71, 0.2, 2.8],
          }}
        />
      </div>
      <div
        className="flex items-center justify-center h-[100vh] w-full"
        ref={scrollRef}
      >
        <motion.div
          className="bg-slate-900 w-[200px] h-[200px] rounded-[50%]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
        />
      </div>
    </div>
  );
}
