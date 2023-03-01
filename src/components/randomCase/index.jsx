import React, { useEffect } from "react";
import { WordContext } from "../../App";
import { LettreCase } from "../LetterCase";

export const RandomCase = (props) => {
  const { word, handleLetterClick, removeLetter, setRandomLetters } = props;
  const _wordContext = React.useContext(WordContext);

  useEffect(() => {
    setRandomLetters(
      _wordContext.word
        .toUpperCase()
        .split("")
        .sort(() => Math.random() - 0.5)
    );
  }, [_wordContext.word, setRandomLetters]);

  const onLetterClick = (letter) => {
    handleLetterClick(letter);
    removeLetter(letter);
  };

  return (
    <>
      {word.map((letter, index) => (
        <LettreCase letter={letter} onClick={onLetterClick} key={index} />
      ))}
    </>
  );
};

export default RandomCase;
