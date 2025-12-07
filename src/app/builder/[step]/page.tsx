"use client";

import React from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { WizardLayout } from '@/components/WizardLayout';
import { PartSelector } from '@/components/PartSelector';
import { allParts } from '@/data/parts';
import { PartType } from '@/types/parts';
import { useBuild } from '@/context/BuildProvider';
import { ShoppingCart } from 'lucide-react';

// Map URL slugs to Part Types
const slugToType: Record<string, PartType> = {
  'cpu': 'CPU',
  'motherboard': 'Motherboard',
  'ram': 'RAM',
  'gpu': 'GPU',
  'storage': 'Storage',
  'psu': 'PSU',
  'case': 'Case',
  'cooler': 'Cooler',
  // 'summary' is handled separately or as a special case
};

const stepsOrder = ['case', 'motherboard', 'cpu', 'ram', 'gpu', 'storage', 'psu', 'cooler', 'summary'];

export default function BuilderStepPage() {
  const params = useParams();
  const router = useRouter();
  const step = params.step as string;

  const handleNext = () => {
      const currentIndex = stepsOrder.indexOf(step);
      if (currentIndex !== -1 && currentIndex < stepsOrder.length - 1) {
          const nextStep = stepsOrder[currentIndex + 1];
          router.push(`/builder/${nextStep}`);
      }
  };

  if (step === 'summary') {
      return (
          <WizardLayout currentStep="summary">
              <SummaryView />
          </WizardLayout>
      );
  }

  const type = slugToType[step];

  if (!type) {
    return notFound();
  }

  // Filter parts for this step
  const parts = allParts.filter(p => p.type === type);

  return (
    <WizardLayout currentStep={step}>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Select your {type}</h1>
            <p className="text-neutral-400">Choose from top-rated components available on Amazon.de</p>
        </div>
        <PartSelector parts={parts} type={type} onSelectNext={handleNext} />
    </WizardLayout>
  );
}

function SummaryView() {
    const { build, totalPrice } = useBuild();
    
    const partsList = [
        build.cpu,
        build.cooler,
        build.motherboard,
        build.ram,
        build.gpu,
        ...build.storage,
        build.psu,
        build.case
    ].filter(Boolean);



    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">Your Build Summary</h1>
            <p className="text-neutral-400 mb-8">Review your components before purchasing on Amazon.de</p>
            
            <div className="bg-[#111] rounded-xl overflow-hidden border border-neutral-800">
                <div className="p-6 grid gap-4">
                    {partsList.map((part) => (
                        <div key={part!.id} className="flex items-center gap-4 border-b border-neutral-800 last:border-0 pb-4 last:pb-0">
                            <div className="w-16 h-16 bg-white rounded p-2 flex items-center justify-center shrink-0">
                                <img src={part!.image} alt={part!.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider">{part!.type}</div>
                                <div className="font-medium text-white truncate">{part!.name}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-lg text-primary">€{part!.price.toFixed(2)}</div>
                                <a 
                                    href={part!.amazonUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-neutral-400 hover:text-primary hover:underline flex items-center justify-end gap-1 mt-1"
                                >
                                    View on Amazon <ShoppingCart size={12} />
                                </a>
                            </div>
                        </div>
                    ))}

                    {partsList.length === 0 && (
                        <div className="text-center py-12 text-neutral-500">
                            No parts selected yet. Start building!
                        </div>
                    )}
                </div>
                
                <div className="bg-black/50 p-6 flex items-center justify-between border-t border-neutral-800">
                    <div>
                        <div className="text-neutral-400 text-sm">Total Estimated Cost</div>
                        <div className="text-3xl font-bold text-primary">€{totalPrice.toFixed(2)}</div>
                    </div>

                </div>
            </div>
        </div>
    )
}
