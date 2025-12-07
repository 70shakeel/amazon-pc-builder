import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import { Edges } from '@react-three/drei';

// --- Stylized Illustration Materials ---
// Using standard materials with specific colors to create a clean "3D vector" look.

const PCB_COLOR = "#1e293b"; // slate-800
const ACCENT_COLOR = "#3b82f6"; // blue-500
const METAL_COLOR = "#94a3b8"; // slate-400
const GOLD_COLOR = "#eab308"; // yellow-500
const GLASS_COLOR = "#ffffff";

// --- Generic Stylized Part ---
const StylizedBox = ({ 
    args = [1, 1, 1], 
    position = [0, 0, 0], 
    rotation = [0, 0, 0],
    color = "#333",
    edges = true,
    transparent = false,
    opacity = 1
}: any) => {
    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={args} />
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.3} 
                    metalness={0.8}
                    transparent={transparent}
                    opacity={opacity}
                />
                {edges && <Edges color="white" threshold={15} opacity={0.2} transparent />}
            </mesh>
        </group>
    );
};

// --- Specific Part Meshes ---

const MSIB650Mesh = () => (
    <group position={[0, 0, -1]}> 
        {/* PCB Board - Matte Black */}
        <StylizedBox 
            args={[2.4, 3.0, 0.1]} 
            color="#111" 
            edges={true} 
        />
        {/* Heatsinks - Dark Grey/Black Stealth Look */}
        <StylizedBox 
            args={[0.6, 1.4, 0.2]} 
            position={[-0.8, 0.7, 0.15]} 
            color="#222" 
        />
        <StylizedBox 
            args={[1.4, 0.5, 0.2]} 
            position={[-0.4, 1.2, 0.15]} 
            color="#222" 
        />
        {/* M.2 Shield - Black */}
        <StylizedBox 
            args={[1.0, 0.3, 0.05]} 
            position={[0, -0.2, 0.1]} 
            color="#1a1a1a"
        />
         {/* PCIe Slots */}
        <StylizedBox 
            args={[1.8, 0.1, 0.1]} 
            position={[0, -0.5, 0.1]} 
            color="#333" 
        />
    </group>
);

const ASUSZ790Mesh = () => (
    <group position={[0, 0, -1]}> 
        {/* PCB Board - Black */}
        <StylizedBox 
            args={[2.4, 3.0, 0.1]} 
            color="#1e1e1e" 
            edges={true} 
        />
        {/* Heatsinks - Silver/Metallic Accents */}
        <StylizedBox 
            args={[0.6, 1.4, 0.2]} 
            position={[-0.8, 0.7, 0.15]} 
            color="#94a3b8" // Silver
        />
        <mesh position={[-0.8, 0.7, 0.26]}>
            <planeGeometry args={[0.4, 1.0]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} /> {/* TUF Yellow hint */}
        </mesh>

        <StylizedBox 
            args={[1.4, 0.5, 0.2]} 
            position={[-0.4, 1.2, 0.15]} 
            color="#94a3b8" 
        />
        {/* M.2 Shields - Silver */}
        <StylizedBox 
            args={[1.0, 0.3, 0.05]} 
            position={[0, -0.2, 0.1]} 
            color="#cbd5e1"
        />
         {/* PCIe Slots */}
        <StylizedBox 
            args={[1.8, 0.1, 0.1]} 
            position={[0, -0.5, 0.1]} 
            color="#333" 
        />
    </group>
);

export const MotherboardMesh = ({ model = "" }: { model?: string }) => {
    const isASUS = model.toLowerCase().includes("asus") || model.toLowerCase().includes("z790");
    if (isASUS) return <ASUSZ790Mesh />;
    return <MSIB650Mesh />;
};

export const CPUMesh = () => {
    return (
        <group position={[0, 0.5, -0.9]}>
            {/* IHS (Heat Spreader) */}
            <StylizedBox 
                args={[0.4, 0.4, 0.05]} 
                color={METAL_COLOR} 
                edges={false}
            />
             {/* Logo/Text placeholder */}
             <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[0.2, 0.2]} />
                <meshBasicMaterial color={ACCENT_COLOR} />
             </mesh>
        </group>
    );
};

// --- Specific GPU Models ---

