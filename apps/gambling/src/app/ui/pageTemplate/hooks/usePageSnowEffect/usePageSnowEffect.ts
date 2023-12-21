import {useEffect, useRef, useState} from "react";
import snow1Image from "./snow_1.png"
import snow2Image from "./snow_2.png"
import snow3Image from "./snow_3.png"
import snow4Image from "./snow_4.png"
import snow5Image from "./snow_5.png"

type IParticle = {
  x: number;
  y: number;
  r: number;
  d: number;
  size: number;
  imgIndex: number;
}


export const usePageSnowEffect = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
  const [particles, setParticles] = useState<IParticle[]>()
  const [W, setW] = useState<number>()
  const [H, setH] = useState<number>()
  const mp = 50; //max particles

  const snows = [snow1Image, snow2Image, snow3Image, snow4Image, snow5Image]

  function renewSnowflake(width: number, height: number) {

    //snowflake particles
    const particles :IParticle[] = [];
    for(let i = 0; i < mp; i++)
    {
      particles.push({
        x: Math.random()* width, //x-coordinate
        y: Math.random()* height, //y-coordinate
        r: Math.random()*4+1, //radius
        d: Math.random()*mp, //density
        size: Math.floor(Math.random()*32), // 回傳 0~32
        imgIndex: Math.floor(Math.random()*5), // 回傳 0~4

      })
    }
    setParticles(particles);
  }

  function affect (canvas: HTMLCanvasElement) {
    setIsPlay(true);

    setCanvas(canvas);

    //canvas init
    // const canvas = document.getElementById(id) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    setCtx(ctx);

    //canvas dimensions
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    renewSnowflake(W, H);

    setW(W);
    setH(H);

    console.log("particles", particles);
  }


  const intervalTimerId = useRef<number>();

  const [isPlay, setIsPlay] = useState<boolean>(false);

  useEffect(() => {
    if(typeof ctx === "undefined") return;
    if(!particles) return;

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    let angle = 0;
    function update()
    {
      if(!intervalTimerId) return;;
      if(!ctx) return;
      if(!particles) return;
      if(!W) return;
      if(!H) return;

      angle += 0.01;
      for(let i = 0; i < mp; i++)
      {
        const p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle+p.d) + 1 + p.r/2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if(p.x > W+5 || p.x < -5 || p.y > H)
        {
          if(i%3 > 0) //66.67% of the flakes
          {
            particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d, imgIndex: p.imgIndex, size: p.size};
          }
          else
          {
            //If the flake is exitting from the right
            if(Math.sin(angle) > 0)
            {
              //Enter from the left
              particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d, imgIndex: p.imgIndex, size: p.size};
            }
            else
            {
              //Enter from the right
              particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d, imgIndex: p.imgIndex, size: p.size};
            }
          }
        }
      }
    }

    function draw()
    {
      if(!ctx) return;
      if(!particles) return;
      if(!W) return;
      if(!H) return;

      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();

      for(let i = 0; i < mp; i++)
      {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        // ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        const index = p.imgIndex;
        const img = new Image();
        img.src = snows[index]
        ctx.drawImage(img, p.x, p.y, p.size, p.size)
      }

      ctx.fill();
      update();
    }

    const drawHandler = () => {
      if(!canvas) return;

      if(!W) return;
      if(!H) return;

      if(intervalTimerId && intervalTimerId.current) {
        clearInterval(intervalTimerId.current);
      }
      ctx.clearRect(0, 0, W, H);

      const winW = window.innerWidth;
      const winH = window.innerHeight;

      canvas.width = winW;
      canvas.height = winH;

      renewSnowflake(winW, winH);

      setW(window.innerWidth);
      setH(window.innerHeight);

      (intervalTimerId as any).current = setInterval(() => {
        draw();
      }, 20)
    }

    drawHandler();

    window.addEventListener("resize", drawHandler, false);

    return () => {
      window.removeEventListener("resize", drawHandler, false);
    }

  }, [canvas, ctx, W, H])

  const stop = () => {
    if(intervalTimerId && intervalTimerId.current) {
      setIsPlay(false);
      if(ctx && W && H) {
        ctx.clearRect(0, 0, W, H);
      }
      clearInterval(intervalTimerId.current);
    }
  }

  return {
    affect,
    stop,
    isPlay,
  }
}
