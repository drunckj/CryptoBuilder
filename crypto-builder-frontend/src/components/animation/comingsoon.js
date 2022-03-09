import React, { useRef, useEffect } from "react";
    import Lottie from "lottie-web";
    import "./comingsoon.css"
    const Comingsoon = (props) => {
      const container = useRef(null);
    
      useEffect(() => {
        Lottie.loadAnimation({
          container: container.current, // the dom element that will contain the animation
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../../assets/comingsoon.json"),
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
    
    export default Comingsoon;
    