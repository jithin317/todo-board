import React from "react";

export default function Blob({
  fill = "#08BDBA",
  viewBox = "0 0 400 300",
  transform = "translate(80 100)",
  d = "M52.8,-18.1C60.8,7.5,54.4,36.8,34.1,53C13.8,69.1,-20.4,72.2,-36.8,58.4C-53.3,44.7,-51.9,14.1,-42.8,-13C-33.7,-40.2,-16.9,-63.9,2.8,-64.8C22.4,-65.7,44.8,-43.8,52.8,-18.1Z",
}) {
  return (
    <svg
      viewBox={viewBox}
      className="absolute blur-[140px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={fill} d={d} transform={transform} />
    </svg>
  );
}
