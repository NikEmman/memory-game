import getPhotoUrl from "./utils.js";

export default function Card({ photo }) {
  const url = getPhotoUrl(photo);
  return (
    <div className="card">
      <img src={url} alt={photo.title} />
    </div>
  );
}
