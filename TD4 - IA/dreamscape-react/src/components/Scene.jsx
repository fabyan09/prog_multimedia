import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Terrain from './Terrain';
import Particles from './Particles';

/**
 * Composant CameraRig - Gère la rotation automatique de la caméra
 */
function CameraRig() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation lente et douce autour du monde
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return <group ref={groupRef} />;
}

/**
 * Composant Lights - Configuration de l'éclairage selon le thème
 */
function Lights({ theme }) {
  const directionalRef = useRef();

  useFrame((state) => {
    if (directionalRef.current && theme.particles.type === 'sparks') {
      // Animation de pulsation de la lumière pour le thème volcan
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.3 + 0.7;
      directionalRef.current.intensity = theme.lighting.directionalIntensity * pulse;
    }
  });

  return (
    <>
      {/* Lumière ambiante - éclairage général doux */}
      <ambientLight
        color={theme.lighting.ambient}
        intensity={theme.lighting.ambientIntensity}
      />

      {/* Lumière directionnelle - simule le soleil */}
      <directionalLight
        ref={directionalRef}
        color={theme.lighting.directional}
        intensity={theme.lighting.directionalIntensity}
        position={theme.lighting.directionalPosition}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Lumière d'appoint pour certains thèmes */}
      {theme.particles.type === 'neon' && (
        <>
          <pointLight position={[-20, 10, -20]} color="#ff00ff" intensity={0.5} distance={50} />
          <pointLight position={[20, 10, 20]} color="#00ffff" intensity={0.5} distance={50} />
        </>
      )}
    </>
  );
}

/**
 * Composant Scene3D - Contenu de la scène 3D
 */
function Scene3D({ theme, transition, seed }) {
  return (
    <>
      {/* Configuration du fog (brouillard) */}
      <fog attach="fog" args={[theme.sky.fog, 10, 100]} />

      {/* Couleur de fond (ciel) */}
      <color attach="background" args={[theme.sky.color]} />

      {/* Éclairage */}
      <Lights theme={theme} />

      {/* Caméra avec contrôles orbitaux */}
      <PerspectiveCamera makeDefault position={[0, 15, 30]} fov={60} />
      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={80}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Rotation automatique de la caméra */}
      <CameraRig />

      {/* Terrain procédural */}
      <Terrain theme={theme} transition={transition} seed={seed} />

      {/* Système de particules */}
      <Particles theme={theme} />

      {/* Sol supplémentaire pour éviter le vide */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={theme.terrain.color} roughness={1} />
      </mesh>
    </>
  );
}

/**
 * Composant Scene principal - Wrapper du Canvas React Three Fiber
 */
export default function Scene({ theme, transition, seed }) {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}
    >
      <Scene3D theme={theme} transition={transition} seed={seed} />
    </Canvas>
  );
}
