import Link from "next/link";
import { ArrowRight, Cpu, Monitor, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Build Your Dream PC<br/>
            <span className="text-primary">with Amazon.de</span>
        </h1>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            The easiest way to check compatibility, compare prices, and assemble your custom rig using Germany's largest marketplace.
        </p>
        
        <Link 
            href="/builder/case" 
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-black px-8 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
        >
            Start Building Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 relative z-10 px-4">
          <FeatureCard 
            icon={<Cpu size={32} className="text-primary" />}
            title="Smart Compatibility"
            description="We automatically filter parts that fit your build."
          />
          <FeatureCard 
            icon={<Zap size={32} className="text-primary" />}
            title="Real Amazon Prices"
            description="Get up-to-date pricing and availability from Amazon.de."
          />
          <FeatureCard 
            icon={<Monitor size={32} className="text-primary" />}
            title="Visual Assembly"
            description="See your PC come to life as you add components."
          />
      </div>
      </div>

  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-[#111] backdrop-blur border border-neutral-800 p-6 rounded-2xl md:w-80">
            <div className="mb-4 bg-neutral-900 w-12 h-12 flex items-center justify-center rounded-xl">
                {icon}
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
        </div>
    )
}
