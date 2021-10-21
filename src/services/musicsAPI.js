const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`,
  { mode: 'cors', method: 'post', headers: { 'access-control-allow-origin': 'https://ply3r.github.io/trybe-tunes/' } });
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
