import { useEffect, useState } from "react";
import "./App.scss";

const howtosUrl = "https://edwardtanguay.netlify.app/share/howtos.json";

export const App = () => {
  const [howtos, setHowtos] = useState([]);

  useEffect(() => {
    const getReactHowtos = (_howtos, category = "react") => {
      return _howtos.filter(
        (m) => m.category.toLowerCase() === category.toLowerCase()
      );
    };

    (async () => {
      const response = await fetch(howtosUrl);
      let _howtos = await response.json();
      _howtos = getReactHowtos(_howtos, "react");
      setHowtos(_howtos);
    })();
  }, []);

  return (
    <div className="App">
      <h2>Fetch, filter and display data from an API</h2>
      <div>There are {howtos.length} React howtos.</div>
      <ul>
        {howtos.map((howto, index) => {
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
