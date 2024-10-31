import getPhotoUrl from "./utils.js";

export default function Card({ photo, onCardClick }) {
  const url = getPhotoUrl(photo);
  return (
    <img id={photo.id} onClick={onCardClick} src={url} alt={photo.title} />
  );
}
