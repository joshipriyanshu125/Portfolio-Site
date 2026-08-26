import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function createMercuryTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#4a4845';
  ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * c.width, y = Math.random() * c.height, r = Math.random() * 18 + 2;
    const s = Math.floor(Math.random() * 60 + 50);
    const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
    g.addColorStop(0, `rgb(${s+40},${s+38},${s+35})`);
    g.addColorStop(0.7, `rgb(${s},${s-5},${s-10})`);
    g.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping; return t;
}

function createVenusTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, c.height);
  g.addColorStop(0, '#eab308'); g.addColorStop(0.3, '#ca8a04');
  g.addColorStop(0.5, '#d97706'); g.addColorStop(0.7, '#b45309'); g.addColorStop(1, '#92400e');
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
  for (let y = 0; y < c.height; y += 4) {
    const off = Math.sin(y * 0.05) * 40 + Math.cos(y * 0.02) * 20;
    ctx.fillStyle = `rgba(254,240,138,${Math.random() * 0.25 + 0.1})`;
    ctx.fillRect(off, y, c.width, 3);
  }
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = 'rgba(255,251,235,0.12)';
    ctx.fillRect(Math.random() * c.width, Math.random() * c.height, Math.random() * 120 + 40, Math.random() * 12 + 4);
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createEarthTextures() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0f4c81'; ctx.fillRect(0, 0, c.width, c.height);
  const cols = ['#2d6a4f','#40916c','#52b788','#b5e2fa','#d4a373'];
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = cols[i % cols.length];
    ctx.beginPath();
    ctx.ellipse(Math.random()*c.width, Math.random()*c.height, Math.random()*160+40, Math.random()*90+20, Math.random()*Math.PI, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, c.width, 35);
  ctx.fillRect(0, c.height - 35, c.width, 35);
  const surf = new THREE.CanvasTexture(c); surf.wrapS = THREE.RepeatWrapping;

  const cc = document.createElement('canvas');
  cc.width = 1024; cc.height = 512;
  const cctx = cc.getContext('2d');
  cctx.clearRect(0, 0, cc.width, cc.height);
  for (let i = 0; i < 400; i++) {
    cctx.fillStyle = `rgba(255,255,255,${Math.random()*0.4+0.2})`;
    cctx.beginPath();
    cctx.ellipse(Math.random()*cc.width, Math.random()*cc.height, Math.random()*140+30, Math.random()*25+8, 0.2, 0, Math.PI*2);
    cctx.fill();
  }
  const cloud = new THREE.CanvasTexture(cc); cloud.wrapS = THREE.RepeatWrapping;
  return { surfaceTexture: surf, cloudTexture: cloud };
}

function createMarsTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#9a3412'; ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = 'rgba(67,20,7,0.45)';
    ctx.beginPath();
    ctx.ellipse(Math.random()*c.width, Math.random()*c.height, Math.random()*120+30, Math.random()*60+15, Math.random()*Math.PI, 0, Math.PI*2);
    ctx.fill();
  }
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = 'rgba(251,146,60,0.25)';
    ctx.fillRect(Math.random()*c.width, Math.random()*c.height, Math.random()*60+20, Math.random()*8+2);
  }
  ctx.fillStyle = '#fef2f2';
  ctx.beginPath(); ctx.ellipse(c.width*0.5, 20, 180, 20, 0, 0, Math.PI*2); ctx.fill();
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createJupiterTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const bands = ['#78350f','#d97706','#fef3c7','#b45309','#f59e0b','#92400e','#fde68a','#78350f','#ca8a04','#fffbeb'];
  for (let y = 0; y < c.height; y++) {
    ctx.fillStyle = bands[Math.floor((y/c.height)*bands.length)];
    ctx.fillRect(0, y, c.width, 1);
  }
  for (let i = 0; i < 400; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(120,53,15,0.35)';
    ctx.fillRect(Math.random()*c.width, Math.random()*c.height, Math.random()*160+40, Math.random()*14+3);
  }
  const sx = c.width*0.65, sy = c.height*0.68;
  const sg = ctx.createRadialGradient(sx, sy, 5, sx, sy, 45);
  sg.addColorStop(0, '#dc2626'); sg.addColorStop(0.6, '#991b1b'); sg.addColorStop(1, 'rgba(180,83,9,0)');
  ctx.fillStyle = sg;
  ctx.beginPath(); ctx.ellipse(sx, sy, 55, 32, -0.15, 0, Math.PI*2); ctx.fill();
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createSaturnTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, c.height);
  g.addColorStop(0, '#fef08a'); g.addColorStop(0.2, '#fde047'); g.addColorStop(0.4, '#eab308');
  g.addColorStop(0.6, '#ca8a04'); g.addColorStop(0.8, '#a16207'); g.addColorStop(1, '#713f12');
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 250; i++) {
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(0, Math.random()*c.height, c.width, Math.random()*4+1);
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createUranusTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, c.height);
  g.addColorStop(0, '#a5f3fc'); g.addColorStop(0.5, '#06b6d4'); g.addColorStop(1, '#0891b2');
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
  for (let y = 0; y < c.height; y += 6) {
    ctx.fillStyle = `rgba(224,242,254,${Math.random()*0.15})`;
    ctx.fillRect(0, y, c.width, 3);
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createNeptuneTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, c.height);
  g.addColorStop(0, '#1d4ed8'); g.addColorStop(0.4, '#1e40af'); g.addColorStop(0.8, '#1e3a8a'); g.addColorStop(1, '#172554');
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = 'rgba(15,23,42,0.6)';
  ctx.beginPath(); ctx.ellipse(c.width*0.4, c.height*0.45, 45, 25, 0.1, 0, Math.PI*2); ctx.fill();
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = 'rgba(224,242,254,0.35)';
    ctx.fillRect(Math.random()*c.width, Math.random()*c.height, Math.random()*90+20, Math.random()*4+1);
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function PlanetMesh({ planetKey = 'mercury', radius = 1.7 }) {
  const planetRef = useRef();
  const cloudsRef = useRef();
  const groupRef = useRef();

  const textures = useMemo(() => {
    switch (planetKey) {
      case 'mercury': return { main: createMercuryTexture(), haloColor: '#94a3b8' };
      case 'venus':   return { main: createVenusTexture(), haloColor: '#fbbf24' };
      case 'earth': {
        const e = createEarthTextures();
        return { main: e.surfaceTexture, clouds: e.cloudTexture, haloColor: '#38bdf8' };
      }
      case 'mars':    return { main: createMarsTexture(), haloColor: '#fb923c' };
      case 'jupiter': return { main: createJupiterTexture(), haloColor: '#f59e0b' };
      case 'saturn':  return { main: createSaturnTexture(), haloColor: '#fde047', hasRings: true };
      case 'uranus':  return { main: createUranusTexture(), haloColor: '#22d3ee', hasVerticalRings: true };
      case 'neptune': return { main: createNeptuneTexture(), haloColor: '#3b82f6' };
      default:        return { main: createMercuryTexture(), haloColor: '#94a3b8' };
    }
  }, [planetKey]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (planetRef.current) planetRef.current.rotation.y = t * 0.06;
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.1;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04 + pointer.x * 0.25;
      groupRef.current.rotation.x = pointer.y * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={textures.main}
          roughness={planetKey === 'earth' ? 0.4 : 0.6}
          metalness={planetKey === 'mercury' ? 0.3 : 0.1}
        />
      </mesh>

      {textures.clouds && (
        <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial map={textures.clouds} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </mesh>
      )}

      {/* Atmospheric inner rim glow */}
      <mesh scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={textures.haloColor} transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>

      {/* Outer glow halo */}
      <mesh scale={[1.13, 1.13, 1.13]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={textures.haloColor} transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>

      {textures.hasRings && (
        <group rotation={[1.2, -0.2, 0.4]}>
          <mesh>
            <ringGeometry args={[radius * 1.3, radius * 2.3, 96]} />
            <meshStandardMaterial color="#eab308" emissive="#713f12" emissiveIntensity={0.6} side={THREE.DoubleSide} transparent opacity={0.8} roughness={0.4} />
          </mesh>
          <mesh>
            <ringGeometry args={[radius * 1.6, radius * 1.64, 96]} />
            <meshBasicMaterial color="#0f172a" side={THREE.DoubleSide} transparent opacity={0.9} />
          </mesh>
          <mesh>
            <ringGeometry args={[radius * 1.85, radius * 1.9, 96]} />
            <meshBasicMaterial color="#ca8a04" side={THREE.DoubleSide} transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {textures.hasVerticalRings && (
        <group rotation={[0.2, 0.1, 1.45]}>
          <mesh>
            <ringGeometry args={[radius * 1.35, radius * 1.65, 96]} />
            <meshBasicMaterial color="#67e8f9" side={THREE.DoubleSide} transparent opacity={0.45} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function StarParticles({ count = 300 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < p.length; i++) p[i] = (Math.random() - 0.5) * 22;
    return p;
  }, [count]);
  const ref = useRef();
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#bae6fd" size={0.04} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default function Planet3D({ planetKey = 'mercury', compact = false }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, compact ? 5.5 : 4.8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 4]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[-3, -2, -3]} intensity={0.6} color="#a855f7" />
      <pointLight position={[-4, -3, -2]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[3, 2, 3]} intensity={3.0} color="#e0f2fe" />
      <PlanetMesh planetKey={planetKey} radius={compact ? 1.3 : 1.7} />
      <StarParticles count={compact ? 200 : 400} />
    </Canvas>
  );
}
