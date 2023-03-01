import React, { useContext, useEffect } from "react";
import { newScore } from "../../api_helper/request";
import { UserContext, WordContext } from "../../App";
import { LettreCase } from "../../components/LetterCase";
import { RandomCase } from "../../components/randomCase";
import { Table } from "../../components/Table";
import { VoidCase } from "../../components/VoidCase";
import { helpers } from "../../function_helpers";

export const Game = () => {
  const randomWorState = useContext(WordContext);
  const userContext = useContext(UserContext);

  console.log("le mot est", randomWorState.word);

  const word = randomWorState.word.toUpperCase().split("");
  const _word = randomWorState.word.toUpperCase().split("");

  const [letterClickeds, setLettersClicked] = React.useState([]);
  const [randomLetters, setRandomLetters] = React.useState(
    randomWorState.word
      .toUpperCase()
      .split("")
      .sort(() => Math.random() - 0.5)
  );
  const [party, setParty] = React.useState({
    finished: false,
    tries: 0,
    won: false,
  });

  const [message, setMessage] = React.useState({
    text: "",
    type: "",
  });

  useEffect(() => {
    finishHandler();
  }, [letterClickeds]);

  useEffect(() => {
    if (party.finished) {
      if (party.won) {
        setMessage({
          text:
            "Bravo, vous avez trouvé le mot exact " +
            word.join("") +
            "!" +
            " Vous avez gagné " +
            helpers.getScore(party.tries) +
            " points",
          type: "success",
        });
      } else {
        setMessage({
          text: "Dommage, mot incorrect, ressayer",
          type: "error",
        });
      }
    }
  }, [party.finished, party.won]);

  const finishHandler = () => {
    if (letterClickeds.length === word.length) {
      if (letterClickeds.join("") === word.join("")) {
        setParty({
          won: true,
          finished: true,
          tries: party.tries + 1,
        });
        handleWin();
      } else {
        setTimeout(() => {
          setMessage({ ...message, text: "", type: "" });
        }, 3500);
        setRandomLetters(
          randomWorState.word
            .toUpperCase()
            .split("")
            .sort(() => Math.random() - 0.5)
        );
        setLettersClicked([]);
        setParty({
          tries: party.tries + 1,
          won: false,
          finished: true,
        });
      }
    }
  };

  useEffect(() => {
    if (party.finished && party.won) {
      handleWin();
    }
  }, [party.finished, party.won]);

  const handleLetterClick = (letter) => {
    setLettersClicked([...letterClickeds, letter]);
  };

  const handleRandomLetterClick = (letter) => {
    const index = randomLetters.indexOf(letter);
    if (index > -1) {
      randomLetters.splice(index, 1);
    }
    setRandomLetters([...randomLetters]);
  };

  const restartGame = () => {
    setLettersClicked([]);
    setParty({ ...party, finished: false, won: false, tries: 0 });
    setMessage({ ...message, text: "", type: "" });
    randomWorState.changeWord(() => {
      const _word = randomWorState.word
        .toUpperCase()
        .split("")
        .sort(() => Math.random() - 0.5);
      setRandomLetters(_word);
    });
  };

  const handleWin = async () => {
    const score = helpers.getScore(party.tries);
    await newScore(userContext.user.id, score + userContext.user.score);
    userContext.setUser({
      ...userContext.user,
      score: score + userContext.user.score,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userContext.user,
        score: score + userContext.user.score,
      })
    );
  };

  const quit = () => {
    userContext.setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="game">
      <div className="left-side">
        <div className="user">
          <div className="user__name">
            <p>{userContext.user.pseudo}</p>
          </div>
          <div className="user__score">
            <p>Score: {userContext.user.score}</p>
          </div>
          <div className="buttons">
            <button
              className="button_new_word"
              onClick={restartGame}
              style={{ marginRight: "10px" }}
            >
              Nouveau mot
            </button>
            <button
              className="button_quit"
              onClick={quit}
              style={{ marginRight: "10px" }}
            >
              Quitter
            </button>
          </div>
        </div>
      </div>
      <div className="game__header">
        <div className="game__header__title">
          <h1>Devinette de Mot</h1>
        </div>
        <div className="game__header__score">
          <p>Nombre d'essais: {party.tries}</p>
        </div>
      </div>
      <div className="game__body">
        <div className="game">
          <p>___</p>
        </div>
        <div className="game__body_case1">
          <VoidCase word={word} letterClickeds={letterClickeds} />
        </div>
        <div className="game__body_message">
          <div className={`message ${message.type}`} style={{ margin: "10px" }}>
            <p>{message.text}</p>
          </div>
          {party.finished && party.won && (
            <button className="button-yellow" onClick={restartGame}>
              Nouvelle partie
            </button>
          )}
        </div>
        <div className="game__body_case1">
          <RandomCase
            handleLetterClick={handleLetterClick}
            letterClickeds={letterClickeds}
            word={randomLetters}
            setRandomLetters={setRandomLetters}
            removeLetter={handleRandomLetterClick}
          />
        </div>
        <div className="game__body_table">
          <Table />
        </div>
      </div>
    </div>
  );
};
