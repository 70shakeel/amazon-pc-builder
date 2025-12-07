"use client";

import React from 'react';
import { Part } from '@/types/parts';
import { useBuild } from '@/context/BuildProvider';
import { Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PartSelectorProps {
  parts: Part[];
  type: Part['type'];
  onSelectNext?: () => void;
}

export function PartSelector({ parts, type, onSelectNext }: PartSelectorProps) {
  const { build, addPart, removePart, isCompatible } = useBuild();
  const selectedPart = build[type.toLowerCase() as keyof typeof build] as Part | null;

  // Split parts into compatible and incompatible
  const compatibleParts = parts.filter(p => isCompatible(p));
  const incompatibleParts = parts.filter(p => !isCompatible(p));

  const handleSelect = (part: Part) => {
    if (selectedPart?.id === part.id) {
        removePart(type);
    } else {
        addPart(part);
        if (onSelectNext) {
            setTimeout(() => onSelectNext(), 500); // Small delay for visual feedback
        }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {compatibleParts.map((part) => (
        <PartCard 
            key={part.id} 
            part={part} 
            isSelected={selectedPart?.id === part.id} 
            onSelect={() => handleSelect(part)} 
            isCompatible={true}
        />
      ))}
      
      {incompatibleParts.length > 0 && (
          <div className="col-span-full mt-8">
            <h3 className="text-red-400 font-medium mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Incompatible Components
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-60">
                {incompatibleParts.map((part) => (
                    <PartCard 
                        key={part.id} 
                        part={part} 
                        isSelected={selectedPart?.id === part.id} 
                        onSelect={() => {}} 
                        isCompatible={false}
                    />
                ))}
            </div>
          </div>
      )}
    </div>
  );
}

function PartCard({ part, isSelected, onSelect, isCompatible }: { part: Part, isSelected: boolean, onSelect: () => void, isCompatible: boolean }) {
    return (
        <div 
            onClick={isCompatible ? onSelect : undefined}
            className={cn(
                "group relative bg-[#111] rounded-xl overflow-hidden border transition-all duration-200",
                isSelected ? "border-primary ring-1 ring-primary/50 shadow-[0_0_20px_rgba(57,255,20,0.15)]" : "border-neutral-800 hover:border-neutral-600",
                isCompatible ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl" : "cursor-not-allowed grayscale-[0.5]"
            )}
        >
            <div className="aspect-square relative bg-white p-6 flex items-center justify-center">
                 {/* Placeholder for image */}
                 <img 
                    src={part.image} 
                    alt={part.name}
                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                 />
                 {isSelected && (
                     <div className="absolute top-3 right-3 bg-primary text-black p-1 rounded-full shadow-lg">
                        <CheckCircle2 size={20} />
                     </div>
                 )}
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-white line-clamp-2 leading-snug min-h-[2.5rem]">{part.name}</h3>
                </div>
                
                <div className="flex items-center gap-1 text-primary mb-3 text-sm">
                    <Star size={14} fill="currentColor" />
                    <span className="font-bold text-neutral-300">{part.rating}</span>
                    <a 
                        href={part.amazonUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-primary hover:underline text-xs ml-1 flex items-center gap-0.5 z-10 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        (View on Amazon.de)
                    </a>
                </div>

                <div className="space-y-1 mb-4">
                    {Object.entries(part.specs).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs text-neutral-400">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium text-neutral-200">{value.toString()}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                    <div className="font-bold text-lg text-primary">€{part.price.toFixed(2)}</div>
                    <button className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors",
                        isSelected ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "bg-primary text-black hover:bg-primary-dark"
                    )}>
                        {isSelected ? "Remove" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
