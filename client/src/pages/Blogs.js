import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import "../components/Post.css";

export default function Blogs() {
  const { genre } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/get/${genre}`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setBlogs({ title: "no result" });
      });
  }, [genre]);

  if (loading) {
    return <loading />;
  } else {
    return (
      <div className="postContainer">
        {blogs.map((result) => {
          return <Post {...result} />;
        })}
      </div>
    );
  }
}
