import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateTerrainHeight } from '../utils/noise';

/**
 * Composant Terrain - Génère un terrain procédural 3D
 * Utilise un PlaneGeometry subdivisé et modifie les hauteurs via Simplex Noise
 */
export default function Terrain({ theme, transition = false, seed = 0 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  // Paramètres du terrain - MAP AGRANDIE pour exploration libre
  const width = 300;
  const height = 300;
  const segments = 150; // Plus il y a de segments, plus le terrain est détaillé

  // Génération du terrain basé sur le thème et la seed
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segments, segments);

    // Récupération des paramètres du thème
    const { scale, amplitude, octaves } = theme.terrain;

    // Position des vertices pour manipulation
    const positions = geo.attributes.position.array;

    // Offset basé sur la seed pour générer des terrains différents
    const seedOffset = seed * 1000;

    // Modification de la hauteur (Z) de chaque vertex selon le bruit procédural
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      // Calcul de la hauteur via Simplex Noise avec offset de seed
      const terrainHeight = generateTerrainHeight(
        (x + seedOffset) * 0.1,
        (y + seedOffset) * 0.1,
        scale,
        amplitude,
        octaves
      );

      positions[i + 2] = terrainHeight; // Modification de Z (hauteur)
    }

    // Recalcul des normales pour un éclairage correct
    geo.computeVertexNormals();

    return geo;
  }, [theme, seed]);

  // Cleanup de la géométrie au démontage du composant
  useEffect(() => {
    return () => {
      if (geometry) {
        geometry.dispose();
      }
    };
  }, [geometry]);

  // Animation douce du terrain (oscillation légère)
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.getElapsedTime();

      // Légère oscillation du terrain pour effet vivant
      meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.001;

      // Animation de la couleur pour certains thèmes (ex: volcan)
      if (theme.particles.type === 'sparks') {
        const pulse = Math.sin(time * 2) * 0.3 + 0.7;
        materialRef.current.emissive.setStyle(theme.terrain.secondaryColor);
        materialRef.current.emissiveIntensity = pulse * 0.3;
      }
    }
  });

  // Transition entre les thèmes
  useEffect(() => {
    if (materialRef.current && transition) {
      // Animation de fade-in pour les nouvelles couleurs
      materialRef.current.opacity = 0;
      const interval = setInterval(() => {
        if (materialRef.current.opacity < 1) {
          materialRef.current.opacity += 0.05;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [theme, transition]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]} // Rotation pour mettre le terrain à plat
      position={[0, -2, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        ref={materialRef}
        color={theme.terrain.color}
        roughness={0.8}
        metalness={0.2}
        flatShading={false}
        transparent={transition}
        opacity={1}
      />
    </mesh>
  );
}
