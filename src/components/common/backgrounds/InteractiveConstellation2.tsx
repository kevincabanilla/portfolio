import { useEffect, useRef } from "react";
import { Color } from "@/constants";
import { Helper } from "@/utils";
import { BREAKPOINTS } from "@/hooks";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colour: string;
}

interface DotsConfig {
  dotCount: number;
  lineDistance: number;
  mouseRadius: number;
  array: Dot[];
}

type Grid = Map<string, number[]>;

const CELL_SIZE = 70;
const LINE_WIDTH = 0.3;
const CYAN = Helper.hexToRgb(Color.CYAN);
const COLORS = [
  Color.CYAN,
  Color.CYAN,
  Color.CYAN,
  Color.CYAN,
  Color.PURPLE,
].map(Helper.hexToRgb);

export const InteractiveConstellation2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = Color.CYAN;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const width = window.innerWidth;

    const dots = generateDots(canvas.width, canvas.height);

    const drawDot = (dot: Dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

      const dx = dot.x - mouse.x;
      const dy = dot.y - mouse.y;
      const ratio = Math.min(
        1,
        (dx * dx + dy * dy) / ((width / 1.7) * (width / 1.7)),
      );

      ctx.fillStyle = `rgba(${dot.colour}, ${Math.max(0, 1 - ratio)})`;

      ctx.fill();
    };

    const animateDots = () => {
      for (let i = 1; i < dots.dotCount; i++) {
        const dot = dots.array[i];

        if (dot.x <= 0 || dot.x >= canvas.width) {
          dot.vx *= -1;
        }

        if (dot.y <= 0 || dot.y >= canvas.height) {
          dot.vy *= -1;
        }

        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    };

    const drawLines = () => {
      if (!dots.lineDistance) return;

      const grid = buildGrid(dots.array);
      const maxDistSq = dots.lineDistance * dots.lineDistance;
      const mouseRadiusSq = dots.mouseRadius * dots.mouseRadius;

      for (let i = 0; i < dots.array.length; i++) {
        const dot = dots.array[i];

        const mdx = dot.x - mouse.x;
        const mdy = dot.y - mouse.y;

        const mouseDistSq = mdx * mdx + mdy * mdy;

        if (mouseDistSq > mouseRadiusSq) continue;

        const gx = Math.floor(dot.x / CELL_SIZE);
        const gy = Math.floor(dot.y / CELL_SIZE);

        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const cell = grid.get(`${gx + ox},${gy + oy}`);

            if (!cell) continue;

            for (const j of cell) {
              if (j <= i) continue;

              const b = dots.array[j];

              const dx = dot.x - b.x;
              const dy = dot.y - b.y;

              const distSq = dx * dx + dy * dy;

              if (distSq > maxDistSq) continue;

              const alpha = Math.max(
                0,
                1 - Math.sqrt(mouseDistSq) / dots.mouseRadius - 0.3,
              );

              ctx.strokeStyle = `rgba(${CYAN},${alpha})`;

              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const item of dots.array) {
        drawDot(item);
      }

      animateDots();
      drawLines();

      animationFrame = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dots.array[0].x = e.clientX;
      dots.array[0].y = e.clientY;
    };

    // Pause the loop when the tab is hidden to save battery.
    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
      } else {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("visibilitychange", onVisibilityChange);

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-100 h-100 -z-1 pointer-events-none"
    />
  );
};

const buildGrid = (dots: Dot[]) => {
  const grid: Grid = new Map();

  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];

    const gx = Math.floor(dot.x / CELL_SIZE);
    const gy = Math.floor(dot.y / CELL_SIZE);

    const key = `${gx},${gy}`;

    let cell = grid.get(key);

    if (!cell) {
      cell = [];
      grid.set(key, cell);
    }

    cell.push(i);
  }

  return grid;
};

const generateDots = (screenWidth: number, screenHeight: number) => {
  let dots: DotsConfig = {
    dotCount: 0,
    mouseRadius: 0,
    lineDistance: 70,
    array: [],
  };

  if (screenWidth > BREAKPOINTS.xl) {
    dots = {
      ...dots,
      dotCount: 600,
      mouseRadius: 300,
    };
  } else if (screenWidth > BREAKPOINTS.lg) {
    dots = {
      ...dots,
      dotCount: 500,
      mouseRadius: 280,
    };
  } else if (screenWidth > BREAKPOINTS.md) {
    dots = {
      ...dots,
      dotCount: 400,
      mouseRadius: 260,
    };
  } else {
    dots = {
      ...dots,
      dotCount: 300,
      mouseRadius: 240,
    };
  }

  for (let i = 0; i < dots.dotCount; i++) {
    dots.array.push({
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      vx: Math.random() - 0.5,
      vy: Math.random() - 0.5,
      radius: Math.random() * 1.5,
      colour: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }

  return dots;
};
