import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateTerrainHeight } from '../utils/noise';

/**
 * Composant Player - Cube contrôlable par l'utilisateur
 * Permet de se déplacer sur le terrain avec les touches ZQSD/Flèches
 */
export default function Player({ theme, seed = 0, onPositionChange }) {
  const meshRef = useRef();
  const velocityRef = useRef({ x: 0, z: 0 });
  const keysPressed = useRef({});

  // Paramètres de mouvement
  const moveSpeed = 0.15;
  const friction = 0.9;

  // Gestion des événements clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Fonction pour obtenir la hauteur du terrain à une position donnée
  const getTerrainHeightAt = (x, z) => {
    const { scale, amplitude, octaves } = theme.terrain;
    const seedOffset = seed * 1000;

    return generateTerrainHeight(
      (x + seedOffset) * 0.1,
      (z + seedOffset) * 0.1,
      scale,
      amplitude,
      octaves
    );
  };

  // Mise à jour de la position et de la physique
  useFrame(() => {
    if (!meshRef.current) return;

    const keys = keysPressed.current;
    const velocity = velocityRef.current;

    // Calcul de l'accélération basée sur les touches pressées
    let accelerationX = 0;
    let accelerationZ = 0;

    // ZQSD + Flèches
    if (keys['z'] || keys['arrowup']) accelerationZ -= moveSpeed;
    if (keys['s'] || keys['arrowdown']) accelerationZ += moveSpeed;
    if (keys['q'] || keys['arrowleft']) accelerationX -= moveSpeed;
    if (keys['d'] || keys['arrowright']) accelerationX += moveSpeed;

    // Application de l'accélération à la vélocité
    velocity.x += accelerationX;
    velocity.z += accelerationZ;

    // Application de la friction
    velocity.x *= friction;
    velocity.z *= friction;

    // Mise à jour de la position
    meshRef.current.position.x += velocity.x;
    meshRef.current.position.z += velocity.z;

    // Limites du terrain (pour ne pas sortir)
    const maxDistance = 45; // Un peu moins que la taille du terrain (100/2)
    meshRef.current.position.x = THREE.MathUtils.clamp(
      meshRef.current.position.x,
      -maxDistance,
      maxDistance
    );
    meshRef.current.position.z = THREE.MathUtils.clamp(
      meshRef.current.position.z,
      -maxDistance,
      maxDistance
    );

    // Collision avec le terrain (ajustement de la hauteur Y)
    const terrainHeight = getTerrainHeightAt(
      meshRef.current.position.x,
      meshRef.current.position.z
    );
    meshRef.current.position.y = terrainHeight + 1; // +1 pour que le cube soit au-dessus du sol

    // Petite rotation pour donner un effet visuel
    if (velocity.x !== 0 || velocity.z !== 0) {
      meshRef.current.rotation.y += velocity.x * 0.05;
      meshRef.current.rotation.x += velocity.z * 0.05;
    }

    // Callback pour mettre à jour la caméra
    if (onPositionChange) {
      onPositionChange(meshRef.current.position);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      {/* Cube de taille 2x2x2 */}
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={theme.particles.color || '#ff6b6b'}
        roughness={0.3}
        metalness={0.7}
        emissive={theme.particles.color || '#ff6b6b'}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}
