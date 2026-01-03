import React from 'react';
import { motion } from 'framer-motion';
import { Music, RefreshCw } from 'lucide-react';

const RoastResult = ({ result, onReset }) => {
    if (!result) return null;

    const { roast, playlistName, imageUrl, totalSongs, topArtists } = result;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto space-y-8"
        >
            <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                    {/* Playlist Cover */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="shrink-0"
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={playlistName}
                                className="w-48 h-48 rounded-2xl shadow-lg object-cover ring-2 ring-white/10"
                            />
                        ) : (
                            <div className="w-48 h-48 rounded-2xl bg-white/5 flex items-center justify-center ring-2 ring-white/10">
                                <Music className="w-16 h-16 text-white/20" />
                            </div>
                        )}
                    </motion.div>

                    {/* Stats & Info */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {playlistName || "Unknown Playlist"}
                        </h2>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <span className="font-semibold text-primary">{totalSongs || 0}</span> Songs
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <span className="font-semibold text-primary">Top:</span> {topArtists || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Roast */}
                <div className="mt-8 space-y-4">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                            <span className="text-2xl">🔥</span> The Verdict
                        </h3>
                        <div className="text-lg leading-relaxed text-gray-200 space-y-4 whitespace-pre-wrap">
                            {roast.split('**').map((part, index) =>
                                index % 2 === 1 ? (
                                    <strong key={index} className="text-white font-bold">{part}</strong>
                                ) : (
                                    part
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center"
            >
                <button
                    onClick={onReset}
                    className="group flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
                >
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Roast Another One
                </button>
            </motion.div>
        </motion.div>
    );
};

export default RoastResult;
