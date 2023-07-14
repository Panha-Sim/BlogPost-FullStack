import "./login.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import axios from "axios";
import svg from "../svg/personLogin.svg"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:3001/auth",
    withCredentials: true,
    Headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 550);
  }, []);

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (err) {
      alert("wrong Credential");
    }
  }


  if (redirect) {
    return <Navigate to={"/"} />;
  }

  if (loading) {
    return <Loader />;
  } else {
    return (
      <form className="login" onSubmit={login}>
        <h1>Login:</h1>
        <img src={svg} alt="some file" />

        <input
          className="inputBar"
          type="string"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="inputBar"
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="loginButton" type="submit">
          Login
        </button>

        <Link>
          <p>Forgot Password?</p>
        </Link>
      </form>
    );
  }
}

export default Login;
