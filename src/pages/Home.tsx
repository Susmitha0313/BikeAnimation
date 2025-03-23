import React, {useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const frames = {
    currentIndex: 0,
    maxIndex: 105,
}


const Home: React.FC = () => {
    const container = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const imgLoaded = useRef(0);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    
    
    const preloadImages = () => {
        if (imagesRef.current.length > 0) return;
      for (let i = 0; i <= frames.maxIndex; i++) {
        const imageUrl = `/assets/bikeFrames/${i
          .toString()
          .padStart(4, "0")}.jpg`;
        const img = new Image(); //ensures images are in cache
          img.src = imageUrl;
          
        img.onload = () => {
          imgLoaded.current++;
          if (imgLoaded.current === frames.maxIndex) {
            loadImage(frames.currentIndex);
          }
          };
          
        imagesRef.current.push(img);
      }
      console.log("Images preloaded", imagesRef.current.length);
    };

    const loadImage = (index: number) => {
        if (!canvasRef.current || index < 0 || index >= frames.maxIndex) return;
        if (!contextRef.current) {
            contextRef.current = canvasRef.current.getContext("2d");        
        }       
        const ctx = contextRef.current;
        if (!ctx) return;
        
    
        const img = imagesRef.current[index];
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        const scaleX = canvasRef.current.width / img.width;
        const scaleY = canvasRef.current.height / img.height;
        const scale = Math.max(scaleX, scaleY);
        
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (canvasRef.current.width - newWidth)/2 ;
        const offsetY = (canvasRef.current.height - newHeight) / 2;
        
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    };
    
    
  useGSAP(() => {
      preloadImages();
  }, { scope: container });

    

    
  return (
    <div className="w-full bg-zinc-900 ">
      <div className="parent relative top-0 left-0 w-full h-[500vh] bg-red-300">
        <div className="w-full sticky top-0 h-screen bg-zinc-800">
          <canvas ref={canvasRef} className="w-full h-screen " id="frame"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;
