import { useEffect, useRef } from 'react';

export default function CosmicBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Stars generation
    const starCount = 350;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.85 + 0.15,
      speed: Math.random() * 0.02 + 0.005,
      twinkleSpeed: Math.random() * 0.03 + 0.008,
      color: ['#ffffff', '#bae6fd', '#ddd6fe', '#7dd3fc', '#f472b6'][
        Math.floor(Math.random() * 5)
      ],
      layer: Math.random() * 2 + 0.5,
    }));

    // Dynamic comets
    const comets = [];
    const createComet = () => {
      return {
        x: Math.random() * width * 1.2 - width * 0.2,
        y: Math.random() * height * 0.3,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 10 + 8,
        angle: (Math.random() * 15 + 25) * (Math.PI / 180),
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.015 + 0.008,
        width: Math.random() * 2 + 1.2,
      };
    };

    let cometTimer = 0;

    const render = () => {
      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const scrollY = window.scrollY * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Deep space base gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#050713');
      bgGrad.addColorStop(0.5, '#080a1d');
      bgGrad.addColorStop(1, '#04050d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Cosmic Nebula Glows
      const nebula1X = width * 0.75 + mouseX * 1.5;
      const nebula1Y = height * 0.25 - scrollY * 0.5 + mouseY * 1.5;
      const nebGrad1 = ctx.createRadialGradient(
        nebula1X,
        nebula1Y,
        10,
        nebula1X,
        nebula1Y,
        width * 0.45
      );
      nebGrad1.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
      nebGrad1.addColorStop(0.4, 'rgba(168, 85, 247, 0.1)');
      nebGrad1.addColorStop(0.8, 'rgba(14, 165, 233, 0.04)');
      nebGrad1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad1;
      ctx.fillRect(0, 0, width, height);

      const nebula2X = width * 0.2 - mouseX;
      const nebula2Y = height * 0.65 - scrollY * 0.8 - mouseY;
      const nebGrad2 = ctx.createRadialGradient(
        nebula2X,
        nebula2Y,
        10,
        nebula2X,
        nebula2Y,
        width * 0.5
      );
      nebGrad2.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      nebGrad2.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
      nebGrad2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad2;
      ctx.fillRect(0, 0, width, height);

      // Render Stars with parallax depth
      stars.forEach((star) => {
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.005;
        const clampedAlpha = Math.max(0.1, Math.min(0.95, star.alpha));

        const px = (star.x + mouseX * star.layer + width) % width;
        const py =
          (star.y + mouseY * star.layer - scrollY * star.layer + height) % height;

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.fill();

        // Subtle glow around larger stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = clampedAlpha * 0.25;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // Spawn periodic comets
      cometTimer++;
      if (cometTimer > 280 && Math.random() < 0.3) {
        comets.push(createComet());
        cometTimer = 0;
      }

      // Update & render comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;
        c.life -= c.decay;

        if (c.life <= 0 || c.x > width * 1.3 || c.y > height * 1.3) {
          comets.splice(i, 1);
          continue;
        }

        const headX = c.x;
        const headY = c.y;
        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const cometGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        cometGrad.addColorStop(0, `rgba(255, 255, 255, ${c.life})`);
        cometGrad.addColorStop(0.2, `rgba(56, 189, 248, ${c.life * 0.8})`);
        cometGrad.addColorStop(0.6, `rgba(168, 85, 247, ${c.life * 0.3})`);
        cometGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = c.width;
        ctx.stroke();

        // Glowing Comet Nucleus
        ctx.beginPath();
        ctx.arc(headX, headY, c.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${c.life})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
