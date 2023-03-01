import React from "react";
import { LettreCase } from "../LetterCase";

export const VoidCase = (props) => {
  const { word, letterClickeds } = props;

  console.log(letterClickeds);
  return (
    <>
      {word.map((letter, index) => (
        <LettreCase letter={letterClickeds[index] || ""} key={index} />
      ))}
    </>
  );
};
