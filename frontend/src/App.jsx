import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Link2, Ghost } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from './components/LoadingSpinner';
import RoastResult from './components/RoastResult';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleRoast = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    // Minimum loading time for effect
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const [response] = await Promise.all([
        axios.post('http://localhost:3000/roast', { playlist: inputUrl }),
        minLoadTime
      ]);

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Oops! Couldn't find that playlist. Make sure it's public and valid! 😅");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setInputUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8 flex flex-col items-center">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center mt-12 md:mt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-4 ring-1 ring-white/10 backdrop-blur-md">
            <Flame className="w-8 h-8 text-orange-500 mr-2" />
            <Ghost className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
            Roast My Playlist
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Paste your Spotify link and let our AI Judge <span className="text-white font-medium">ruthlessly</span> destroy your music taste.
            (with love 💖)
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleRoast}
              className="w-full max-w-xl space-y-6"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-25 group-hover:opacity-50 blur transition duration-500" />
                <div className="relative flex items-center bg-[#18181b] rounded-xl border border-white/10 p-2 focus-within:border-white/20 transition-colors">
                  <Link2 className="w-6 h-6 text-gray-500 ml-3" />
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Paste Spotify playlist link or ID here... 🎶"
                    className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 py-3 placeholder-gray-600"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!inputUrl}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Roast Me! 🔥
              </motion.button>
            </motion.form>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl mt-6 text-center"
            >
              {error}
            </motion.div>
          )}

          {result && !loading && (
            <RoastResult result={result} onReset={reset} />
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-auto py-8 text-center text-gray-600 text-sm">
        Made with 💀 by AI • Not affiliated with Spotify
      </footer>
    </div>
  );
}

export default App;
