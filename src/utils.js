export default function getPhotoUrl(photo) {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`;
}
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
