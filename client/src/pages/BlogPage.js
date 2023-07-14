import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "./BlogPage.css"

export default function BlogPage() {
  const [blog, setBlog] = useState({});
  const { _id } = useParams();

// <Link to={goto/edit/${_id}}> Edit </Link>

//const{_id} = useParam();
//useEffect(()=>{axios.get(${_id})); fetch by id then
//populate the textarea wrap in form.
// when submit click use findbyIDandUpdate();


  useEffect(() => {
    axios.get(`http://localhost:3001/blog/get/id/${_id}`).then((response) => {
      setBlog(response.data);
    });
  }, [_id]);

  let formattedDate = "";
  if (blog.createdAt) {
    const date = new Date(blog.createdAt);
    formattedDate = format(date, "MMMM dd, yyyy");
  }

  let output='';
  if (blog.body) {
    output = blog.body.replace(/\/n/g, "<br>");
  }

  return (
    <article className="articleContainer">
      <time>{formattedDate}</time>
      <h1>{blog.title}</h1>
      <br></br>
      <h5>{blog.author}</h5>
      <br></br>
      <p dangerouslySetInnerHTML={{ __html: output }}></p>
    </article>
  );
}
