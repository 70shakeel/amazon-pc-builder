"use client";

import React from 'react';
import { useBuild } from '@/context/BuildProvider';
import { Check, ChevronRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import VisualAssembler from './VisualAssembler';

interface Step {
  id: string;
  name: string;
  isCompleted: boolean;
  isActive: boolean;
}

export function WizardLayout({ children, currentStep }: { children: React.ReactNode; currentStep: string }) {
  const { build, totalPrice } = useBuild();

  const steps: Step[] = [
    { id: 'case', name: 'Case', isCompleted: !!build.case, isActive: currentStep === 'case' },
    { id: 'motherboard', name: 'Motherboard', isCompleted: !!build.motherboard, isActive: currentStep === 'motherboard' },
    { id: 'cpu', name: 'CPU', isCompleted: !!build.cpu, isActive: currentStep === 'cpu' },
    { id: 'ram', name: 'Memory', isCompleted: !!build.ram, isActive: currentStep === 'ram' },
    { id: 'gpu', name: 'Graphics', isCompleted: !!build.gpu, isActive: currentStep === 'gpu' },
    { id: 'storage', name: 'Storage', isCompleted: build.storage.length > 0, isActive: currentStep === 'storage' },
    { id: 'psu', name: 'Power Supply', isCompleted: !!build.psu, isActive: currentStep === 'psu' },
    { id: 'cooler', name: 'Cooler', isCompleted: !!build.cooler, isActive: currentStep === 'cooler' },
    { id: 'summary', name: 'Summary', isCompleted: false, isActive: currentStep === 'summary' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-black/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-black rounded-lg flex items-center justify-center font-bold">PC</div>
            <span className="font-bold text-xl tracking-tight text-white"><span className="text-primary">Builder</span>.de</span>
          </Link>
          
          <div className="flex items-center gap-4">
             <div className="text-right">
                <div className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Total Estimate</div>
                <div className="font-mono text-xl font-bold text-primary">€{totalPrice.toFixed(2)}</div>
             </div>
             

          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-neutral-800 bg-black/40 overflow-x-auto">
        <div className="container mx-auto px-4">
            <div className="flex items-center h-14 min-w-max">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <Link href={`/builder/${step.id}`}>
                            <div className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                                step.isActive 
                                    ? "bg-primary/10 text-primary ring-1 ring-primary/50" 
                                    : step.isCompleted 
                                        ? "text-primary/70 hover:text-primary" 
                                        : "text-neutral-400 hover:text-neutral-200"
                            )}>
                                <span className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] border",
                                    step.isActive || step.isCompleted
                                        ? "border-primary bg-primary text-black"
                                        : "border-neutral-600 bg-transparent"
                                )}>
                                    {step.isCompleted && !step.isActive ? <Check size={12} strokeWidth={3} /> : index + 1}
                                </span>
                                <span>{step.name}</span>
                            </div>
                        </Link>
                        {index < steps.length - 1 && (
                            <ChevronRight size={14} className="mx-2 text-neutral-700" />
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
                {children}
            </div>
            
            {/* Visual Assembly Sidebar */}
            <div className="w-full lg:w-80 xl:w-96 shrink-0 order-first lg:order-none">
                <VisualAssembler />
            </div>
        </div>
      </main>
    </div>
  );
}
