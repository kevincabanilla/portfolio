import { useEffect, useRef } from "react";
import { Helper } from "@/utils";
import { useMediaQuery } from "@/hooks";
import { Color } from "@/constants";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const MIN_VELOCITY = 0.01;
const MAX_VELOCITY = 0.8;
const MIN_RADIUS = 0.5;
const MAX_RADIUS = 2;
const COLORS = [Color.CYAN, Color.PURPLE].map(Helper.hexToRgb);

const randomSpeed = () =>
  Math.max(Helper.getRandom() * MAX_VELOCITY, MIN_VELOCITY);

const createDot = (canvasWidth: number, canvasHeight: number): Dot => ({
  x: Helper.getRandom() * canvasWidth,
  y: Helper.getRandom() * canvasHeight,
  vx: Helper.randomizeSign(randomSpeed()),
  vy: Helper.randomizeSign(randomSpeed()),
  radius: Math.max(Helper.getRandom() * MAX_RADIUS, MIN_RADIUS),
  color: COLORS[Math.floor(Helper.getRandom() * COLORS.length)],
});

export const BackgroundStars = () => {
  const isMobile = useMediaQuery();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const resizeCanvas = () => {
      canvas.width = document.body.scrollWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    ctx.lineWidth = 0.3;
    const dotsCount = isMobile ? 100 : 150;

    const generateDots = () => {
      const values: Dot[] = [];
      for (let i = 0; i < dotsCount; i++) {
        values.push(createDot(canvas.width, canvas.height));
      }

      values[0].radius = 1.5;
      values[0].color = "81,162,233";

      return values;
    };

    const calculateOpacity = (x: number, y: number, distance: number) => {
      const centerOpacity = Math.max(0, 1 - distance / (canvas.width / 2));

      // Distance to the nearest edge
      const edgeDistance = Math.min(x, canvas.width - x, y, canvas.height - y);

      // Start fading within 100px of an edge
      const edgeFadeDistance = 150;

      const edgeOpacity = Math.min(1, edgeDistance / edgeFadeDistance);

      return centerOpacity * edgeOpacity;
    };

    let dots = generateDots();

    const draw = () => {
      for (const dot of dots) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const distance = Math.sqrt(
          (dot.x - centerX) ** 2 + (dot.y - centerY) ** 2,
        );

        const opacity = calculateOpacity(dot.x, dot.y, distance);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${dot.color},${opacity})`;
        ctx.fill();
      }
    };

    const animate = () => {
      for (let i = 1; i < dotsCount; i++) {
        const dot = dots[i];

        // Left/right bounce
        if (dot.x <= 0) {
          dot.vx = randomSpeed();
        } else if (dot.x >= canvas.width) {
          dot.vx = -randomSpeed();
        }

        // Top/bottom bounce
        if (dot.y <= 0) {
          dot.vy = randomSpeed();
        } else if (dot.y >= canvas.height) {
          dot.vy = -randomSpeed();
        }

        // Set velocity
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
      animate();
      animationFrame = requestAnimationFrame(render);
    };

    const handleResize = () => {
      resizeCanvas();
      dots = generateDots();
    };

    window.addEventListener("resize", handleResize);

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-2 pointer-events-none"
    />
  );
};
