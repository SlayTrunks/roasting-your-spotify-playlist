import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
    "Analyzing your questionable taste... 🤨",
    "Judging your guilty pleasures... 😳",
    "Trying to understand why you like this... 🤔",
    "Calculating cringe levels... 📉",
    "Consulting the music gods... ⚡",
    "Resisting the urge to delete this... 🗑️",
    "Finding the perfect insults... 😈",
    "Wondering who hurt you... 💔",
    "Scanning for TikTok trends... 📱",
    "Pretending to listen to the whole thing... 🎧",
    "Oh... oh no... 😬",
    "Searching for taste.exe (not found)... 💻",
    "Calling the fashion police... 🚨",
    "Analyzing 'sad boi' hours energy... 🌧️",
];

const LoadingSpinner = () => {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12">
            <div className="relative">
                {/* Outer glowing ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-transparent border-t-primary border-r-secondary blur-sm absolute"
                />
                {/* Inner spinner */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-white/20 border-t-white"
                />
                {/* Center emoji */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center text-3xl"
                >
                    🔥
                </motion.div>
            </div>

            <div className="h-8 relative w-full text-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={msgIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-lg font-medium text-gray-300 absolute w-full"
                    >
                        {LOADING_MESSAGES[msgIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LoadingSpinner;
