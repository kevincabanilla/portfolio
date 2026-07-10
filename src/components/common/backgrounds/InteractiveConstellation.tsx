import { useEffect, useRef } from "react";
import { useReducedMotion, useMediaQuery } from "@/hooks";
import { Helper } from "@/utils";
import { Color } from "@/constants";

// Cursor-reactive constellation: drifting particles wired together by lines
// when they get close, with pointer repulsion + cursor-connection lines.
// Mounted once at the app root so it spans every section (sections sit at
// higher z-index with transparent / translucent backgrounds, letting this
// show through).
//
// Compatibility:
// - prefers-reduced-motion -> renders a single static frame instead of
//   animating, so the background still appears (no blank void).
// - touch devices -> tracks touchmove alongside mousemove, so dragging a
//   finger draws the same connection lines.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string; // "r, g, b"
}

const LINK_DISTANCE = 150; // px within which two particles get a line
const POINTER_RADIUS = 200; // px interaction field around the cursor/touch
const LINK_DISTANCE_SQ = LINK_DISTANCE ** 2;
const POINTER_RADIUS_SQ = POINTER_RADIUS ** 2;
const REPULSION = 0.05; // how hard particles flee the pointer
const AREA_PER_PARTICLE = 12000; // larger -> fewer particles
const MAX_PARTICLES_DESKTOP = 130;
const MAX_PARTICLES_MOBILE = 50;
const LINE_OPACITY = 0.28; // peak opacity of particle-to-particle links
const CURSOR_LINE_OPACITY = 0.4; // peak opacity of pointer-to-particle links
const OFFSCREEN = -9999; // parked pointer position (no interaction)
const COLORS = [Color.CYAN, Color.PURPLE].map(Helper.hexToRgb);

export const InteractiveConstellation = () => {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxParticles = isMobile
      ? MAX_PARTICLES_MOBILE
      : MAX_PARTICLES_DESKTOP;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    const pointer = { x: OFFSCREEN, y: OFFSCREEN };

    const spawn = (): Particle => ({
      x: Helper.getRandom() * width,
      y: Helper.getRandom() * height,
      vx: (Helper.getRandom() - 0.5) * 0.4,
      vy: (Helper.getRandom() - 0.5) * 0.4,
      size: 1.2 + Helper.getRandom() * 1.8,
      opacity: 0.45 + Helper.getRandom() * 0.45,
      color: COLORS[Helper.getRandom() > 0.5 ? 1 : 0],
    });

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        Math.floor((width * height) / AREA_PER_PARTICLE),
        maxParticles,
      );
      particles = Array.from({ length: target }, spawn);
    };

    // pointer-connection lines; otherwise paint a static snapshot.
    const drawPointerLines = () => {
      if (pointer.x === OFFSCREEN) return;

      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distSq = dx * dx + dy * dy;

        if (!distSq || distSq >= POINTER_RADIUS_SQ) continue;

        const dist = Math.sqrt(distSq);
        const alpha = (1 - dist / POINTER_RADIUS) * CURSOR_LINE_OPACITY;

        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      }
    };

    // Pointer repulsion + connection line -- the interactive tell.
    const applyPointerRepulsion = (p: Particle) => {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distSq = dx * dx + dy * dy;

      if (!distSq || distSq >= POINTER_RADIUS_SQ) return;

      const dist = Math.sqrt(distSq);

      const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * REPULSION;

      p.x += (dx / dist) * force * POINTER_RADIUS;
      p.y += (dy / dist) * force * POINTER_RADIUS;
    };

    const updateParticles = () => {
      for (const p of particles) {
        // Drift + edge wrap for an infinite field.
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;

        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        applyPointerRepulsion(p);
      }
    };

    const drawConnections = () => {
      // Constellation links -- nested pair scan, fade with distance.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (!distSq || distSq >= LINK_DISTANCE_SQ) continue;

          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / LINK_DISTANCE) * LINE_OPACITY;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${a.color}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      drawPointerLines();
      drawParticles();
      drawConnections();
    };

    // --- Reduced motion: one static frame, redrawn on resize. No loop. ---
    const redraw = () => {
      resizeCanvas();
      render();
    };

    if (reducedMotion) {
      redraw();
      window.addEventListener("resize", redraw);
      return () => {
        window.removeEventListener("resize", redraw);
      };
    }

    // --- Full interactive loop. ---
    const animate = () => {
      updateParticles();
      render();
      animationFrameId = requestAnimationFrame(animate);
    };

    const setPointer = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
    };

    const onMouseMove = (e: MouseEvent) => {
      setPointer(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const { clientX, clientY } = e.touches[0];
      setPointer(clientX, clientY);
    };

    const parkPointer = () => {
      setPointer(OFFSCREEN, OFFSCREEN);
    };

    // Pause the loop when the tab is hidden to save battery.
    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    animationFrameId = window.requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", parkPointer);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", parkPointer);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", parkPointer);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", parkPointer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion, isMobile]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
};
