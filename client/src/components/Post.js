import { Link } from "react-router-dom";
import "./Post.css";
import { format } from "date-fns";

export default function Post({ _id, genre, title, author, body, createdAt }) {
  return (

    <div className="post">
      <Link to={`/toGenre/${genre}/${_id}`}>
        <h1>{title}</h1>
      </Link>
      <br></br>
      <time>{format(new Date(createdAt), "dd-MMM-yyyy")}</time>
      <br></br><br></br>
      <p>{body}</p>
    </div>


  );
}
