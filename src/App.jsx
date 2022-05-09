import { useEffect, useState } from "react";
import "./App.scss";

const howtosUrl = "https://edwardtanguay.netlify.app/share/howtos.json";

export const App = () => {
  const [howtos, setHowtos] = useState([]);
  const [fieldInput, setFieldInput] = useState("react");

  const getHowtos = (_howtos, category) => {
    return _howtos.filter(
      (m) => m.category.toLowerCase() === category.toLowerCase()
    );
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(howtosUrl);
      const _howtos = await response.json();
      getHowtos(_howtos, fieldInput);
      setHowtos(_howtos);
    })();
  }, []);

  const handleFieldInput = (e) => {
    setFieldInput(e.target.value);
  };

  return (
    <div className="App">
      <h2>Fetch, filter and display data from an API</h2>

      <div className="inputField">
        <label className="labelHowtoSearch">Search in Howtos : </label>
        <input
          value={fieldInput}
          onChange={handleFieldInput}
          autoFocus
          type="text"
          id="inputField"
          placeholder="Search Howtos"
        />
      </div>
      <div>There are {getHowtos(howtos, fieldInput).length} Howtos.</div>
      <ul>
        {getHowtos(howtos, fieldInput).map((howto, index) => {
          return (
            <li key={index}>
              <a
                target="_blank"
                href={`https://edwardtanguay.netlify.app/howtos?id=${howto.id}`}
                rel="noreferrer"
              >
                {howto.category}: {howto.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
