import React, { useRef, useEffect } from "react";
import Lottie from "lottie-web";

const LoadingAnimation = (props) => {
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/noData.json"),
    });
  }, []);

  return (
    <div className="text-center">
      <div
        style={{ height: "200px", width: "200px" }}
        className="container"
        ref={container}
      ></div>
    </div>
  );
};

export default LoadingAnimation;
