
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, MeshWobbleMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Defining intrinsic elements as local constants to fix "Property 'x' does not exist on type 'JSX.IntrinsicElements'"
const Color = 'color' as any;
const Fog = 'fog' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const GridHelper = 'gridHelper' as any;

const Scene3D: React.FC = () => {
  const mainGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (mainGroup.current) {
      mainGroup.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      {/* Fix: Removed the lowercase <color /> element that caused the JSX error on line 30 and used the alias <Color /> instead */}
      <Color attach="background" args={['#050505']} />
      <Fog attach="fog" args={['#050505', 5, 20]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <AmbientLight intensity={0.5} />
      <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <PointLight position={[-10, -10, -10]} color="blue" intensity={1} />

      <Group ref={mainGroup}>
        {/* Floating Bubble Representing Cleanliness */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 64, 64]} position={[2, 0, -2]}>
            <MeshDistortMaterial
              color="#3b82f6"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        <Float speed={3} rotationIntensity={2} floatIntensity={1}>
          <Icosahedron args={[0.5, 0]} position={[-3, 2, -1]}>
            <MeshWobbleMaterial
              color="#60a5fa"
              factor={0.6}
              speed={1.5}
            />
          </Icosahedron>
        </Float>

        {/* Abstract Background Ring */}
        <Mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
          <TorusGeometry args={[10, 0.05, 16, 100]} />
          <MeshBasicMaterial color="#1e40af" transparent opacity={0.2} />
        </Mesh>
      </Group>

      {/* Subtle Grid Floor */}
      <GridHelper args={[100, 100, '#1e3a8a', '#0a0a0a']} position={[0, -5, 0]} rotation={[0, 0, 0]} />
    </>
  );
};

export default Scene3D;
