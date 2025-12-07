export type PartType = 'CPU' | 'GPU' | 'RAM' | 'Motherboard' | 'Storage' | 'PSU' | 'Case' | 'Cooler';

export interface Part {
  id: string;
  name: string;
  type: PartType;
  price: number;
  image: string;
  amazonUrl: string;
  rating: number;
  specs: Record<string, string | number | boolean | string[]>;
}

export interface CPU extends Part {
  type: 'CPU';
  specs: {
    socket: string; // e.g., "AM5", "LGA1700"
    cores: number;
    threads: number;
    baseClock: number; // GHz
    boostClock: number; // GHz
    tdp: number; // Watts
    integratedGraphics: boolean;
  };
}

export interface GPU extends Part {
  type: 'GPU';
  specs: {
    chipset: string; // e.g., "RTX 4090", "RX 7900 XTX"
    memory: number; // GB
    memoryType: string; // e.g., "GDDR6X"
    length: number; // mm
    tdp: number; // Watts
  };
}

export interface Motherboard extends Part {
  type: 'Motherboard';
  specs: {
    socket: string;
    formFactor: 'ATX' | 'Micro-ATX' | 'Mini-ITX';
    chipset: string;
    memoryType: 'DDR4' | 'DDR5';
    memorySlots: number;
    maxMemory: number; // GB
    m2Slots: number;
    wifi: boolean;
  };
}

export interface RAM extends Part {
  type: 'RAM';
  specs: {
    type: 'DDR4' | 'DDR5';
    speed: number; // MHz
    capacity: number; // GB (total kit size)
    modules: number; // Number of sticks
    casLatency: number;
  };
}

export interface Storage extends Part {
  type: 'Storage';
  specs: {
    type: 'SSD' | 'HDD';
    interface: 'M.2 NVMe' | 'SATA';
    capacity: number; // GB
    readSpeed?: number; // MB/s
    writeSpeed?: number; // MB/s
  };
}

export interface PSU extends Part {
  type: 'PSU';
  specs: {
    wattage: number; // Watts
    rating: '80+ Bronze' | '80+ Gold' | '80+ Platinum' | '80+ Titanium' | 'None';
    modular: 'Full' | 'Semi' | 'No';
  };
}

export interface Case extends Part {
  type: 'Case';
  specs: {
    formFactor: ('ATX' | 'Micro-ATX' | 'Mini-ITX')[]; // Supported sizes
    maxGpuLength: number; // mm
    sidePanel: 'Tempered Glass' | 'Acrylic' | 'Solid';
    fanSupport: string[];
  };
}

export interface Cooler extends Part {
  type: 'Cooler';
  specs: {
    type: 'Air' | 'AIO';
    sockets: string[]; // Supported sockets
    height?: number; // mm (for Air)
    radiatorSize?: number; // mm (for AIO)
    tdpRating?: number;
  };
}
