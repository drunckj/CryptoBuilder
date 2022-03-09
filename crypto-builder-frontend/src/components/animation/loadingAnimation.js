import React, { useRef, useEffect } from "react";
import Lottie from "lottie-web";
import "./animation.css"
const LoadingAnimation = (props) => {
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/loading.json"),
    });
  }, []);

  return (
    <div className="text-center">
      <div className="overlay">
      <div
        style={{ zIndex:'999',top:"20%",height: "400px", width: "400px", display:"block"}}
        className="container"
        ref={container}
      ></div>
    </div>
    </div>
  );
};

export default LoadingAnimation;
