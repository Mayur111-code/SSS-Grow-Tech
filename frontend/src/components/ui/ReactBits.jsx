import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView, animate } from 'framer-motion';
import * as THREE from 'three';

// ----------------------------------------------------
// 1. Antigravity Particle Field (Canvas 2D / WebGL)
// ----------------------------------------------------
export const AntigravityBackground = ({
  count = 45,
  particleColor = 'rgba(168, 85, 247, 0.4)',
  lineColor = 'rgba(139, 92, 246, 0.12)',
  speed = 0.6,
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    // Create floating particles with antigravity behavior
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: -Math.random() * speed - 0.2, // Continuous upward antigravity drift
      size: Math.random() * 2.5 + 1,
      baseAlpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Reset particle if out of bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse attraction / antigravity deflection
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw particle
        p.pulsePhase += p.pulseSpeed;
        const alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;
        ctx.fillStyle = particleColor.replace(/[\d.]+\)$/, `${Math.max(0.1, alpha)})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pdist < 110) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = (1 - pdist / 110) * 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, particleColor, lineColor, speed, interactive]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
};

// ----------------------------------------------------
// 2. Spotlight Card (Mouse Tracking Card Glow)
// ----------------------------------------------------
export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.15)',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  ...props
}) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/5 bg-gray-900/40 backdrop-blur-xl transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500"
        style={{
          opacity,
          border: `1px solid ${borderColor}`,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.4), transparent 40%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      {children}
    </div>
  );
};

// ----------------------------------------------------
// 3. Shiny Text (Shimmering Typography)
// ----------------------------------------------------
export const ShinyText = ({ text, className = '', speed = 4 }) => {
  return (
    <span
      className={`inline-block text-transparent bg-clip-text ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 25%, #c084fc 50%, #38bdf8 75%, rgba(255,255,255,0.7) 100%)',
        backgroundSize: '250% 100%',
        animation: `shimmer ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
};

// ----------------------------------------------------
// 4. Magnetic Element Wrapper
// ----------------------------------------------------
export const Magnetic = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ----------------------------------------------------
// 5. Animated Number Counter
// ----------------------------------------------------
export const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = '', prefix = '', className = '' }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const numericTo = parseInt(to.toString().replace(/\D/g, ''), 10) || 0;
      const controls = animate(from, numericTo, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  const rawSuffix = to.toString().replace(/[\d]/g, '') || suffix;

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {count}
      {rawSuffix}
    </span>
  );
};

// ----------------------------------------------------
// 6. Interactive 3D Canvas (Three.js Floating Torus Mesh)
// ----------------------------------------------------
export const ThreeHeroCanvas = ({ className = '' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Glowing Geometry (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x3b0764,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Outer Wireframe Ring
    const ringGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x818cf8, 4, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 3, 50);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const animateLoop = () => {
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.008;

      ringMesh.rotation.x -= 0.003;
      ringMesh.rotation.y -= 0.004;

      // Smooth mouse tilt damping
      torusKnot.rotation.y += (targetX - torusKnot.rotation.y) * 0.05;
      torusKnot.rotation.x += (-targetY - torusKnot.rotation.x) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animateLoop();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[380px] pointer-events-auto ${className}`} />;
};
