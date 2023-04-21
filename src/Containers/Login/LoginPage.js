import React, { useState } from "react";
import "./LoginPage.css";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Nav from "../Navbar/Nav";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  // continue login and sign up

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <div class=" flex-r container">
        <div class="flex-r login-wrapper">
          <div class="login-text">
            <div class="logo">
              <span>
                <i class="fab fa-speakap"></i>
              </span>
              <span></span>
            </div>
            <h1>Sign Up</h1>
            <p>It's not long before you embark on this journey! </p>

            <form class="flex-c">
              <div class="input-box">
                <span class="label">E-mail</span>
                <div class=" flex-r input">
                  <input
                    type="text"
                    placeholder="name@abc.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i class="fas fa-at"></i>
                </div>
              </div>

              <div class="input-box">
                <span class="label">Password</span>
                <div class="flex-r input">
                  <input
                    type="password"
                    placeholder="8+ (a, A, 1, #)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i class="fas fa-lock"></i>
                </div>
              </div>

              <div class="check">
                <input type="checkbox" name="" id="" />
                <span>I've read and agree with T&C</span>
              </div>

              <input
                class="btn"
                onClick={login}
                type="submit"
                value="Sign In"
              />
              <span class="extra-line">
                <span>Don't have an account?</span>
                <a href="#" onClick={register}>
                  Sign Up
                </a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
