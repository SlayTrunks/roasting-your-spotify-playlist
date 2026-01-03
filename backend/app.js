import express from "express";
import dotenv from 'dotenv';
import cors from "cors"
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

// Put your keys here (or better, use dotenv)
const SPOTIFY_TOKEN = process.env.SPOTIFY_TOKEN 
const GEMINI_API_KEY = process.env.GEMINI_API_KEY 
console.log({SPOTIFY_TOKEN,GEMINI_API_KEY})

const uri = 'https://api.spotify.com/v1';

async function fetchWebApi(endpoint, method = 'GET', body = null) {
    const res = await fetch(`${uri}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${SPOTIFY_TOKEN}`,
            'Content-Type': 'application/json'
        },
        method,
        body: body ? JSON.stringify(body) : null
    });
    if (!res.ok) throw new Error(`Spotify error: ${res.status}`);
    return await res.json();
}

function getPlaylistId(input) {
    if (!input.includes('spotify.com')) return input;
    const match = input.match(/playlist\/([a-zA-Z0-9]+)(\?|$)/);
    return match ? match[1] : null;
}

// Home route
app.get("/", (req, res) => {
    res.json({ hi: "hi, send POST to /roast with { playlist: 'link or id' }" });
});

// Now POST instead of GET
app.post('/roast', async (req, res) => {
    const { playlist } = req.body; // ← Now from body, not query

    if (!playlist) {
        return res.status(400).json({ error: 'Missing "playlist" in request body' });
    }

    console.log("Received playlist:", playlist);

    try {
        const playlistId = getPlaylistId(playlist);
        const playlistDetails = await fetchWebApi(`playlists/${playlistId}`);

        const total = playlistDetails.tracks.total;
        let allTracks = playlistDetails.tracks.items;

        // Pagination
        let offset = 100;
        while (offset < total && offset < 300) {
            const more = await fetchWebApi(`playlists/${playlistId}/tracks?offset=${offset}&limit=100`);
            allTracks = allTracks.concat(more.items);
            offset += 100;
        }

        let data = [];
        for (let i = 0; i < allTracks.length; i++) {
            if (!allTracks[i].track) continue;
            let obj = {
                id: i,
                songName: allTracks[i].track.name,
                artists: allTracks[i].track.artists.map(item => item.name)
            };
            data.push(obj);
        }

        // Artist counting
        const artistCount = {};
        data.forEach(track => {
            track.artists.forEach(artist => {
                artistCount[artist] = (artistCount[artist] || 0) + 1;
            });
        });

        const topArtists = Object.entries(artistCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => `${name} (${count} songs)`)
            .join(', ') || 'Varied artists';

        const sampleSongs = data.map(track =>
            `${track.songName} by ${track.artists.join(', ')}`
        ).join('\n- ');

        const moreData = {
            name: playlistDetails.name,
            imageUrl: playlistDetails.images[0]?.url || '',
        };


        // Prompt stays the same
        const prompt = `
You are a savage but funny music roaster. Roast this Spotify playlist in a hilarious way.
Playlist name: ${moreData.name}
Total songs: ${data.length}
Top artists: ${topArtists}
songs: ${sampleSongs}
Make it funny, exaggerated, and playful. Start with the playlist name, call out obsessions, guess their personality, add memes or references, and end with fake advice. 300-500 words. Use bullet points or paragraphs.
`;

        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9 }
        });

        const roast = response.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't generate roast :(";

        res.json({
            roast: roast,
            playlistName: moreData.name,
            imageUrl: moreData.imageUrl,
            totalSongs: data.length,
            topArtists: topArtists
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
    console.log('Send POST request to /roast with JSON body: { "playlist": "your_link_or_id" }');
});
