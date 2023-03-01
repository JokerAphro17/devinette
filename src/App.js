import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { LettreCase } from "./components/LetterCase";
import { Game } from "./pages/Game";
import { generateSlug } from "random-word-slugs-fr";
import { Home } from "./pages/Home";

export const WordContext = React.createContext();
export const UserContext = React.createContext();
function App() {
  const [word, setWord] = useState(generateSlug(1));
  const changeWord = (callback) => {
    setWord(generateSlug(1));
    callback && callback();
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <WordContext.Provider value={{ word, changeWord }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Home />
        </div>
      </UserContext.Provider>
    </WordContext.Provider>
  );
}

export default App;
