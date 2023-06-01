import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import ReadingBut from "./pages/ReadingBut";
import Genre from "./pages/Genre";
import Blogs from "./pages/Blogs";
import BlogPage from "./pages/BlogPage";
import SearchBlog from "./pages/SearchBlog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<ReadingBut />} />
        <Route path="/toGenre" element={<Genre />} />
        <Route path="/toGenre/:genre" element={<Blogs />} />
        <Route path="/toGenre/:genre/:_id" element={<BlogPage />} />
        <Route path="/search/:searchValue" element={<SearchBlog />} />
        <Route path="/create/:_id" element= {<Create/>} />
      </Routes>
    </div>
  );
}

export default App;
