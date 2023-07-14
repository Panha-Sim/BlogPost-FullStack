import "./login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const api = axios.create({
  baseURL: "http://localhost:3001/auth",
  withCredentials: true,
  Headers: { "Content-Type": "application/json" },
})

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 550);
  }, []);

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await api.post("/register", {username, password});
      if(response.status === 200){
        setRedirect(true);
      }
    } catch (err) {
      alert("user exist");
    }
  }

if(redirect){
  return <Navigate to={'/login'}/>
}


  if (loading) {
    return <Loader />;
  } else {
    return (
      <form className="login" onSubmit={register}>
        <h1>Register:</h1>
        <svg
          fill="#000000"
          width="64px"
          height="64px"
          viewBox="0 0 16 16"
          id="register-16px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              id="Path_184"
              data-name="Path 184"
              d="M57.5,41a.5.5,0,0,0-.5.5V43H47V31h2v.5a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5V31h2v.5a.5.5,0,0,0,1,0v-1a.5.5,0,0,0-.5-.5H55v-.5A1.5,1.5,0,0,0,53.5,28h-3A1.5,1.5,0,0,0,49,29.5V30H46.5a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-2A.5.5,0,0,0,57.5,41ZM50,29.5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5V31H50Zm11.854,4.646-2-2a.5.5,0,0,0-.708,0l-6,6A.5.5,0,0,0,53,38.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.354-.146l6-6A.5.5,0,0,0,61.854,34.146ZM54,40V38.707l5.5-5.5L60.793,34.5l-5.5,5.5Zm-2,.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,40.5Zm0-3a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,37.5ZM54.5,35h-5a.5.5,0,0,1,0-1h5a.5.5,0,0,1,0,1Z"
              transform="translate(-46 -28)"
            ></path>{" "}
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
        <button type="submit" className="loginButton">
          Register
        </button>
        <p>Already have an account?</p>
        <Link to="/login">
          <p>login</p>
        </Link>
      </form>
    );
  }
}

export default Register;
