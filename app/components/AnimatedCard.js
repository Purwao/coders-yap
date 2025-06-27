import React from "react";
import useInView from "../hooks/UseInViews";

const AnimatedCard = React.memo(({ children }) => {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform-gpu ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12 scale-95"
      }`}
    >
      {children}
    </div>
  );
});

AnimatedCard.displayName = "AnimatedCard";

export default AnimatedCard;