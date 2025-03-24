import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { frames, textMapping, animationMapping } from "../constants/data";
import { initSmoothScroll } from "../utils/smoothScroll";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


const Home: React.FC = () => {
  const container = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const imgLoaded = useRef(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const textIndexRef = useRef<number>(-1); // Store last used text index

  const [textContent, setTextContent] = useState(textMapping[0]);

  useEffect(() => {
    initSmoothScroll();
  }, []);
  
  const preloadImages = () => {
    if (imagesRef.current.length > 0) return; //prevents reloading images

    for (let i = 0; i <= frames.maxIndex; i++) {
      const imageUrl = `/assets/bikeFrames/${i
        .toString()
        .padStart(4, "0")}.jpg`;
      const img = new Image(); //ensures images are in cache
      img.src = imageUrl;

      img.onload = () => {
        imgLoaded.current++;
        if (imgLoaded.current === frames.maxIndex) {
          loadImage(frames.currentIndex); //drawing an image onto the canvas
        }
      };

      imagesRef.current.push(img);
    }
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
    const offsetX = (canvasRef.current.width - newWidth) / 2; //centeres the image within the canvas
    const offsetY = (canvasRef.current.height - newHeight) / 2;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); //remove the prev frame before drawing a new one
    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  };

  
  useGSAP(
    () => {
      preloadImages();//load all images

      gsap.to(frames, {
        currentIndex: frames.maxIndex - 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".parent",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        onUpdate: () => {
          const currentIndex = Math.floor(frames.currentIndex);
          loadImage(currentIndex);

  
          const closestIndex = Object.keys(textMapping)
            .map(Number)
            .reduce((prev, curr) =>
              Math.abs(curr - currentIndex) < Math.abs(prev - currentIndex)
                ? curr
                : prev
            );

 
          if (textIndexRef.current !== closestIndex) {
            textIndexRef.current = closestIndex;
            gsap.to(textRef.current, {
              opacity: 0,
              // y: 20,
              duration: 0.4,
              onComplete: () => {
                setTextContent(textMapping[closestIndex]); // Update text
                const animation = animationMapping[closestIndex] || {
                  opacity: 0,
                  // y: 10,
                  duration: 0.5,
                };

                gsap.fromTo(
                  textRef.current,
                  animation , 
                  {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: animation.duration || 0.5,
                  }
                );
              },
            });
          }
        },
      });
    },
    { scope: container }
  );

  return (
    <div className="w-full bg-zinc-900 ">
      <div className="parent relative top-0 left-0 w-full h-[1700vh] bg-red-300">
        <div className="w-full sticky top-0 h-screen bg-zinc-800">
          <canvas
            ref={canvasRef}
            className="w-full h-screen "
            id="frame"
          ></canvas>
          <div
            ref={textRef}
            className="absolute right-20 top-2/4 max-w-xs text-left"
          >
            <div>
              <h2 className="text-cyan-600 font-bold text-lg">
                {textContent.title}
              </h2>
              <h3 className="font-semibold text-gray-800">
                {textContent.subtitle}
              </h3>
              {textContent.text && (
                <p className="text-gray-900 text-sm">{textContent.text}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
