import React, { useEffect, useRef } from 'react';

interface ElectricCanvasProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant';
}

export const ElectricCanvas: React.FC<ElectricCanvasProps> = ({ 
  className = "absolute inset-0 pointer-events-none overflow-hidden",
  intensity = 'subtle' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes representing circuit junctions
    const nodeCount = Math.floor(Math.min(width, 1440) / 75);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    const colors = intensity === 'vibrant' 
      ? ['#FFD21C', '#39BDF5', '#173B60', '#39BDF5']
      : ['rgba(57, 189, 245, 0.6)', 'rgba(255, 210, 28, 0.5)', 'rgba(23, 59, 96, 0.4)'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }

    // Energy packet traveling along circuit lines
    const packets: Array<{
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }> = [];

    const createPacket = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      // find a close neighbor
      let bestTo = -1;
      let bestDist = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (j === from) continue;
        const dx = nodes[j].x - nodes[from].x;
        const dy = nodes[j].y - nodes[from].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist < bestDist) {
          bestDist = dist;
          bestTo = j;
        }
      }
      if (bestTo !== -1 && packets.length < 8) {
        packets.push({
          fromIdx: from,
          toIdx: bestTo,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          color: Math.random() > 0.4 ? '#FFD21C' : '#39BDF5'
        });
      }
    };

    let lastPacketTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Randomly spawn energy packets
      if (time - lastPacketTime > 600) {
        createPacket();
        lastPacketTime = time;
      }

      // Draw connections
      const maxDist = 160;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(57, 189, 245, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw and update packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        const n1 = nodes[pkt.fromIdx];
        const n2 = nodes[pkt.toIdx];
        if (!n1 || !n2) {
          packets.splice(p, 1);
          continue;
        }

        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * pkt.progress;
        const py = n1.y + (n2.y - n1.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        const currentRadius = node.radius + Math.sin(node.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      aria-hidden="true"
    />
  );
};
