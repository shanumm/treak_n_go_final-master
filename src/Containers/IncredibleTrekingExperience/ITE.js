import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import TrekBanner from "../../Images/Trek BG banner 1.jpg";
import "./ite.css";
//Incredible Treking Experience
export default function ITE() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);

  const img1 =
    "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_960_720.jpg";
  const img2 =
    "https://cdn.pixabay.com/photo/2016/11/08/05/20/sunset-1807524_960_720.jpg";
  const img3 =
    "https://cdn.pixabay.com/photo/2019/08/28/12/20/fog-4436636_960_720.jpg";
  useEffect(() => {
    const data = db
      .collection("Blogs")
      .get()
      .then((snapshot) => {
        const data = [];

        snapshot.docs.forEach((doc) => {
          data.push(doc.data());
          console.log(doc.data(), ">>>>>>>>>");
          if (data.length === snapshot.docs.length) {
            setBlogData(data);
          }
        });
      });

    const text = document.querySelectorAll(".grid_images p");
    const textContainer = document.querySelector(".ite1");
    const width = window.innerWidth;

    if (width < 900) {
      text.forEach((t) => {
        t.innerHTML = t.innerHTML.substring(0, 70) + "...";
      });
    }
    if (width < 700) {
      textContainer.style.display = "none";
    }
  }, []);

  const handleBlogClick = (m) => {
    navigate(`/blog/${m.title}`);
  };

  const stripHTML = (html) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");
    return dom.body.textContent || "";
  };

  const extractParagraphs = (content) => {
    const outputData = JSON.parse(content);
    let extractedText = "";
    let firstImage = "";
    outputData.blocks.forEach((block) => {
      if (block.type === "paragraph") {
        extractedText += stripHTML(block.data.text) + " ";
      } else if (block.type === "image" && !firstImage) {
        firstImage = block.data.url;
      }
    });

    return { extractedText: extractedText.trim(), firstImage };
  };

  const getDate = (value) => {
    const timestamp = value;
    const date = new Date(timestamp);
    return date.toDateString();
  };

  return (
    <div className="ite">
      <div className="ite1">
        <div className="iteHeading">
          <span className="popularTreksHeading">
            Popular <span style={{ color: "black" }}>Blogs</span>
          </span>
        </div>
        <div style={{ color: "gray" }} className="iteSubHeading">
          Adventure Unleashed: Explore the Wild Side of Travel with Our
          Trailblazing Treks and Cozy Campstays!
        </div>
        <div className="iteBlogs">
          <div>
            {blogData
              ?.filter((m, index) => index < 3)
              .map((m, index) => {
                if (index === 0)
                  return (
                    <div
                      onClick={() => handleBlogClick(m)}
                      className="grid_images"
                    >
                      <img
                        src={extractParagraphs(m?.content).firstImage}
                        alt=""
                      />
                      <div
                        className={
                          index === 0
                            ? "grid_images_Content"
                            : index === 1
                            ? "grid_images_Content1"
                            : "grid_images_Content2"
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            color: "gray",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ fontSize: "12px", flex: "1" }}>
                            {getDate(m.uploadTime)}
                          </p>
                        </div>
                        <div
                          style={{
                            marginTop: "10px",
                            height: "80%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <h4 style={{ fontWeight: "500", fontSize: "18px" }}>
                            {m.title}
                          </h4>
                          <p
                            style={{
                              color: "gray",
                              fontSize: "14px",
                              wordBreak: "break-all",
                            }}
                          >
                            {extractParagraphs(m.content).extractedText
                              .length >= 100
                              ? extractParagraphs(
                                  m.content
                                ).extractedText.slice(0, 150) + "..."
                              : extractParagraphs(m.content).extractedText}
                          </p>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  );
              })}
          </div>
          <div>
            {blogData
              ?.filter((m, index) => index < 3 && index != 0)
              .map((m, index) => (
                <div onClick={() => handleBlogClick(m)} className="grid_images">
                  <img src={extractParagraphs(m?.content).firstImage} alt="" />
                  <div
                    className={
                      index === 0
                        ? "grid_images_Content"
                        : index === 1
                        ? "grid_images_Content1"
                        : "grid_images_Content2"
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        color: "gray",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "4px",
                        height: "10%",
                      }}
                    >
                      {/* <p>By : {m.author}</p> */}
                      <p style={{ fontSize: "12px" }}>
                        {getDate(m.uploadTime)}
                      </p>
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        height: "80%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h4 style={{ fontWeight: "500", fontSize: "18px" }}>
                        {m.title}
                      </h4>
                      <p
                        style={{
                          color: "gray",
                          flex: "1",
                          display: "grid",
                          marginTop: "6px",
                          fontSize: "14px",
                          wordBreak: "break-all",
                        }}
                      >
                        {extractParagraphs(m.content).extractedText.length >=
                        100
                          ? extractParagraphs(m.content).extractedText.slice(
                              0,
                              106
                            ) + "..."
                          : extractParagraphs(m.content).extractedText}
                      </p>
                      <button>Read More</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
