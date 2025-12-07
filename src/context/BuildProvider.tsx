"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Part, CPU, Motherboard, RAM, GPU, PSU, Storage, Case, Cooler } from '@/types/parts';
import { allParts } from '@/data/parts';

interface BuildState {
  cpu: CPU | null;
  motherboard: Motherboard | null;
  ram: RAM | null;
  gpu: GPU | null;
  storage: Storage[];
  psu: PSU | null;
  case: Case | null;
  cooler: Cooler | null;
}

interface BuildContextType {
  build: BuildState;
  addPart: (part: Part) => void;
  removePart: (type: Part['type'], id?: string) => void;
  isCompatible: (part: Part) => boolean;
  totalPrice: number;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [build, setBuild] = useState<BuildState>({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: [],
    psu: null,
    case: null,
    cooler: null,
  });

  const addPart = (part: Part) => {
    setBuild((prev) => {
      if (part.type === 'Storage') {
        return { ...prev, storage: [...prev.storage, part as Storage] };
      }
      return { ...prev, [part.type.toLowerCase()]: part };
    });
  };

  const removePart = (type: Part['type'], id?: string) => {
    setBuild((prev) => {
      if (type === 'Storage' && id) {
        return { ...prev, storage: prev.storage.filter((s) => s.id !== id) };
      }
      return { ...prev, [type.toLowerCase()]: null };
    });
  };

  const isCompatible = (part: Part): boolean => {
    // Basic compatibility checks
    if (part.type === 'Motherboard') {
      const mobo = part as Motherboard;
      if (build.cpu && build.cpu.specs.socket !== mobo.specs.socket) return false;
      if (build.ram && build.ram.specs.type !== mobo.specs.memoryType) return false;
    }

    if (part.type === 'CPU') {
      const cpu = part as CPU;
      if (build.motherboard && build.motherboard.specs.socket !== cpu.specs.socket) return false;
    }

    if (part.type === 'RAM') {
        const ram = part as RAM;
        if (build.motherboard && build.motherboard.specs.memoryType !== ram.specs.type) return false;
    }

    // TODO: Add more checks (TDP, Clearance, Dimensions)
    return true;
  };

  const totalPrice = Object.values(build)
    .flat()
    .filter((p): p is Part => p !== null)
    .reduce((sum, part) => sum + part.price, 0);

  return (
    <BuildContext.Provider value={{ build, addPart, removePart, isCompatible, totalPrice }}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
}
