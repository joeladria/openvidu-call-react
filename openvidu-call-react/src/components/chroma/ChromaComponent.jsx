import React, { useRef, useEffect } from 'react'
import ReactChromakeyedImage from 'react-chromakeyed-image';


const ChromaComponent = props => {
  
  
  const canvasRef = useRef(null)
  
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    var video = document.getElementById('localUser');
    
    if (video) {
      ctx.drawImage(video.querySelector('video'), 0, 0)
    };
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return (<div>

    
    <canvas ref={canvasRef} {...props} />
  </div>)
}

export default ChromaComponent
