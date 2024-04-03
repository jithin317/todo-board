import React from "react";
import loadIMG from "../../assets/images/loader.png";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="w-full flex justify-center items-center">
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="w-[50rem] h-[28rem] "
      >
        <img className="w-full h-full" src={loadIMG} />
      </motion.div>
    </div>
  );
}
