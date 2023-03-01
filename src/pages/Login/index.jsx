import React, { useEffect } from "react";
import { login } from "../../api_helper/request";
import { UserContext } from "../../App";
import "./index.css";

export default function Login() {
  const [pseudo, setPseudo] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const userContext = React.useContext(UserContext);

  const handleLogin = async () => {
    setLoading(true);
    const _data = {
      pseudo,
    };
    const response = await login(_data);
    const { data } = response;
    const user = data?.data;
    setLoading(false);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      userContext.setUser(user);
    } else {
      alert("Impossible de se connecter");
    }
    setLoading(false);
  };

  return (
    <body>
      <div className="session">
        <div className="left"></div>
        <div className="log-in" autocomplete="off">
          <h4>Devinette de Mot</h4>
          <p>
            Bienvenu sur le jeu de devinette de mot. <br />
            Pour jouer, il vous suffit de rentrer votre pseudo!
          </p>
          <div className="floating-label">
            <input
              placeholder="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              name="email"
              id="email"
              autocomplete="off"
              required
            />
          </div>
          {loading ? (
            <button className="btn btn-primary" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleLogin}
              disabled={!pseudo}
            >
              Se connecter
            </button>
          )}
        </div>
      </div>
    </body>
  );
}
