import React from "react";
import { UserContext } from "../../App";
import { Game } from "../Game";
import Login from "../Login";

export const Home = () => {
  const userContext = React.useContext(UserContext);

  if (!userContext.user) {
    return <Login />;
  }

  return (
    <>
      <Game />
    </>
  );
};
