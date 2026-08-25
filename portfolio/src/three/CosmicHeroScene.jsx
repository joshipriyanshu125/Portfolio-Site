import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Procedural Canvas Texture for Gas Giant Atmospheric Bands
function createGasGiantTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark deep space base
  ctx.fillStyle = '#0b1329';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Atmospheric Bands & glowing stripes
  const bands = [
    { y: 0.1, h: 0.08, color: 'rgba(56, 189, 248, 0.85)', glow: 'rgba(56, 189, 248, 0.3)' },
    { y: 0.22, h: 0.04, color: 'rgba(168, 85, 247, 0.9)', glow: 'rgba(168, 85, 247, 0.4)' },
    { y: 0.35, h: 0.12, color: 'rgba(14, 165, 233, 0.7)', glow: 'rgba(14, 165, 233, 0.2)' },
    { y: 0.5, h: 0.06, color: 'rgba(192, 132, 252, 0.95)', glow: 'rgba(192, 132, 252, 0.5)' },
    { y: 0.62, h: 0.09, color: 'rgba(96, 165, 250, 0.8)', glow: 'rgba(96, 165, 250, 0.3)' },
    { y: 0.76, h: 0.05, color: 'rgba(168, 85, 247, 0.85)', glow: 'rgba(168, 85, 247, 0.4)' },
    { y: 0.88, h: 0.07, color: 'rgba(56, 189, 248, 0.75)', glow: 'rgba(56, 189, 248, 0.2)' },
  ];

  bands.forEach((b) => {
    const yPx = b.y * canvas.height;
    const hPx = b.h * canvas.height;

    // Glowing blur band
    const grad = ctx.createLinearGradient(0, yPx - hPx, 0, yPx + hPx * 2);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.5, b.glow);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, yPx - hPx, canvas.width, hPx * 3);

    // Sharp stripe core line
    ctx.fillStyle = b.color;
    ctx.fillRect(0, yPx, canvas.width, Math.max(2, hPx * 0.4));
  });

  // Subtle atmospheric noise texture
  for (let i = 0; i < 400; i++) {
    const nx = Math.random() * canvas.width;
    const ny = Math.random() * canvas.height;
    const nw = Math.random() * 80 + 20;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(nx, ny, nw, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Gas Giant Planet + Saturn Rings + Moons
function GasGiantSystem({ compact = false }) {
  const systemGroup = useRef();
  const planetRef = useRef();
  const moonPurpleRef = useRef();
  const moonCyanRef = useRef();
  const moonSmallRef = useRef();

  const gasGiantTexture = useMemo(() => createGasGiantTexture(), []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    // Planet rotation & subtle hover float
    if (planetRef.current) {
      planetRef.current.rotation.y = t * 0.08;
    }

    if (systemGroup.current) {
      // Interactive mouse follow
      systemGroup.current.rotation.y = t * 0.05 + pointer.x * 0.2;
      systemGroup.current.rotation.x = pointer.y * 0.12;
      systemGroup.current.position.y = Math.sin(t * 0.7) * 0.08;
    }

    // Orbiting Moons
    if (moonPurpleRef.current) {
      moonPurpleRef.current.position.x = Math.cos(t * 0.35 + 0.5) * 3.1;
      moonPurpleRef.current.position.z = Math.sin(t * 0.35 + 0.5) * 2.2;
      moonPurpleRef.current.position.y = Math.sin(t * 0.35) * 0.6 + 1.2;
    }

    if (moonCyanRef.current) {
      moonCyanRef.current.position.x = Math.cos(t * -0.45 + 2.2) * 2.4;
      moonCyanRef.current.position.z = Math.sin(t * -0.45 + 2.2) * 1.8;
      moonCyanRef.current.position.y = Math.cos(t * 0.45) * 0.4 - 0.2;
    }

    if (moonSmallRef.current) {
      moonSmallRef.current.position.x = Math.cos(t * 0.6 - 1.1) * 2.1;
      moonSmallRef.current.position.z = Math.sin(t * 0.6 - 1.1) * 1.5;
      moonSmallRef.current.position.y = Math.sin(t * 0.6) * 0.3 - 1.1;
    }
  });

  const planetRadius = compact ? 1.3 : 1.75;

  return (
    <group ref={systemGroup} position={[compact ? 0 : 0.4, 0, 0]}>
      {/* 1. Gas Giant Central Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshStandardMaterial
          map={gasGiantTexture}
          roughness={0.45}
          metalness={0.2}
          emissive="#0b1a3a"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 2. Glowing Atmosphere Halo */}
      <mesh scale={[1.04, 1.04, 1.04]}>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 3. Tilted Multi-Layered Ring System (Saturn Rings) */}
      <group rotation={[1.25, -0.28, 0.42]}>
        {/* Main Rings Disk */}
        <mesh>
          <ringGeometry args={[planetRadius * 1.25, planetRadius * 2.25, 96]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#1e1b4b"
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
            transparent
            opacity={0.65}
            roughness={0.3}
          />
        </mesh>

        {/* Ring Division Lines / Concentric Ring Borders */}
        <mesh>
          <ringGeometry args={[planetRadius * 1.55, planetRadius * 1.58, 96]} />
          <meshBasicMaterial
            color="#a855f7"
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[planetRadius * 1.9, planetRadius * 1.95, 96]} />
          <meshBasicMaterial
            color="#38bdf8"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Outer Fine Dust Ring */}
        <mesh>
          <ringGeometry args={[planetRadius * 2.3, planetRadius * 2.65, 96]} />
          <meshBasicMaterial
            color="#818cf8"
            side={THREE.DoubleSide}
            transparent
            opacity={0.28}
          />
        </mesh>
      </group>

      {/* 4. Glowing 3D Vector Orbit Lines */}
      <group rotation={[0.4, 0.2, 0.1]}>
        <mesh rotation={[1.1, 0.3, 0.2]}>
          <torusGeometry args={[3.1, 0.009, 16, 128]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[0.2, 1.35, -0.3]}>
          <torusGeometry args={[2.5, 0.007, 16, 128]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[-0.8, -0.4, 0.9]}>
          <torusGeometry args={[3.6, 0.006, 16, 128]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* 5. Orbiting Moons */}
      {/* Moon 1: Large Purple Moon (Top Right) */}
      <mesh ref={moonPurpleRef}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          color="#a78bfa"
          roughness={0.6}
          emissive="#5b21b6"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Moon 2: Mid Cyan Moon (Left) */}
      <mesh ref={moonCyanRef}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.5}
          emissive="#0369a1"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Moon 3: Small Violet Moon (Bottom) */}
      <mesh ref={moonSmallRef}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color="#c084fc"
          roughness={0.4}
          emissive="#7e22ce"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Moon 4: Dark Distant Moon (Top Left background) */}
      <mesh position={[-3.1, 1.9, -2.1]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

// 3D Particles around planet
function SpaceParticles({ count = 300 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < p.length; i++) {
      p[i] = (Math.random() - 0.5) * 24;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7dd3fc"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.75}
      />
    </points>
  );
}

export default function CosmicHeroScene({ compact = false }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, compact ? 6.2 : 5.4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 4, 4]} intensity={2.8} color="#e0f2fe" />
      <pointLight position={[-4, -3, -2]} intensity={1.5} color="#c084fc" />
      <pointLight position={[3, 2, 3]} intensity={4.5} color="#38bdf8" />
      <GasGiantSystem compact={compact} />
      <SpaceParticles count={compact ? 200 : 450} />
    </Canvas>
  );
}
