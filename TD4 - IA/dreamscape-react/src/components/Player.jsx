import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateTerrainHeight } from '../utils/noise';
import HumanCharacter from './HumanCharacter';

/**
 * Composant Player - Personnage humain contrôlable par l'utilisateur
 * Permet de se déplacer sur le terrain avec les touches ZQSD/Flèches et sauter avec Espace
 */
export default function Player({ theme, seed = 0, onPositionChange, playerColor = '#ff6b6b' }) {
  const meshRef = useRef();
  const velocityRef = useRef({ x: 0, z: 0, y: 0 });
  const keysPressed = useRef({});
  const [isJumping, setIsJumping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // Support gyroscope pour mobile
  const gyroRef = useRef({ alpha: 0, beta: 0, gamma: 0 });
  const isMobileRef = useRef(false);

  // Paramètres de mouvement - RALENTI
  const moveSpeed = 0.04; // Divisé par 5 pour ralentir
  const friction = 0.88;
  const jumpForce = 0.4;
  const gravity = -0.02;

  // Gestion des événements clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;

      // Saut avec la barre espace
      if (key === ' ' && !isJumping) {
        setIsJumping(true);
        velocityRef.current.y = jumpForce;
      }
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
  }, [isJumping]);

  // Détection mobile et gestion du gyroscope
  useEffect(() => {
    // Vérifier si c'est un appareil mobile
    const checkMobile = () => {
      isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    checkMobile();

    // Gérer les événements du gyroscope
    const handleOrientation = (event) => {
      if (isMobileRef.current && event.gamma !== null && event.beta !== null) {
        gyroRef.current.gamma = event.gamma; // Gauche/Droite (-90 à 90)
        gyroRef.current.beta = event.beta;   // Avant/Arrière (-180 à 180)
      }
    };

    // Demander la permission pour iOS 13+
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Permission denied for device orientation');
        }
      } else {
        // Pour les autres navigateurs
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    if (isMobileRef.current) {
      requestPermission();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
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

    // Calcul de l'accélération basée sur les touches pressées ou le gyroscope
    let accelerationX = 0;
    let accelerationZ = 0;

    // Mode gyroscope pour mobile
    if (isMobileRef.current) {
      const gyro = gyroRef.current;
      // Convertir les angles du gyroscope en mouvement
      // gamma: gauche(-) / droite(+) de -90 à 90
      // beta: avant(-) / arrière(+) de -180 à 180

      if (Math.abs(gyro.gamma) > 5) { // Seuil pour éviter les petits mouvements
        accelerationX = (gyro.gamma / 90) * moveSpeed;
      }

      if (Math.abs(gyro.beta - 90) > 10) { // beta = 90 quand le téléphone est vertical
        accelerationZ = ((gyro.beta - 90) / 90) * moveSpeed;
      }
    } else {
      // ZQSD + Flèches pour clavier
      if (keys['z'] || keys['arrowup']) accelerationZ -= moveSpeed;
      if (keys['s'] || keys['arrowdown']) accelerationZ += moveSpeed;
      if (keys['q'] || keys['arrowleft']) accelerationX -= moveSpeed;
      if (keys['d'] || keys['arrowright']) accelerationX += moveSpeed;
    }

    // Application de l'accélération à la vélocité
    velocity.x += accelerationX;
    velocity.z += accelerationZ;

    // Application de la friction
    velocity.x *= friction;
    velocity.z *= friction;

    // Gravité et saut
    if (isJumping) {
      velocity.y += gravity;
    }

    // Mise à jour de la position
    meshRef.current.position.x += velocity.x;
    meshRef.current.position.z += velocity.z;
    meshRef.current.position.y += velocity.y;

    // Limites du terrain (pour ne pas sortir) - MAP AGRANDIE
    const maxDistance = 150; // Terrain beaucoup plus grand !
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

    // Si le joueur touche le sol
    if (meshRef.current.position.y <= terrainHeight + 1) {
      meshRef.current.position.y = terrainHeight + 1;
      velocity.y = 0;
      setIsJumping(false);
    }

    // Rotation du personnage en fonction de la direction
    const isCurrentlyMoving = Math.abs(velocity.x) > 0.001 || Math.abs(velocity.z) > 0.001;
    setIsMoving(isCurrentlyMoving);

    if (isCurrentlyMoving) {
      const angle = Math.atan2(velocity.x, velocity.z);
      setRotation(angle);
    }

    // Callback pour mettre à jour la caméra
    if (onPositionChange) {
      onPositionChange(meshRef.current.position);
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <HumanCharacter color={playerColor} rotation={[0, rotation, 0]} isMoving={isMoving} />
    </group>
  );
}
