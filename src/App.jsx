import { useState, useEffect, useRef } from 'react'
import './App.css'
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function App() {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    ctx.height = windowDimensions.height
    ctx.width = windowDimensions.width

    const x = (canvas.width / 2)
    const y = (canvas.height / 2)

    const r = 100;
    const a = 2 * Math.PI / 6;
    const grd = ctx.createLinearGradient(x, y, x + r, y + r);
    grd.addColorStop(0, "#1e2e2e");
    grd.addColorStop(1, "#f2c2e1");

    for (let i = 0; i < 6; i++) {
      const xval = x + r * Math.cos(a * i)
      const yval = y + r * Math.sin(a * i)
      ctx.lineTo(xval, yval);
    }
    ctx.fillStyle = grd
    ctx.closePath();
    ctx.fill();

  }, [ref, windowDimensions])

  return (
    <main className="main">
      <canvas className="canvas" ref={ref} height={windowDimensions.height} width={windowDimensions.width} />
    </main>
  )
}

export default App