const NvidiaDualMesh = ({ fanBlade }: { fanBlade: React.FC }) => (
    <group position={[0, -0.8, 0]}>
        {/* Main Body - Smaller, Black */}
        <StylizedBox 
            args={[2.4, 0.2, 1.2]} 
            rotation={[0, 0, 0]} 
            color="#111"
        />
        {/* Top Plate - ASUS Style */}
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI/2, 0, 0]}>
             <planeGeometry args={[2.2, 1.0]} />
             <meshStandardMaterial color="#222" />
        </mesh>
         {/* Green Accent Strip */}
         <mesh position={[0, 0.12, 0.5]} rotation={[-Math.PI/2, 0, 0]}>
             <planeGeometry args={[2.0, 0.05]} />
             <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} /> 
         </mesh>
         
         {/* FANS - 2 Large Fans */}
         <group position={[-0.6, -0.11, 0]} rotation={[Math.PI/2, 0, 0]}>
            <mesh rotation={[0,0,0]} scale={[1.2, 1.2, 1]}> 
                {React.createElement(fanBlade)}
            </mesh>
         </group>
         <group position={[0.6, -0.11, 0]} rotation={[Math.PI/2, 0, 0]}>
            <mesh rotation={[0,0,0]} scale={[1.2, 1.2, 1]}> 
                {React.createElement(fanBlade)}
            </mesh>
         </group>
    </group>
);

const AMDTripleMesh = ({ fanBlade }: { fanBlade: React.FC }) => (
    <group position={[0, -0.8, 0]}>
        {/* Main Body - Long, Massive */}
        <StylizedBox 
            args={[3.2, 0.2, 1.3]} 
            rotation={[0, 0, 0]} 
            color="#0f172a" 
        />
        {/* Top Plate - XFX Style (Silver/Black) */}
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI/2, 0, 0]}>
             <planeGeometry args={[3.0, 1.1]} />
             <meshStandardMaterial color="#1e293b" />
        </mesh>
         {/* Red Accent Strip */}
         <mesh position={[0, 0.12, 0.55]} rotation={[-Math.PI/2, 0, 0]}>
             <planeGeometry args={[2.8, 0.05]} />
             <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} /> 
         </mesh>
         
         {/* FANS - 3 Fans */}
         <group position={[-1.0, -0.11, 0]} rotation={[Math.PI/2, 0, 0]}>
            {React.createElement(fanBlade)}
         </group>
         <group position={[0, -0.11, 0]} rotation={[Math.PI/2, 0, 0]}>
            {React.createElement(fanBlade)}
         </group>
         <group position={[1.0, -0.11, 0]} rotation={[Math.PI/2, 0, 0]}>
            {React.createElement(fanBlade)}
         </group>
    </group>
);

export const GPUMesh = ({ model = "" }: { model?: string }) => {
    const group = useRef<Group>(null);
    
    // Animate fans logic remains same, looking for children indices...
    // Note: With specialized meshes, the ref needs to be forwarded or logic moved inside.
    // For simplicity, we'll implement simple self-contained fan animation in sub-components if needed,
    // OR just use the previous centralized logic if the structure matches.
    // Let's attach the ref to the specific mesh group.
    
    // Refactored approach: Simple per-component animation
    const Fan = () => {
        const ref = useRef<Group>(null);
        useFrame((state, delta) => {
             if(ref.current) ref.current.rotation.z -= delta * 5;
        });

        return (
            <group ref={ref}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 7]}>
                        <boxGeometry args={[0.08, 0.35, 0.02]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                ))}
                <mesh>
                     <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                     <meshStandardMaterial color="#111" />
                </mesh>
            </group>
        )
    };
    
    const isAMD = model.toLowerCase().includes("amd") || model.toLowerCase().includes("radeon");
    
    if (isAMD) return <AMDTripleMesh fanBlade={Fan} />;
    return <NvidiaDualMesh fanBlade={Fan} />;
};

