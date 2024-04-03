import React, { useState } from "react";

export default function ImageDiv({ src, className = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={className}>
      <img
        src={src}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`h-full w-full object-cover object-fit object-bottom ${isLoaded} ? blur-none : blur-md`}
      />
      <div
        className={`absolute top-0 bg-gradient-to-t from-slate-900 w-full h-full left-0`}
      ></div>
    </div>
  );
}
