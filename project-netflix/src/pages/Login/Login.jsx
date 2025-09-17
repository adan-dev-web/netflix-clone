import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";

const Login = () => {
  const [signState, setSignState] = useState("Connexion");

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Inscription" ? (
            <input type="text" placeholder="Pseudo" />
          ) : (
            <></>
          )}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mot de passe" />
          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Se souvenir de moi</label>
            </div>
            <p>Besoin d'aide ?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Connexion" ? (
            <p>
              Nouveau sur Netflix ?{" "}
              <span onClick={() => setSignState("Inscription")}>
                Inscrivez-vous
              </span>
            </p>
          ) : (
            <p>
              Déjà un compte ?{" "}
              <span onClick={() => setSignState("Connexion")}>
                Connectez-vous
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
