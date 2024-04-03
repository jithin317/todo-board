import React from "react";
import { motion } from "framer-motion";
import { SideIcon } from "../assets/icons/icons";

export default function ReviewContainer({
  containerClass = "",
  backColor = "bg-sky-200",
  rowSpan = "",
  iconClass = "p-2 bg-white rounded-[50%]",
  textClass = "text-md",
  sideIconClass = "bottom-3",
  Icon = "",
  Text = "",
  onclkFn,
}) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.button
      className={`${backColor} ${containerClass} border border-gray-50 flex flex-col font-semibold rounded-3xl cursor-pointer items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] justify-center ${rowSpan} col-span-2 relative`}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      variants={item}
      onClick={onclkFn}
      id={Text}
    >
      <div className={`${iconClass} `} id={Text}>
        {Icon}
      </div>
      <p className={`${textClass} `} id={Text}>
        {Text}
      </p>
      <SideIcon className={`absolute ${sideIconClass} right-4 `} />
    </motion.button>
  );
}
