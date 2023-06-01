import "./login.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:3001",
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

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          transform="rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
          </g>
        </svg>

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