export const RamMesh = ({ count = 2 }: { count?: number }) => {
    return (
        <group position={[0.6, 0.5, -0.8]}>
            {Array.from({ length: count }).map((_, i) => (
                <group key={i} position={[i * 0.15, 0, 0]}>
                    {/* Stick */}
                    <StylizedBox 
                         args={[0.05, 1.2, 0.3]} // Vertical orientation relative to board
                         color="#111"
                    />
                    {/* RGB Top */}
                    <mesh position={[0, 0, 0.16]}>
                        <boxGeometry args={[0.05, 1.2, 0.02]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#ec4899" : "#8b5cf6"} emissive={i % 2 === 0 ? "#ec4899" : "#8b5cf6"} emissiveIntensity={3} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

export const StorageMesh = () => {
    // M.2 Stick
    return (
        <group position={[0, -0.2, -0.9]}>
             <StylizedBox 
                args={[0.8, 0.22, 0.05]} 
                color="#111" 
             />
             <mesh position={[-0.3, 0, 0.03]}>
                <boxGeometry args={[0.1, 0.15, 0.01]} />
                <meshStandardMaterial color={GOLD_COLOR} />
             </mesh>
        </group>
    );
};

export const CoolerMesh = ({ type }: { type: string }) => {
    const isAIO = type.toLowerCase().includes('liquid') || type.toLowerCase().includes('aio');
    
    if (isAIO) {
        return (
            <group>
                {/* Pump Block */}
                <StylizedBox 
                    args={[0.6, 0.6, 0.4]} 
                    position={[0, 0.5, -0.7]} 
                    color="#111"
                />
                 {/* Infinity Mirror Effect Placeholder */}
                 <mesh position={[0, 0.5, -0.49]}>
                    <circleGeometry args={[0.2, 32]} />
                    <meshStandardMaterial color={ACCENT_COLOR} emissive={ACCENT_COLOR} emissiveIntensity={2} />
                 </mesh>

                {/* Tubes */}
                <mesh position={[0, 1.0, -0.7]} rotation={[0, 0, 0.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
                    <meshStandardMaterial color="#000" />
                </mesh>

                {/* Radiator (Top) */}
                 <StylizedBox 
                    args={[3, 0.2, 1.2]} 
                    position={[0, 1.8, 0]} 
                    color="#111"
                />
            </group>
        )
    }

    // Air Cooler (Tower)
    return (
        <group position={[0, 0.5, -0.6]}>
            <StylizedBox 
                args={[0.8, 1.2, 0.6]} 
                color="#ccc" // Aluminum fins
            />
             {/* Fan on side */}
             <StylizedBox 
                args={[0.8, 1.0, 0.1]} 
                position={[0, 0, 0.35]} 
                color="#111"
             />
        </group>
    );
};

// --- Specific PSU Models ---

const CorsairPSUMesh = () => (
    <group>
        {/* Main Unit - Matte Black */}
        <StylizedBox 
            args={[1.5, 0.86, 1.4]} 
            color="#18181b" 
        />
        {/* Fan Grill - Triangular Pattern Simulation */}
         <mesh position={[0, 0.44, 0]} rotation={[-Math.PI/2, 0, 0]}>
             <planeGeometry args={[1.2, 1.2]} />
             <meshStandardMaterial color="#27272a" wireframe />
        </mesh>
         <mesh position={[0, 0.43, 0]} rotation={[-Math.PI/2, 0, 0]}>
             <circleGeometry args={[0.55, 6]} />
             <meshStandardMaterial color="#111" />
        </mesh>
         
        {/* Label Area - Side */}
         <mesh position={[0.76, 0, 0]} rotation={[0, Math.PI/2, 0]}>
             <planeGeometry args={[1.2, 0.6]} />
             <meshStandardMaterial color="#3f3f46" />
        </mesh>
        <mesh position={[0.77, 0, 0]} rotation={[0, Math.PI/2, 0]}>
             <planeGeometry args={[1.0, 0.2]} />
             <meshStandardMaterial color="#fbbf24" /> 
        </mesh>
    </group>
);

const BeQuietPSUMesh = () => (
     <group>
        {/* Main Unit - Dark Grey */}
        <StylizedBox 
            args={[1.5, 0.86, 1.6]} // Slightly longer
            color="#222" 
        />
        {/* Fan Grill - Parallel Lines */}
        <group position={[0, 0.44, 0]} rotation={[-Math.PI/2, 0, 0]}>
             <mesh>
                 <circleGeometry args={[0.55, 32]} />
                 <meshStandardMaterial color="#000" />
             </mesh>
             {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
                 <mesh key={i} position={[x, 0, 0.01]}>
                    <boxGeometry args={[0.02, 1.0, 0.01]} />
                    <meshStandardMaterial color="#555" />
                 </mesh>
             ))}
        </group>
         {/* Orange Ring Signature */}
         <mesh position={[0.76, 0, 0]} rotation={[0, Math.PI/2, 0]}>
             <ringGeometry args={[0.2, 0.25, 32]} />
             <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={0.5} />
        </mesh>
    </group>
);


export const PSUMesh = ({ model = "" }: { model?: string }) => {
    return (
        <group position={[0, -1.6, 1.2]}> {/* Bottom of case, back */}
            { model.toLowerCase().includes("be quiet") ? <BeQuietPSUMesh /> : <CorsairPSUMesh /> }
            
             {/* Modular Cables Bundle */}
             <mesh position={[0.8, 0, -0.5]} rotation={[0, 0, Math.PI/2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5]} />
                <meshStandardMaterial color="#111" />
             </mesh>
        </group>
    );
};

// --- Specific Case Models ---

const Corsair4000DMesh = () => (
    <group>
        {/* Main Frame - Black/Grey */}
        <mesh>
            <boxGeometry args={[2.3, 4.5, 4.5]} />
            <meshStandardMaterial color="#222" transparent opacity={0.1} depthWrite={false} />
            <Edges color="#444" threshold={15} />
        </mesh>
        {/* Front Grill Pattern */}
        <mesh position={[0, 0, 2.26]}>
             <planeGeometry args={[2.1, 4.3]} />
             <meshStandardMaterial color="#111" />
        </mesh>
         <mesh position={[0, 0, 2.27]}>
             <planeGeometry args={[2.0, 4.2]} />
             <meshStandardMaterial color="#333" wireframe />
        </mesh>
         {/* PSU Shroud */}
        <mesh position={[0, -1.8, 0]}>
             <boxGeometry args={[2.2, 0.8, 4.4]} />
             <meshStandardMaterial color="#111" />
        </mesh>
         {/* Glass Side Panel Tint */}
        <mesh position={[1.16, 0, 0]} rotation={[0, Math.PI/2, 0]}>
            <planeGeometry args={[4.5, 4.5]} />
            <meshStandardMaterial color="#000" transparent opacity={0.2} metalness={0.9} roughness={0} />
        </mesh>
    </group>
);

const NZXTH9Mesh = () => (
    <group>
        {/* Dual Chamber Look - Wider */}
        <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[2.8, 4.4, 4.4]} />
            <meshStandardMaterial color="#fff" transparent opacity={0.05} depthWrite={false} />
            <Edges color="#fff" threshold={15} />
        </mesh>
        {/* Seamless Glass Corner (Front + Side) */}
        <mesh position={[1.41, 0, 0]} rotation={[0, Math.PI/2, 0]}>
            <planeGeometry args={[4.4, 4.4]} />
             <meshStandardMaterial color="#ccf" transparent opacity={0.1} metalness={0.9} roughness={0} />
        </mesh>
        <mesh position={[0.2, 0, 2.21]}>
             <planeGeometry args={[2.8, 4.4]} />
             <meshStandardMaterial color="#ccf" transparent opacity={0.1} metalness={0.9} roughness={0} />
        </mesh>
         {/* White PSU Shroud */}
        <mesh position={[0.2, -1.8, 0]}>
             <boxGeometry args={[2.7, 0.6, 4.3]} />
             <meshStandardMaterial color="#eee" />
        </mesh>
    </group>
);

const FractalNorthMesh = () => (
    <group>
        {/* Main Frame - Black/Gold Accents */}
        <mesh>
             <boxGeometry args={[2.3, 4.4, 4.4]} />
             <meshStandardMaterial color="#1a1a1a" transparent opacity={0.1} />
             <Edges color="#b8860b" opacity={0.3} />
        </mesh>
        {/* Wood Front Panel Slats */}
        <group position={[0, 0, 2.22]} rotation={[0, 0, 0]}>
            {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
                 <mesh key={i} position={[x, 0, 0]}>
                    <boxGeometry args={[0.15, 4.2, 0.05]} />
                    <meshStandardMaterial color="#8b4513" /> 
                 </mesh>
            ))}
        </group>
         {/* Brass Feet/Accents */}
         <mesh position={[1, -2.1, 1.5]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2]} />
            <meshStandardMaterial color="#daa520" metalness={1} roughness={0.2} />
         </mesh>
         <mesh position={[-1, -2.1, 1.5]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2]} />
            <meshStandardMaterial color="#daa520" metalness={1} roughness={0.2} />
         </mesh>
    </group>
);

export const CaseMesh = ({ model = "" }: { model?: string }) => {
  // Use heuristic to match case type
  const isNZXT = model.toLowerCase().includes("nzxt") || model.toLowerCase().includes("h9") || model.toLowerCase().includes("h6");
  const isFractal = model.toLowerCase().includes("fractal") || model.toLowerCase().includes("north");
  
  if (isNZXT) return <NZXTH9Mesh />;
  if (isFractal) return <FractalNorthMesh />;
  
  // Default to Corsair 4000D style
  return <Corsair4000DMesh />;
}

