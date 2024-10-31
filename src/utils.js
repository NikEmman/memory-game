export default function getPhotoUrl(photo) {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`;
}
