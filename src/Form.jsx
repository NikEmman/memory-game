export default function Form({ onClick }) {
  return (
    <div className="form">
      <label htmlFor="themes">Choose a theme: </label>

      <select name="themes" id="themes">
        <option value="Cats">Cats</option>
        <option value="excavators">Excavators</option>
        <option value="Dogs">Dogs</option>
        <option value="ducks">Ducks</option>
      </select>
      <button onClick={onClick}>Start Game!</button>
    </div>
  );
}
