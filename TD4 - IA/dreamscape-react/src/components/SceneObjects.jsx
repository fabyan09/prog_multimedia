import { useMemo } from 'react';
import * as THREE from 'three';
import { generateTerrainHeight } from '../utils/noise';

/**
 * Composant Tree - Génère un arbre procédural
 */
function Tree({ position, theme, seed }) {
  const scale = useMemo(() => 0.8 + Math.random() * 0.4, []);

  return (
    <group position={position}>
      {/* Tronc */}
      <mesh position={[0, 1.5 * scale, 0]} castShadow>
        <cylinderGeometry args={[0.3 * scale, 0.4 * scale, 3 * scale, 8]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>

      {/* Feuillage - trois cônes superposés */}
      <mesh position={[0, 3.5 * scale, 0]} castShadow>
        <coneGeometry args={[1.5 * scale, 2.5 * scale, 8]} />
        <meshStandardMaterial color={theme.particles.color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 4.5 * scale, 0]} castShadow>
        <coneGeometry args={[1.2 * scale, 2 * scale, 8]} />
        <meshStandardMaterial color={theme.particles.color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 5.3 * scale, 0]} castShadow>
        <coneGeometry args={[0.8 * scale, 1.5 * scale, 8]} />
        <meshStandardMaterial color={theme.particles.color} roughness={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Composant Snowman - Génère un bonhomme de neige
 */
function Snowman({ position }) {
  return (
    <group position={position}>
      {/* Corps - grosse boule */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Torse - boule moyenne */}
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Tête - petite boule */}
      <mesh position={[0, 3, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Nez (carotte) */}
      <mesh position={[0, 3, 0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.4, 8]} />
        <meshStandardMaterial color="#ff8800" />
      </mesh>

      {/* Yeux */}
      <mesh position={[-0.15, 3.1, 0.35]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 3.1, 0.35]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Boutons */}
      <mesh position={[0, 2.3, 0.55]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 1.9, 0.58]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

/**
 * Composant Cactus - Génère un cactus pour le désert
 */
function Cactus({ position, theme }) {
  const height = useMemo(() => 3 + Math.random() * 2, []);

  return (
    <group position={position}>
      {/* Tronc principal */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, height, 8]} />
        <meshStandardMaterial color="#2d5a2d" roughness={0.8} />
      </mesh>

      {/* Bras gauche */}
      <mesh position={[-0.7, height * 0.6, 0]} rotation={[0, 0, Math.PI / 3]} castShadow>
        <cylinderGeometry args={[0.3, 0.35, 1.5, 8]} />
        <meshStandardMaterial color="#2d5a2d" roughness={0.8} />
      </mesh>

      {/* Bras droit */}
      <mesh position={[0.7, height * 0.5, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.3, 0.35, 1.8, 8]} />
        <meshStandardMaterial color="#2d5a2d" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Composant Rock - Génère un rocher
 */
function Rock({ position, theme, type = 'normal' }) {
  const scale = useMemo(() => 0.5 + Math.random() * 0.8, []);
  const color = type === 'volcanic' ? '#1a0a0a' : '#666666';
  const emissive = type === 'volcanic' ? '#ff4400' : '#000000';
  const emissiveIntensity = type === 'volcanic' ? 0.2 : 0;

  return (
    <mesh position={position} castShadow>
      <dodecahedronGeometry args={[scale, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.95}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

/**
 * Composant CyberStructure - Génère une structure cyberpunk
 */
function CyberStructure({ position }) {
  const height = useMemo(() => 2 + Math.random() * 4, []);
  const colors = ['#ff00ff', '#00ffff', '#ff0080'];
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []);

  return (
    <group position={position}>
      {/* Structure principale */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Antenne lumineuse */}
      <mesh position={[0, height + 0.3, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

/**
 * Composant CoralRock - Génère un rocher de corail pour l'océan
 */
function CoralRock({ position, theme }) {
  const scale = useMemo(() => 0.6 + Math.random() * 0.6, []);

  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[scale, 8, 8]} />
        <meshStandardMaterial color="#4d7c8a" roughness={0.8} />
      </mesh>
      {/* Petites sphères de corail */}
      <mesh position={[scale * 0.5, scale * 0.3, 0]} castShadow>
        <sphereGeometry args={[scale * 0.3, 6, 6]} />
        <meshStandardMaterial color="#ff6b9d" roughness={0.6} />
      </mesh>
      <mesh position={[-scale * 0.3, scale * 0.5, scale * 0.2]} castShadow>
        <sphereGeometry args={[scale * 0.25, 6, 6]} />
        <meshStandardMaterial color="#ffa07a" roughness={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Composant principal SceneObjects - Génère les objets selon le thème
 */
export default function SceneObjects({ theme, seed = 0 }) {
  // Génération des positions d'objets basée sur le seed
  const objects = useMemo(() => {
    const objectList = [];
    const random = (x, y) => {
      // Simple hash pour générer des nombres pseudo-aléatoires
      const hash = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
      return hash - Math.floor(hash);
    };

    // Nombre d'objets selon le thème
    const objectCount = {
      foret: 30,
      desert: 20,
      neige: 15,
      volcan: 25,
      cyberpunk: 20,
      ocean: 25
    };

    const count = objectCount[theme.key] || 20;

    for (let i = 0; i < count; i++) {
      const angle = random(i, seed) * Math.PI * 2;
      const distance = 10 + random(i + 100, seed) * 30;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;

      // Calcul de la hauteur du terrain
      const { scale, amplitude, octaves } = theme.terrain;
      const seedOffset = seed * 1000;
      const y = generateTerrainHeight(
        (x + seedOffset) * 0.1,
        (z + seedOffset) * 0.1,
        scale,
        amplitude,
        octaves
      );

      objectList.push({
        id: `${theme.key}-${i}`,
        position: [x, y, z],
        type: theme.key
      });
    }

    return objectList;
  }, [theme, seed]);

  return (
    <group>
      {objects.map((obj) => {
        switch (obj.type) {
          case 'foret':
            return <Tree key={obj.id} position={obj.position} theme={theme} seed={seed} />;
          case 'neige':
            return <Snowman key={obj.id} position={obj.position} />;
          case 'desert':
            return <Cactus key={obj.id} position={obj.position} theme={theme} />;
          case 'volcan':
            return <Rock key={obj.id} position={obj.position} theme={theme} type="volcanic" />;
          case 'cyberpunk':
            return <CyberStructure key={obj.id} position={obj.position} />;
          case 'ocean':
            return <CoralRock key={obj.id} position={obj.position} theme={theme} />;
          default:
            return null;
        }
      })}
    </group>
  );
}
