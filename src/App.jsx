import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import fetchPhotos from "./data.js";
import Card from "./Card.jsx";
import Score from "./Score.jsx";
import { shuffleArray } from "./utils.js";
import Button from "./Button.jsx";

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
  const resetCounters = () => {
    setBestStreak(0);
    setGuesses([]);
    setSuccessStreak(0);
  };

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
      {showForm ? (
        <>
          <Form onClick={onFormClick}></Form>
          <div className="instructions">
            <h2>How to play</h2>
            <ul>
              <li>
                Select an item, images related to it will be pulled from online
                source.
              </li>
              <li>
                The goal is to click each image only once. Images are then
                shuffled
              </li>
              <li>
                A score keeps track of correct guesses and best attempt so far.
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Score successStreak={successStreak} bestStreak={bestStreak}></Score>

          <div className="cardContainer">
            {gotData ? cards : "Loading....."}
          </div>
          <div className="buttons">
            <Button onClick={resetSelection} text="Select new images"></Button>
            <Button onClick={resetCounters} text="Reset Score"></Button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
