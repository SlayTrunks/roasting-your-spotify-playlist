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
console.log(frontend[1].data)
