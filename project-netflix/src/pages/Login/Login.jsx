import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { signup, login } from "../../firebase";

const Login = () => {
  const [signState, setSignState] = useState("Connexion");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    if (signState === "Connexion") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Inscription" ? (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Pseudo"
            />
          ) : (
            <></>
          )}
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Mot de passe"
          />
          <button onClick={user_auth} type="submit">
            {signState}
          </button>
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
