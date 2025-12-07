import { CPU, GPU, Motherboard, RAM, Storage, PSU, Case, Cooler, Part } from "@/types/parts";

export const cpus: CPU[] = [
  {
    id: "cpu-amd-7800x3d",
    name: "AMD Ryzen 7 7800X3D",
    type: "CPU",
    price: 389.00,
    image: "/parts/pc_part_cpu_amd_1765059309898.png",
    amazonUrl: "https://www.amazon.de/dp/B0BTZB7F88",
    rating: 4.8,
    specs: {
      socket: "AM5",
      cores: 8,
      threads: 16,
      baseClock: 4.2,
      boostClock: 5.0,
      tdp: 120,
      integratedGraphics: true
    }
  },
  {
    id: "cpu-intel-14900k",
    name: "Intel Core i9-14900K",
    type: "CPU",
    price: 585.99,
    image: "/parts/pc_part_cpu_intel_1765059323320.png",
    amazonUrl: "https://www.amazon.de/s?k=Intel+Core+i9-14900K",
    rating: 4.7,
    specs: {
      socket: "LGA1700",
      cores: 24,
      threads: 32,
      baseClock: 3.2,
      boostClock: 6.0,
      tdp: 125,
      integratedGraphics: true
    }
  },
  {
      id: "cpu-amd-7600",
      name: "AMD Ryzen 5 7600",
      type: "CPU",
      price: 199.00,
    image: "/parts/pc_part_cpu_amd_7600_1765060332436.png",
      amazonUrl: "https://www.amazon.de/s?k=AMD+Ryzen+5+7600",
      rating: 4.7,
      specs: {
        socket: "AM5",
        cores: 6,
        threads: 12,
        baseClock: 3.8,
        boostClock: 5.1,
        tdp: 65,
        integratedGraphics: true
      }
    }
];

export const gpus: GPU[] = [
  {
    id: "gpu-nvidia-4070super",
    name: "ASUS Dual GeForce RTX 4070 Super",
    type: "GPU",
    price: 649.00,
    image: "/parts/pc_part_gpu_nvidia_1765059337828.png",
    amazonUrl: "https://www.amazon.de/s?k=ASUS+Dual+GeForce+RTX+4070+Super",
    rating: 4.6,
    specs: {
      chipset: "RTX 4070 Super",
      memory: 12,
      memoryType: "GDDR6X",
      length: 267,
      tdp: 220
    }
  },
  {
    id: "gpu-amd-7900xtx",
    name: "XFX Speedster MERC310 AMD Radeon RX 7900XTX",
    type: "GPU",
    price: 979.00,
    image: "/parts/pc_part_gpu_amd_7900xtx_1765060345360.png",
    amazonUrl: "https://www.amazon.de/dp/B0BNLSW23M",
    rating: 4.5,
    specs: {
      chipset: "RX 7900 XTX",
      memory: 24,
      memoryType: "GDDR6",
      length: 344,
      tdp: 355
    }
  }
];

export const motherboards: Motherboard[] = [
  {
    id: "mobo-msi-b650",
    name: "MSI MAG B650 Tomahawk WiFi",
    type: "Motherboard",
    price: 205.00,
    image: "/parts/pc_part_mobo_b650_1765059352141.png",
    amazonUrl: "https://www.amazon.de/s?k=MSI+MAG+B650+Tomahawk+WiFi",
    rating: 4.5,
    specs: {
      socket: "AM5",
      formFactor: "ATX",
      chipset: "B650",
      memoryType: "DDR5",
      memorySlots: 4,
      maxMemory: 192,
      m2Slots: 3,
      wifi: true
    }
  },
  {
    id: "mobo-asus-z790",
    name: "ASUS TUF Gaming Z790-Plus WiFi",
    type: "Motherboard",
    price: 245.90,
    image: "/parts/pc_part_mobo_asus_z790_1765060357685.png",
    amazonUrl: "https://www.amazon.de/s?k=ASUS+TUF+Gaming+Z790-Plus+WiFi+DDR5",
    rating: 4.6,
    specs: {
      socket: "LGA1700",
      formFactor: "ATX",
      chipset: "Z790",
      memoryType: "DDR5",
      memorySlots: 4,
      maxMemory: 192,
      m2Slots: 4,
      wifi: true
    }
  }
];

export const ram: RAM[] = [
  {
    id: "ram-corsair-ddr5-6000",
    name: "Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz",
    type: "RAM",
    price: 119.99,
    image: "/parts/pc_part_ram_corsair_ddr5_1765060371586.png",
    amazonUrl: "https://www.amazon.de/dp/B0CBRJ63RT",
    rating: 4.7,
    specs: {
      type: "DDR5",
      speed: 6000,
      capacity: 32,
      modules: 2,
      casLatency: 30
    }
  }
];

