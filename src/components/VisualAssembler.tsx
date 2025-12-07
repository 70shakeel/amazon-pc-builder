import { useBuild } from '@/context/BuildProvider';
import dynamic from 'next/dynamic';
import { Box } from 'lucide-react';
import { SchematicView } from './SchematicView';

// Dynamically import 3D scene to avoid SSR issues with Three.js
const PCScene = dynamic(() => import('./ThreeD/PCScene'), { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-black text-neutral-500">
            <div className="text-center">
                <div className="animate-spin mb-4 text-primary">
                    <Box size={32} />
                </div>
                <p>Loading 3D Engine...</p>
            </div>
        </div>
    )
});

export default function VisualAssembler() {
    return (
        <div className="lg:col-span-1 sticky top-8 space-y-6">
            {/* Primary 3D View - Larger Height */}
            <div className="h-[300px] lg:h-[600px] w-full"> 
                <PCScene />
            </div>
        </div>
    );
}
