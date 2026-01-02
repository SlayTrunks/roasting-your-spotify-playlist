const token = 'BQBTFwUXuLQ-kPZ9Gi03mJtzL4coeoWA7H5GGlalIZNTfEVsmJ6wAIc6bVIypTJKsJe146_LWqR6Uj2xInBuPvtosE_l-m-qXOI7GEucVPA_kWgurv4nicGopz0Hb9BaKMmmJ22eQ30T-RM0snoAG28Qinam56sfhPs91t48Yt-G7w8vg247OE3MpR7M6X1m_IWypwsZNo21m1_Y1fMyVZ70pyBiTu9Dze8hxvSkCcZ3EQbtR3b1C1WcVU1iglFTHMzmXLogP402ZG33JxOzRChFnh5Fpy8KTs4SH7fWd-PEKCPOkVKdb0GBNYz1ut-yg3f3';
const uri = 'https://api.spotify.com'
async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`${uri}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}
const playlistDetails = await fetchWebApi("v1/playlists/4ohVEU4tKcIuZvcifURr7X", 'GET')
const total = playlistDetails.tracks.total

let data=[];

const moreData =  {
        name: playlistDetails.name,
        imageUrl: playlistDetails.images[0].url,
}
for (let i=0; i<total; i++) {
     let obj = {
         
        id:i,
        songName:playlistDetails.tracks.items[i].track.name,
        artists: playlistDetails.tracks.items[i].track.artists.map(item=>{
            return item.name
        })
    }
    data.push(obj)
}

const frontend = [moreData,{data:data}]
console.log(frontend)
