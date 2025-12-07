import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment } from '@react-three/drei';
import { useBuild } from '@/context/BuildProvider';
import { 
    MotherboardMesh, 
    CPUMesh, 
    GPUMesh, 
    RamMesh, 
    StorageMesh, 
    PSUMesh, 
    CoolerMesh, 
    CaseMesh 
} from './Parts3D';
import { Suspense } from 'react';

export default function PCScene() {
    const { build } = useBuild();

    return (
        <div className="w-full h-full bg-black rounded-xl overflow-hidden relative border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary">
             <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-primary uppercase font-bold tracking-wider border border-primary/20">
                3D Preview Mode
            </div>

            <Canvas shadows dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={50} />
                    
                    <Stage environment="city" intensity={0.5} shadows={false} adjustCamera={false}>
                        <group>
                            {/* Always show Case Frame */}
                            {build.case && <CaseMesh model={build.case.name} />}

                            {/* Components inside */}
                            {build.motherboard && <MotherboardMesh model={build.motherboard.name} />}
                            {build.cpu && <CPUMesh />}
                            {build.ram && <RamMesh />}
                            {build.gpu && <GPUMesh model={build.gpu.name} />}
                            {build.storage[0] && <StorageMesh />}
                            
                            {build.cooler && (
                                <CoolerMesh 
                                    type={build.cooler.specs.type || 'Air'} 
                                />
                            )}

                            {build.psu && <PSUMesh />}
                        </group>
                    </Stage>
                    
                    <OrbitControls 
                        makeDefault 
                        autoRotate 
                        autoRotateSpeed={0.5}
                        minPolarAngle={0} 
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Suspense>
            </Canvas>
            
            <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                <p className="text-xs text-slate-500">Left click to rotate • Scroll to zoom</p>
            </div>
        </div>
    );
}
