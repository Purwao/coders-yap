"use client"
import React from "react";
import useInView from "../hooks/UseInViews";

const SlideInCard = React.memo(({ children }) => {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
     
      className={`transition-all duration-1000 ease-out  transform-gpu
        ${
          isVisible
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-10 scale-95"
        }`}
    >
      {children}
    </div>
  );
});

SlideInCard.displayName = "SlideInCard";

export default SlideInCard;
