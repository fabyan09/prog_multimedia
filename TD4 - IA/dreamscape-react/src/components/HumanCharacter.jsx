import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Composant HumanCharacter - Personnage humain stylisé en low-poly
 * Créé procéduralement avec des formes géométriques de base
 */
export default function HumanCharacter({ color = '#ff6b6b', rotation = [0, 0, 0], isMoving = false }) {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const bodyRef = useRef();

  // Animation de marche
  useFrame((state) => {
    if (!isMoving) {
      // Retour à la position neutre
      if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
      if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
      if (bodyRef.current) bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, 0.9, 0.1);
      return;
    }

    const time = state.clock.getElapsedTime();
    const walkSpeed = 8; // Vitesse de l'animation

    // Balancement des bras (opposé aux jambes)
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.5;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.5;
    }

    // Balancement des jambes
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.4;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.4;
    }

    // Légère oscillation verticale du corps
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.9 + Math.abs(Math.sin(time * walkSpeed * 2)) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={rotation}>
      {/* Tête */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Corps */}
      <mesh ref={bodyRef} position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.7, 0.9, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Bras gauche */}
      <group ref={leftArmRef} position={[-0.5, 1.0, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Bras droit */}
      <group ref={rightArmRef} position={[0.5, 1.0, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Jambe gauche */}
      <group ref={leftLegRef} position={[-0.2, 0.45, 0]}>
        <mesh position={[0, -0.45, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.13, 0.9, 8]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Jambe droite */}
      <group ref={rightLegRef} position={[0.2, 0.45, 0]}>
        <mesh position={[0, -0.45, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.13, 0.9, 8]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Yeux */}
      <mesh position={[-0.12, 1.75, 0.25]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.12, 1.75, 0.25]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Pupilles */}
      <mesh position={[-0.12, 1.75, 0.28]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 1.75, 0.28]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Effet lumineux (aura) */}
      <pointLight position={[0, 1, 0]} color={color} intensity={0.5} distance={3} />
    </group>
  );
}
