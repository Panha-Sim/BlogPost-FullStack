import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import "./SearchBlog.css"
import Post from "../components/Post"

export default function SearchBlog(){
    const [blogs,setBlogs] = useState([]);
    const {searchValue} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3001/blog/search/${searchValue}`).then((result)=>{
            setBlogs(result.data);
        })
    },[searchValue])
    
    return(
        <div>
            {blogs.map((result)=>{
                return(<div className="postContainer">
                    <Post {...result}/>
                </div>
                )
            })}
        </div>
    )
}