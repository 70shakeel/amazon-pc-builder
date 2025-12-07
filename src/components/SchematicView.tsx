"use client";

import React, { useState, useEffect } from 'react';
import { useBuild } from '@/context/BuildProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Fan, Cpu, Disc, Zap, Box, Server, Grid } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists based on previous usage

export function SchematicView() {
    const { build, totalPrice } = useBuild();
    const [fansSpinning, setFansSpinning] = useState(false);

    useEffect(() => {
        if (build.psu && (build.case || build.cooler)) {
            setFansSpinning(true);
        } else {
            setFansSpinning(false);
        }
    }, [build]);
    
    const ramSticks = build.ram ? (build.ram.specs.modules || 2) : 0;

    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative mt-4">
             {/* Visualizer Header */}
             <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">2D Schematic</span>
                </div>
            </div>

            <div className="relative aspect-square sm:aspect-[4/3] bg-[#0a0f1c] p-6 flex items-center justify-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20" 
                    style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px'}} 
                />

                <div className="relative w-full h-full max-w-sm mx-auto">
                    <AnimatePresence>
                        {/* Layer 1: CASE */}
                        {build.case && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-0 border-4 border-slate-700 rounded-lg bg-slate-800/30 backdrop-blur-sm"
                            >
                                {/* Default Case Fans Front */}
                                <div className="absolute top-4 bottom-4 left-0 w-8 flex flex-col justify-around px-1">
                                    {[1, 2, 3].map(i => (
                                        <motion.div 
                                            key={i}
                                            animate={fansSpinning ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-8 h-8 rounded-full border-2 border-slate-600 border-dashed opacity-50"
                                        />
                                    ))}
                                </div>
                                <img 
                                    src={build.case.image} 
                                    alt="Case" 
                                    className="absolute inset-0 w-full h-full object-contain opacity-20 mix-blend-overlay pointer-events-none" 
                                />
                            </motion.div>
                        )}

                        {/* Layer 2: MOTHERBOARD */}
                        {build.motherboard && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute inset-4 z-10 bg-slate-800 border-2 border-slate-600 rounded flex flex-col p-2 shadow-xl"
                            >
                                <div className="h-12 w-full bg-slate-700/50 mb-2 rounded border border-slate-600/50 relative flex items-center justify-center">
                                   <span className="text-[8px] text-slate-500 font-mono">VRM_HEATSINK</span>
                                </div>
                                <div className="flex-1 flex gap-2">
                                    {/* CPU Socket Area */}
                                    <div className="w-2/3 bg-slate-900/50 rounded border border-slate-700 relative flex items-center justify-center">
                                        
                                        {/* CPU CHIP */}
                                        {build.cpu && (
                                            <motion.div 
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"
                                            >
                                                <Cpu size={20} className="text-slate-800" />
                                            </motion.div>
                                        )}

                                        {/* COOLER */}
                                        {build.cooler && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 1.2 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute inset-0 z-30 flex items-center justify-center p-2"
                                            >
                                                <div className="w-16 h-16 rounded-full border-4 border-slate-300 bg-slate-800/80 backdrop-blur flex items-center justify-center shadow-lg relative">
                                                    <Fan 
                                                        className={cn("text-white", fansSpinning && "animate-spin")} 
                                                        size={32} 
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* RAM SLOTS */}
                                    <div className="w-1/3 flex flex-col justify-center gap-1 px-1">
                                        {Array.from({ length: 4 }).map((_, i) => ( 
                                            <div key={i} className="h-full bg-slate-900 rounded border border-slate-700/50 relative overflow-hidden">
                                                {build.ram && i < ramSticks && (
                                                    <motion.div 
                                                        initial={{ x: 50 }}
                                                        animate={{ x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* PCIE SLOTS / GPU */}
                                <div className="h-1/3 mt-2 relative">
                                    <div className="w-full h-2 bg-slate-700 rounded mb-3" />
                                    
                                    {build.gpu && (
                                        <motion.div 
                                            initial={{ x: -100, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-2 border-slate-500 rounded-r shadow-2xl z-40 flex items-center px-4"
                                        >
                                            <div className="flex-1 flex justify-between items-center">
                                                <span className="text-[8px] font-bold text-white tracking-widest uppercase">GPU</span>
                                                <div className="flex gap-1">
                                                    <Fan size={16} className={cn("text-slate-400", fansSpinning && "animate-spin")} />
                                                    <Fan size={16} className={cn("text-slate-400", fansSpinning && "animate-spin")} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* M.2 Slots */}
                                    {build.storage.length > 0 && build.storage[0].specs.interface.includes("M.2") && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute bottom-1 right-1 w-10 h-3 bg-black border border-green-500/50 rounded-sm flex items-center justify-center"
                                        >
                                            <span className="text-[5px] text-green-500">NVMe</span>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                        
                        {/* Layer 0.5: PSU (Bottom) */}
                        {build.psu && (
                            <motion.div 
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="absolute bottom-2 right-2 w-24 h-16 bg-slate-900 border-2 border-slate-600 rounded z-0 flex items-center justify-center shadow-inner"
                            >
                                 <Zap size={20} className="text-yellow-500" />
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
