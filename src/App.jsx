import { useState, useEffect, useRef, useCallback } from "react";
import { useControls } from "leva";

import "./App.css";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function App() {
  const ref = useRef(null);
  const { size } = useControls({
    size: {
      value: 100,
      min: 100,
      max: 400,
      step: 50,
    },
  });
  const [context, setContext] = useState(null);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawHexagon = useCallback(
    (ctx) => {
      // console.log(ctx);

      // clear the canvas
      ctx.height = windowDimensions.height;
      ctx.width = windowDimensions.width;

      const x = ctx.width / 2;
      const y = ctx.height / 2;

      // const a = (2 * Math.PI) / 6;
      const grd = ctx.createLinearGradient(
        x,
        y,
        x + (size || 100),
        y + (size || 100),
      );
      grd.addColorStop(0, "#1e2e2e");
      grd.addColorStop(1, "#f2c2e1");

      for (let side = 0; side <= 6; side++) {
        ctx.lineTo(
          x + size * Math.cos((side * 2 * Math.PI) / 6),
          y + size * Math.sin((side * 2 * Math.PI) / 6),
        );
      }
      ctx.fillStyle = grd;
      ctx.closePath();
      ctx.fill();
      // console.log({ ctx });
    },
    [windowDimensions, size],
  );

  useEffect(() => {
    // clear canvas
    if (ref.current) {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    if (context) {
      drawHexagon(context);
    }
  }, [drawHexagon, context]);

  return (
    <main className="main">
      <canvas
        className="canvas"
        ref={ref}
        height={windowDimensions.height}
        width={windowDimensions.width}
      />
    </main>
  );
}

export default App;
