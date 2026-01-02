// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBTFwUXuLQ-kPZ9Gi03mJtzL4coeoWA7H5GGlalIZNTfEVsmJ6wAIc6bVIypTJKsJe146_LWqR6Uj2xInBuPvtosE_l-m-qXOI7GEucVPA_kWgurv4nicGopz0Hb9BaKMmmJ22eQ30T-RM0snoAG28Qinam56sfhPs91t48Yt-G7w8vg247OE3MpR7M6X1m_IWypwsZNo21m1_Y1fMyVZ70pyBiTu9Dze8hxvSkCcZ3EQbtR3b1C1WcVU1iglFTHMzmXLogP402ZG33JxOzRChFnh5Fpy8KTs4SH7fWd-PEKCPOkVKdb0GBNYz1ut-yg3f3';
const uri = 'https://api.spotify.com'
let trackUri
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`${uri}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}
const playlistDetails = await fetchWebApi("v1/playlists/4ohVEU4tKcIuZvcifURr7X",'GET')
// playlistDetails.tracks.items.map(item=>{
//     console.log(item)
// })
// console.log(playlistDetails.tracks.items[0].track.name)
const artist = playlistDetails.tracks.items[0].track.artists[0].name
console.log(artist)

// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`${uri}/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }
//
// const userDetails = await fetchWebApi("v1/me",'GET')
//
// async function getPlaylist(endpoint,method) {
//     const response = await fetch(`${uri}/${endpoint}`,{
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         method,
//     });
//     return await response.json()
// }
//
// const playlists = await getPlaylist(`v1/users/${userDetails.id}/playlists`,"GET")
// if(playlists.total > 0){
//     trackUri = playlists.items[0].tracks.href
// }else{
//     console.log("no playlist to show")
// }
//
// async function getTracks(endpoint,method) {
//     const response = await fetch(`${endpoint}`,{
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         method,
//     });
//     return await response.json()
// }
//
// const tracks = await getTracks(`${trackUri}`,"GET")
// console.log(tracks.items[0].track.name)
//
//
//































// async function getTopTracks(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
//   )).items;
// }
//
// const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );
