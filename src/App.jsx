import { useEffect, useState } from "react";
import "./App.scss";

const howtosUrl = "https://edwardtanguay.netlify.app/share/howtos.json";

export const App = () => {
  const [howtos, setHowtos] = useState([]);

  const getHowtos = (_howtos, category = "react") => {
    return _howtos.filter(
      (m) => m.category.toLowerCase() === category.toLowerCase()
    );
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(howtosUrl);
      const _howtos = await response.json();
      setHowtos(_howtos);
    })();
  }, []);

  return (
    <div className="App">
      <h2>Fetch, filter and display data from an API</h2>
      <div>
        There are {getHowtos(howtos, "react").length} Howtos in this subject.
      </div>
      <ul>
        {getHowtos(howtos, "react").map((howto, index) => {
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
