import React, { Component } from 'react';
import './LayerComponent.css';

import ChromaComponent from '../chroma/ChromaComponent'


// import 'chromagl.js'
import {
    makeMoveable,
    DraggableProps,
    ScalableProps,
    RotatableProps,
    Rotatable,
    Draggable,
    Scalable
  } from "react-moveable";
  import MoveableHelper from "moveable-helper";
  
  // In order to use only some able, make a component with makeMoveable function.
  const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
    Draggable,
    Scalable,
    Rotatable
  ]);
  

  export default function LayerComponent() {

    const [helper] = React.useState(() => {
        return new MoveableHelper();
      });
    const targetRef = React.useRef<HTMLDivElement>(null);
    
    
        return (
            <div className="container">
                <div className="target" ref={targetRef}>
                    {/* <img
                        width="320"
                        height="240"
                        src="https://picsum.photos/320/240"
                        alt="horse"
                    /> */}
                    <ChromaComponent width="640" height="480" />
                </div>
                <Moveable
                    target={targetRef}
                    draggable={true}
                    scalable={true}
                    keepRatio={true}
                    rotatable={false}
                    // onDragStart={helper.onDragStart}
                    // onDrag={helper.onDrag}
                    onScaleStart={helper.onScaleStart}
                    onScale={helper.onScale}
                    onRotateStart={helper.onRotateStart}
                    onRotate={helper.onRotate}

                    onDrag={({
                        target,
                        beforeDelta, beforeDist,
                        left, top,
                        right, bottom,
                        delta, dist,
                        transform,
                        clientX, clientY,
                    }: OnDrag) => {
                        console.log("onDrag left, top", left, top);
                        // target!.style.left = `${left}px`;
                        // target!.style.top = `${top}px`;
                        console.log("onDrag translate", dist);
                        target!.style.transform = transform;
                    }}
                    onDragEnd={({ target, isDrag, clientX, clientY }) => {
                        console.log("onDragEnd", target, isDrag);
                    }}
                />
      
                
            </div>
        );
    
}

// export default LayerComponent; 


    
    /* 
    

    <canvas width={this.props.height} height={this.props.height} id={this.props.id}></canvas>

    
    
    <ChromaKey
         width="320"
         height="240"
         front={[
             {
                 type: 'video/mp4',
                 src: "./videos/Snoop.mp4"
             }
         ]}
         background={[
             {
                 type: 'video/ogg',
                       src: "./videos/NewRow.ogv"
             }
         ]}
         alphachannel={{
             r: 25,
             g: 90,
             b: 60
         }}
         onlyShowOutput={true}
          /> */


