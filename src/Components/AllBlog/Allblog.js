import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";

import "./allblog.css";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

const stripHTML = (html) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");
  return dom.body.textContent || "";
};
function extractTextFromHTML(content) {
  const outputData = JSON.parse(content);
  let extractedText = "";
  let firstImage = "";

  outputData.blocks.forEach((block) => {
    if (block.type === "paragraph") {
      extractedText += stripHTML(block.data.text) + " ";
    } else if (block.type === "image" && !firstImage) {
      firstImage = block.data.url || "";
    }
  });
  return { extractedText: extractedText.trim(), firstImage };
}

export default function Allblog() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [blogData, setBlogData] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const data = db
      .collection("Blogs")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.docs.forEach((doc) => {
          data.push(doc.data());
          if (data.length === snapshot.docs.length) {
            setBlogData(data);
          }
        });
      });
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBlogs(blogData);
    } else {
      let filtered = blogData.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, blogData]);

  const img =
    "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png";

  return (
    <div className="allblog">
      <div className="blogFilter">
        <div className="blogFilterHeading">Filter Blogs</div>
        <input
          type="text"
          placeholder="Search Blogs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <div className="blogContainer">
          <div className="topBlog">
            {filteredBlogs?.length > 0
              ? filteredBlogs?.map((b, i) => {
                  if (i === 0)
                    return (
                      <div className="topBlogContent">
                        <img
                          src={
                            extractTextFromHTML(b?.content).firstImage || img
                          }
                          alt=""
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = { img };
                          }}
                        />
                        <div className="topBlogContentContainer">
                          <div>
                            {b?.timestamp
                              ? formatDate(b.timestamp)
                              : "1 Jan 2023"}
                          </div>
                          <div>{b?.title}</div>
                          <div>
                            {extractTextFromHTML(b?.content)
                              .extractedText.substring(0, 500)
                              .split("\n")
                              .map((para, index) => (
                                <p key={index}>{para}</p>
                              ))}
                            <span>
                              <Link
                                style={{ color: "#ff5e00" }}
                                to={`/blog/${b?.title}`}
                              >
                                <button
                                  style={{
                                    color: "white",
                                    marginTop: "1rem",
                                    padding: "8px 12px",
                                    background: "#ff5e00",
                                    border: "none",
                                    overflow: "none",
                                    marginTop: "4px",
                                    borderRadius: "2px",
                                    marginTop:"1rem"
                                  }}
                                >
                                  {" "}
                                  Read more
                                </button>
                              </Link>
                            </span>
                          </div>
                          <div>Author : {b?.author}</div>
                        </div>
                      </div>
                    );
                })
              : "No Blogs Available"}
          </div>

          <div className="allOtherBlogs">
            {filteredBlogs?.length > 0 &&
              filteredBlogs?.map((b, i) => {
                if (i > 0)
                  return (
                    <div className="eachBlog">
                      <img
                        src={extractTextFromHTML(b?.content).firstImage || img}
                        alt=""
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = { img };
                        }}
                      />
                      <div>
                        <div>
                          <span style={{ color: "#ff5e00" }}>
                            {b?.author?.toUpperCase()}
                          </span>{" "}
                          -{" "}
                          {b?.timestamp
                            ? formatDate(b.timestamp)
                            : "1 Jan 2023"}
                        </div>

                        <div>{b?.title}</div>
                        <div>
                          {extractTextFromHTML(b?.content)
                            .extractedText.substring(0, 300)
                            .split("\n")
                            .map((para, index) => (
                              <p style={{ wordBreak: "break-all" }} key={index}>
                                {para}
                              </p>
                            ))}
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                          <Link to={`/blog/${b?.title}`}>
                            <button>Read more</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
