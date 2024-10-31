export default function Score({ successStreak, bestStreak }) {
  return (
    <>
      <div className="score">
        <p>
          Successful guesses:
          {successStreak === 0 ? (
            <span>{" " + successStreak}</span>
          ) : (
            " " + successStreak
          )}
        </p>
        <p> Best streak: {bestStreak}</p>
      </div>
    </>
  );
}