export const storage: Storage[] = [
  {
    id: "ssd-samsung-990pro-2tb",
    name: "Samsung 990 PRO 2TB NVMe M.2 SSD",
    type: "Storage",
    price: 169.90,
    image: "/parts/pc_part_ssd_samsung_990pro_1765060384503.png",
    amazonUrl: "https://www.amazon.de/dp/B0B9C4DKKG",
    rating: 4.9,
    specs: {
      type: "SSD",
      interface: "M.2 NVMe",
      capacity: 2000,
      readSpeed: 7450,
      writeSpeed: 6900
    }
  },
  {
    id: "ssd-wd-black-sn850x-1tb",
    name: "WD_BLACK SN850X 1TB NVMe SSD",
    type: "Storage",
    price: 99.00,
    image: "/parts/pc_part_ssd_wd_black_sn850x_1765060397242.png",
    amazonUrl: "https://www.amazon.de/dp/B0B7CKVCCV",
    rating: 4.8,
    specs: {
      type: "SSD",
      interface: "M.2 NVMe",
      capacity: 1000,
      readSpeed: 7300,
      writeSpeed: 6300
    }
  }
];

export const psus: PSU[] = [
  {
    id: "psu-corsair-rm850x",
    name: "Corsair RM850x 80 PLUS Gold 850W",
    type: "PSU",
    price: 149.90,
    image: "/parts/pc_part_psu_corsair_rm850x_1765060410746.png",
    amazonUrl: "https://www.amazon.de/dp/B0BVL17341",
    rating: 4.8,
    specs: {
        wattage: 850,
        rating: "80+ Gold",
        modular: "Full"
    }
  },
  {
    id: "psu-bequiet-purepower-1000",
    name: "be quiet! Pure Power 12 M 1000W",
    type: "PSU",
    price: 168.00,
    image: "/parts/pc_part_psu_bequiet_purepower_1765060423754.png",
    amazonUrl: "https://www.amazon.de/s?k=be+quiet!+Pure+Power+12+M+1000W",
    rating: 4.7,
    specs: {
        wattage: 1000,
        rating: "80+ Gold",
        modular: "Full"
    }
  }
];

export const cases: Case[] = [
    {
      id: "case-corsair-4000d",
      name: "Corsair 4000D Airflow",
      type: "Case",
      price: 89.90,
      image: "/parts/pc_part_case_corsair_1765059365193.png",
      amazonUrl: "https://www.amazon.de/dp/B08C7BGV3D",
      rating: 4.8,
      specs: {
        formFactor: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 360,
        sidePanel: "Tempered Glass",
        fanSupport: ["120mm", "140mm"]
      }
    },
    {
       id: "case-nzxt-h9-flow",
       name: "NZXT H9 Flow",
       type: "Case",
       price: 159.90, // Updated price estimate based on research
       image: "https://c1.neweggimages.com/productimage/nb640/11-146-346-09.jpg", // Updated image
       amazonUrl: "https://www.amazon.de/dp/B0DQPRVD4C",
       rating: 4.8,
       specs: {
         formFactor: ["ATX", "Micro-ATX", "Mini-ITX"],
         maxGpuLength: 435, 
         sidePanel: "Tempered Glass",
         fanSupport: ["120mm", "140mm"]
       }
    }
];

export const coolers: Cooler[] = [
    {
       id: "cooler-peerless-assassin",
       name: "Thermalright Peerless Assassin 120 SE",
       type: "Cooler",
       price: 36.90,
    image: "/parts/pc_part_cooler_thermalright_1765060454627.png",
       amazonUrl: "https://www.amazon.de/s?k=Thermalright+Peerless+Assassin+120+SE",
       rating: 4.6,
       specs: {
         type: "Air",
         sockets: ["AM5", "AM4", "LGA1700"],
         height: 155,
         tdpRating: 240
       }
    },
    {
        id: "cooler-arctic-freezer-ii",
        name: "ARCTIC Liquid Freezer II 360",
        type: "Cooler",
        price: 105.00,
        image: "/parts/pc_part_cooler_arctic_freezer_1765060468051.png",
        amazonUrl: "https://www.amazon.de/dp/B07WNJCVNW",
        rating: 4.7,
        specs: {
            type: "AIO",
            sockets: ["AM5", "AM4", "LGA1700"],
            radiatorSize: 360
        }
    }
];

export const allParts: Part[] = [
    ...cpus,
    ...gpus,
    ...motherboards,
    ...ram,
    ...storage,
    ...psus,
    ...cases,
    ...coolers
];
