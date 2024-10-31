// import { useState, useEffect } from "react";
// import "./App.css";
// import Form from "./Form";
// import fetchPhotos from "./data.js";

// function App() {
//   const [showForm, setShowForm] = useState(true);
//   const [selection, setSelection] = useState("");
//   const [photoData, setPhotoData] = useState(false);

//   const gotData = photoData && photoData.stat === "ok";
//   let cards = "Here are your cards";

//   const onClick = () => {
//     setShowForm(false);
//     const selectedItem = document.getElementById("themes").value;
//     setSelection(selectedItem);
//   };

//   useEffect(() => {
//     const photos = fetchPhotos(selection);
//     setPhotoData(photos);
//   }, [selection, showForm]);
//   return (
//     <>
//       <header>Memory Game!</header>
//       {showForm ? (
//         <Form onClick={onClick}></Form>
//       ) : (
//         <div className="cardContainer">
//           {gotData ? cards : "No photos found. Try reloading the page!"}
//         </div>
//       )}
//     </>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import fetchPhotos from "./data.js";
import getPhotoUrl from "./utils.js";

function App() {
  const [showForm, setShowForm] = useState(true);
  const [selection, setSelection] = useState("");
  const [photoData, setPhotoData] = useState(null);

  const gotData = photoData !== null && photoData.stat === "ok";

  let cards =
    gotData &&
    photoData.photos.photo.map((photo) => {
      const url = getPhotoUrl(photo);
      return <img key={photo.id} src={url} alt={photo.title} />;
    });

  const onClick = () => {
    setShowForm(false);
    const selectedItem = document.getElementById("themes").value;
    setSelection(selectedItem);
  };

  useEffect(() => {
    const getPhotos = async () => {
      if (selection) {
        const photos = await fetchPhotos(selection);
        setPhotoData(photos);
      }
    };
    getPhotos();
  }, [selection, showForm]);

  const resetSelection = () => setShowForm(true);

  return (
    <>
      <header>Memory Game!</header>
      {showForm ? (
        <Form onClick={onClick}></Form>
      ) : (
        <div className="cardContainer">{gotData ? cards : "Loading....."}</div>
      )}
      {!showForm && <button onClick={resetSelection}>Select new images</button>}
    </>
  );
}

export default App;
