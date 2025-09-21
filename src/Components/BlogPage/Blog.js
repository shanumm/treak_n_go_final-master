import React from "react";
import { Link } from "react-router-dom";
import Allblog from "../AllBlog/Allblog";
import "./blog.css";
export default function Blog() {
  const img =
    "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg";
  const img2 =
    "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png";
  return (
    <div className="blog">
      <Allblog />
    </div>
  );
}
