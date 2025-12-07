# Amazon PC Builder

A modern, interactive PC building wizard that helps users select compatible components and visualize their build in 3D. The application guides users step-by-step through choosing parts and provides direct Amazon purchasing links for the selected components.

![PC Builder Demo](public/demo.webp)

## 🚀 Features

- **Interactive 3D Visualizer**: Real-time 3D representation of the PC build using React Three Fiber. Watch components appear inside the case as you select them.
- **Step-by-Step Wizard**: Guided building process ensuring no essential component is missed (Case -> Motherboard -> CPU -> RAM -> GPU -> Storage -> PSU -> Cooler).
- **Compatibility Checking**: Automatic validation to ensure parts fit together (e.g., CPU socket matching Motherboard socket).
- **Live Pricing**: Real-time total cost calculation based on selected parts.
- **Amazon Integration**: Direct "View on Amazon" links for all products, utilizing search results to ensure stock availability.
- **Responsive Design**: Fully responsive UI that works seamlessly on desktop and mobile devices.
- **Persistent State**: Build progress is saved as you navigate through the steps.

## 🛠️ Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: 
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber): React renderer for Three.js
  - [Drei](https://github.com/pmndrs/drei): Useful helpers for React Three Fiber
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── builder/      # Builder wizard routes
│   └── page.tsx      # Landing page
├── components/       # React components
│   ├── ThreeD/       # 3D scene and model components
│   └── ...           # UI components (WizardLayout, PartSelector, etc.)
├── context/          # Global state (BuildProvider)
├── data/             # Static data for PC parts
├── lib/              # Utility functions
└── types/            # TypeScript interfaces
```

## 🚦 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 How It Works

1.  **Selection**: The `BuildProvider` manages the current state of the build.
2.  **Navigation**: Users move through steps defined in `src/lib/utils.ts`.
3.  **Visualization**: The `VisualAssembler` component observes the current state and renders the appropriate 3D models using `PCScene`.
4.  **Data**: Product data is stored in `src/data/parts.ts`, including specifications, images, and Amazon links.

## 🎨 Customization

-   **Colors**: Global theme colors are defined in `src/app/globals.css`.
-   **Parts**: Add or modify PC parts in `src/data/parts.ts`.
