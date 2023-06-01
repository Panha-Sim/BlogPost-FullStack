import "./Genre.css";
import Card from "../components/Card.js";
import { Link } from "react-router-dom";
import {genre} from '../components/GenreList.js'
const Genre = () => {

  return (
    <div className="genreContainer">
      {genre.map((result) => {
        return (
          <>
            <Link to={`/toGenre/${result}`} style={{ textDecoration: 'none' }}><Card text={result} /></Link>
          </>
        );
      })}
    </div>
  );
};

export default Genre;
