import "./Create.css";
import {  useState } from "react";
import { genre } from "../components/GenreList.js";
import axios from "axios";
import { Navigate, useParams } from "react-router";

export default function Create() {

  const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    Headers: { "Content-Type": "application/json" },
  });


  const { _id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentGenre, setContentGenre] = useState([]);
  

  async function handleSubmit(e) {
    e.preventDefault();

    //post API
    try {
      const response = await api.post("/post", {
        title,
        genre: contentGenre,
        author: `${_id}`,
        body: content,
      });
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }else{
    //handle trying to write but not log in
    
  }

  return (
    <form className="CreateForm" onSubmit={handleSubmit}>
      <label>Title:</label>
      <textarea
        placeholder="  title Name..."
        rows={1}
        cols={50}
        onChange={(v) => {
          setTitle(v.target.value);
        }}
      />
      <br></br>
      <label>Genre: </label>
      <div>
        {genre.map((result) => {
          return (
            <>
              <input
                className="genreCheckbox"
                type="checkbox"
                value={result}
                name="genreList"
                onChange={(v) => {
                  setContentGenre([...contentGenre, v.target.value]);
                }}
              ></input>
              <label className="labelCheckbox">{result}</label>
            </>
          );
        })}
      </div>

      <br></br>
      <label>Content: </label>
      <textarea
        placeholder="  write body here..."
        rows={25}
        cols={50}
        onChange={(v) => {
          setContent(v.target.value);
        }}
      />

      <button className="SubmitButtom" type="submit">
        Submit
      </button>
    </form>
  );
}
