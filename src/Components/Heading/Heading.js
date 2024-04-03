import React from "react";

export default function Heading({
  heading = "",
  subheading = "",
  HeadingColor = "darkColor",
  HeadingSize = "text-5xl",
}) {
  return (
    <div className={`w-full text-center my-5 select-none`}>
      <p className={`${HeadingColor} ${HeadingSize} uppercase font-bold`}>
        {heading}
      </p>
      {subheading && (
        <p className="text-md text-slate-500 mt-2">{subheading}</p>
      )}
    </div>
  );
}
