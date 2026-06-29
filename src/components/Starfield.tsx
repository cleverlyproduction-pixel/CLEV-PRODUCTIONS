import { useEffect, useRef } from "react";

interface StarfieldProps {
  isLightTheme: boolean;
}

export default function Starfield({ isLightTheme }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      angle: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    let shootingStars: Array<{
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
      angle: number;
    }> = [];

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initStars(width, height);
      }
    });

    resizeObserver.observe(container);

    function initStars(w: number, h: number) {
      stars = [];
      shootingStars = [];
      
      // Twinkling stars density
      const numStars = Math.floor((w * h) / 3500); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.8 + 0.3,
          alpha: Math.random(),
          speed: Math.random() * 0.04 + 0.01,
          angle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          color: isLightTheme 
            ? "rgba(0, 0, 0, " + (Math.random() * 0.3 + 0.2) + ")" 
            : "rgba(255, 255, 255, " + (Math.random() * 0.7 + 0.3) + ")",
        });
      }
    }

    function addShootingStar() {
      if (shootingStars.length < 3 && Math.random() < 0.008) {
        shootingStars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * (canvas!.height * 0.4),
          len: Math.random() * 80 + 30,
          speed: Math.random() * 8 + 4,
          alpha: 1.0,
          angle: Math.PI / 6 + (Math.random() * 0.1), // fall at ~30 degrees
        });
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render cosmic background gradient based on theme
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isLightTheme) {
        // Bright celestial morning star theme
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.5, "#f4f4f5");
        gradient.addColorStop(1, "#e4e4e7");
      } else {
        // Starry night black/blue cosmic darkness
        gradient.addColorStop(0, "#000000");
        gradient.addColorStop(0.4, "#020205");
        gradient.addColorStop(0.8, "#04040a");
        gradient.addColorStop(1, "#000000");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render & Twinkle stars
      for (let star of stars) {
        // Dynamic sine wave twinkle movement
        star.angle += star.twinkleSpeed;
        const currentAlpha = Math.max(0.1, Math.min(1.0, star.alpha + Math.sin(star.angle) * 0.35));

        // Drift background stars slowly
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = isLightTheme 
          ? `rgba(0, 0, 0, ${currentAlpha * 0.5})`
          : `rgba(255, 255, 255, ${currentAlpha})`;
          
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add & Render Falling Shooting Stars
      addShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x -= Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.015;

        if (ss.alpha <= 0 || ss.x < 0 || ss.y > canvas.height) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw glowing shooting trail
        ctx.strokeStyle = isLightTheme 
          ? `rgba(0, 0, 0, ${ss.alpha * 0.4})`
          : `rgba(255, 255, 255, ${ss.alpha * 0.85})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x + Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len
        );
        ctx.stroke();
      }

      // Large ambient cosmic nebulas (slow movement, subtle glows)
      if (!isLightTheme) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.012)"; // Starry nebula cloud glow
        ctx.beginPath();
        ctx.arc(canvas.width * 0.3, canvas.height * 0.4, 250, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.008)";
        ctx.beginPath();
        ctx.arc(canvas.width * 0.8, canvas.height * 0.7, 350, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLightTheme]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-20 w-full h-full overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
