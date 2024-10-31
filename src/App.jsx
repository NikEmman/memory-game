import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import fetchPhotos from "./data.js";
import Card from "./Card.jsx";
import { shuffleArray } from "./utils.js";

function App() {
  const [showForm, setShowForm] = useState(true);
  const [selection, setSelection] = useState("");
  const [photoData, setPhotoData] = useState(null);
  const [successStreak, setSuccessStreak] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [bestStreak, setBestStreak] = useState(0);

  const gotData = photoData !== null && photoData.stat === "ok";

  const onFormClick = () => {
    setShowForm(false);
    const selectedItem = document.getElementById("themes").value;
    setSelection(selectedItem);
    setSuccessStreak(0);
    setGuesses([]);
  };
  const onCardClick = (e) => {
    const id = e.target.id;
    if (guesses.includes(id)) {
      bestStreak < successStreak && setBestStreak(successStreak);
      setGuesses([]);
      setSuccessStreak(0);
    } else {
      setGuesses([...guesses, id]);
      setSuccessStreak(successStreak + 1);
      bestStreak < successStreak + 1 && setBestStreak(successStreak + 1);
    }
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

  const cards =
    gotData &&
    shuffleArray(
      photoData.photos.photo.map((photo) => (
        <Card key={photo.id} onCardClick={onCardClick} photo={photo}></Card>
      ))
    );

  return (
    <>
      <header>Memory Game!</header>
      <div className="score">
        <p>Successful guesses:{successStreak}</p>
        <p> Best streak: {bestStreak}</p>
      </div>
      {showForm ? (
        <Form onClick={onFormClick}></Form>
      ) : (
        <div className="cardContainer">{gotData ? cards : "Loading....."}</div>
      )}
      {!showForm && <button onClick={resetSelection}>Select new images</button>}
    </>
  );
}

export default App;
