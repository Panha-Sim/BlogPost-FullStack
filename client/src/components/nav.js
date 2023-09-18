import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bootstrap from 'bootstrap'

export default function Nav() {
  const [searchValue, setSearchValue] = useState("");
  const [profile, setProfile] = useState(null);
  const [user, setuser] = useState({});
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:3001/auth",
    withCredentials: true,
    Headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data.username);
        setuser(response.data);
      } catch (err) {
        setProfile(null);
      }
    };
    getProfile();
  }, [api]);

  async function logout() {
    await api.post("/logout", { withCredentials: true });
    setProfile(null);
  }
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchValue}`);
    }
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <h1 className="big">BIG</h1>
      </Link>
      <div className="navLink">
        <input
          type="text"
          placeholder="Search..."
          name="text"
          class="input"
          onKeyDown={handleSearch}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Link to="/toGenre">Blog</Link>

        {profile && (
          <>
          
            <div className="dropdown">
              <Link to="/">{profile}</Link>    
              <Link to={`/create/${user._id}`}>
                <button>write</button>
              </Link>
            </div>

            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
        )}

        {!profile && (
          <>
            <Link className="loginButt" to="/login">
              login
            </Link>
            <Link className="registerbutt" to="/register">
              Create an Account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
