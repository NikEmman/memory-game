function getUrl(searchText) {
  const apiKey = import.meta.env.VITE_FLICKR_API_KEY;
  const data = {
    method: "flickr.photos.search",
    api_key: apiKey,
    text: `${searchText}`,
    sort: "interestingness-desc",
    per_page: 12,
    license: "4",
    extras: "owner_name,license",
    format: "json",
    nojsoncallback: 1,
  };

  const parameters = new URLSearchParams(data);

  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  return url;
}
async function fetchPhotos(selection) {
  const photoData = await getData(selection);
  return photoData;
}

async function getData(selection) {
  const response = await fetch(getUrl(selection));
  const data = await response.json();
  return data;
}

export default fetchPhotos;
