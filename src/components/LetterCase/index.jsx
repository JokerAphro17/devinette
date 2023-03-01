import React from "react";
import "./index.css";

export const LettreCase = (props) => {
  const { letter, onClick, index } = props;
  return (
    <div className="letter-case" onClick={() => onClick && onClick(letter)}>
      <p>{letter}</p>
    </div>
  );
};
