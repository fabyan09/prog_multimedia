import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Composant Particles - Génère des systèmes de particules selon le thème
 * Chaque thème a son propre comportement de particules (neige, poussière, étincelles, etc.)
 */
export default function Particles({ theme }) {
  const pointsRef = useRef();

  // Configuration des particules selon le type
  const { count, size, color, speed, type } = theme.particles;

  // Génération des positions initiales des particules
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Position aléatoire dans un cube
      pos[i3] = (Math.random() - 0.5) * 100;     // X
      pos[i3 + 1] = Math.random() * 50;          // Y (hauteur)
      pos[i3 + 2] = (Math.random() - 0.5) * 100; // Z

      // Vélocité selon le type de particule
      switch (type) {
        case 'snow':
          vel[i3] = (Math.random() - 0.5) * 0.1;
          vel[i3 + 1] = -Math.random() * 0.5 - 0.2;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.1;
          break;

        case 'dust':
          vel[i3] = (Math.random() - 0.5) * 0.3;
          vel[i3 + 1] = Math.random() * 0.2;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.3;
          break;

        case 'sparks':
          vel[i3] = (Math.random() - 0.5) * 0.5;
          vel[i3 + 1] = Math.random() * 1.5 + 0.5;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.5;
          break;

        case 'leaves':
          vel[i3] = (Math.random() - 0.5) * 0.2;
          vel[i3 + 1] = -Math.random() * 0.3 - 0.1;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.2;
          break;

        case 'neon':
          vel[i3] = (Math.random() - 0.5) * 0.4;
          vel[i3 + 1] = (Math.random() - 0.5) * 0.4;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.4;
          break;

        case 'bubbles':
          vel[i3] = (Math.random() - 0.5) * 0.15;
          vel[i3 + 1] = Math.random() * 0.3 + 0.1;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.15;
          break;

        default:
          vel[i3] = (Math.random() - 0.5) * 0.2;
          vel[i3 + 1] = -Math.random() * 0.3;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.2;
      }
    }

    return [pos, vel];
  }, [count, type]);

  // Animation des particules
  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Mouvement selon la vélocité et le type
      positions[i3] += velocities[i3] * speed;
      positions[i3 + 1] += velocities[i3 + 1] * speed;
      positions[i3 + 2] += velocities[i3 + 2] * speed;

      // Comportements spécifiques selon le type
      switch (type) {
        case 'snow':
        case 'leaves':
          // Mouvement sinusoïdal pour effet vent
          positions[i3] += Math.sin(time + i) * 0.01;
          positions[i3 + 2] += Math.cos(time + i) * 0.01;

          // Réinitialisation en haut si trop bas
          if (positions[i3 + 1] < -5) {
            positions[i3 + 1] = 50;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;
          }
          break;

        case 'dust':
          // Mouvement turbulent
          positions[i3] += Math.sin(time * 2 + i) * 0.02;
          positions[i3 + 2] += Math.cos(time * 2 + i) * 0.02;

          // Réinitialisation si trop haut
          if (positions[i3 + 1] > 50) {
            positions[i3 + 1] = -5;
          }
          break;

        case 'sparks':
          // Gravité pour les étincelles
          velocities[i3 + 1] -= 0.01;

          // Réinitialisation si trop bas
          if (positions[i3 + 1] < -5) {
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = Math.random() * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
            velocities[i3 + 1] = Math.random() * 1.5 + 0.5;
          }
          break;

        case 'neon':
          // Mouvement circulaire
          positions[i3] += Math.sin(time + i * 0.1) * 0.03;
          positions[i3 + 2] += Math.cos(time + i * 0.1) * 0.03;

          // Pulsation Y
          positions[i3 + 1] += Math.sin(time * 3 + i) * 0.02;
          break;

        case 'bubbles':
          // Mouvement flottant
          positions[i3] += Math.sin(time + i * 0.5) * 0.015;
          positions[i3 + 2] += Math.cos(time + i * 0.5) * 0.015;

          // Réinitialisation si trop haut
          if (positions[i3 + 1] > 50) {
            positions[i3 + 1] = -5;
          }
          break;
      }

      // Limites de la zone
      if (Math.abs(positions[i3]) > 50) {
        positions[i3] = (Math.random() - 0.5) * 100;
      }
      if (Math.abs(positions[i3 + 2]) > 50) {
        positions[i3 + 2] = (Math.random() - 0.5) * 100;
      }
    }

    // Mise à jour des positions
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={type === 'neon' ? 0.8 : 0.6}
        sizeAttenuation
        blending={type === 'sparks' || type === 'neon' ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}
