import React from "react";
import { motion } from "framer-motion";

export default function Button({
  type = "",
  color = "",
  text = "Add Task",
  onclkFn,
}) {
  return (
    <motion.button
      className={`${color} shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-5 py-2 border-none rounded-md text-white`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onclkFn}
      type={type}
    >
      {text}
    </motion.button>
  );
}
export function AuthButton({
  text = "",
  buttonStyle = "font-bold dark_bg lightColor py-[0.5rem] px-[0.3rem] rounded-md hover:bg-[#2c2c2c]",
}) {
  return (
    <button className={buttonStyle} type="submit">
      {text}
    </button>
  );
}
