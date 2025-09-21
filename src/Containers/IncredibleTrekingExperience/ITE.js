import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import TrekBanner from "../../Images/Trek BG banner 1.jpg";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
// import { client } from "src/Components/AllBlog/client.js";
import { client } from "../../Components/AllBlog/client.js";
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
  // useEffect(() => {
  //   const data = db
  //     .collection("Blogs")
  //     .get()
  //     .then((snapshot) => {
  //       const data = [];
  //       snapshot.docs.forEach((doc) => {
  //         data.push(doc.data());
  //         if (data.length === snapshot.docs.length) {
  //           console.log(data);
  //           setBlogData(data);
  //         }
  //       });
  //     });

  //   const text = document.querySelectorAll(".grid_images p");
  //   const textContainer = document.querySelector(".ite1");
  //   const width = window.innerWidth;

  //   if (width < 900) {
  //     text.forEach((t) => {
  //       t.innerHTML = t.innerHTML.substring(0, 70) + "...";
  //     });
  //   }
  //   if (width < 700) {
  //     textContainer.style.display = "none";
  //   }
  // }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await client.getEntries({ content_type: "blog" });
        const data = [];

        for (const item of response.items) {
          let blogObject = {
            author: item.fields.author,
            date: item.fields.date,
            title: item.fields.title,
            mainImage: item.fields.mainImage.fields.file.url,
            id: item.sys.id,
          };

          try {
            const richTextField = item.fields.blogField;

            // Parse and render the rich text content
            const options = {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
                [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
                [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
                [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
                [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
                [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
                [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
                [BLOCKS.QUOTE]: (node, children) => (
                  <blockquote>{children}</blockquote>
                ),
                [INLINES.HYPERLINK]: (node, children) => (
                  <a
                    href={node.data.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                [BLOCKS.EMBEDDED_ASSET]: (node) => {
                  const { title, description, file } = node.data.target.fields;
                  const imageUrl = file.url;
                  const altText = description || title;
                  return <img src={imageUrl} alt={altText} />;
                },
              },
              renderMark: {
                [MARKS.BOLD]: (text) => <strong>{text}</strong>,
                [MARKS.ITALIC]: (text) => <em>{text}</em>,
                [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
              },
            };

            const renderedContent = documentToReactComponents(
              richTextField,
              options
            );

            blogObject.content = renderedContent;
            data.push(blogObject);
          } catch (error) {
            console.error("Error fetching data from Contentful:", error);
          }
        }

        setBlogData(data);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
        setBlogData(null);
      }
    };

    getData();
  }, []);

  const handleBlogClick = (m) => {
    navigate(`/blog/${m?.id}`);
  };
  const extractMainStrings = (data) => {
    let mainString = "";
    data.forEach((item) => {
      if (item.props && Array.isArray(item.props.children)) {
        item.props.children.forEach((child) => {
          if (typeof child === "string" && child.trim() !== "") {
            mainString += child.trim() + " ";
          }
        });
      } else if (
        typeof item.props.children === "string" &&
        item.props.children.trim() !== ""
      ) {
        mainString += item.props.children.trim() + " ";
      }
    });

    return mainString.trim();
  };

  function extractParagraphs(content) {
    const mainString = extractMainStrings(content);
    return mainString;
  }

  // const stripHTML = (html) => {
  //   const parser = new DOMParser();
  //   const dom = parser.parseFromString(html, "text/html");
  //   return dom.body.textContent || "";
  // };

  // const extractParagraphs = (content) => {
  //   console.log(content, ">.......");
  //   const outputData = JSON.parse(content);
  //   let extractedText = "";
  //   let firstImage = "";
  //   outputData.blocks.forEach((block) => {
  //     if (block.type === "paragraph") {
  //       extractedText += stripHTML(block.data.text) + " ";
  //     } else if (block.type === "list") {
  //       extractedText +=
  //         stripHTML(block.data.items[0] + ":" + block.data.items[1]) + " ";
  //     } else if (block.type === "image" && !firstImage) {
  //       firstImage = block.data.url;
  //     }
  //   });

  //   return { extractedText: extractedText.trim(), firstImage };
  // };

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
                      <img src={m.mainImage} alt="" />
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
                            {getDate(m.date)}
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
                            {extractParagraphs(m.content).length >= 100
                              ? extractParagraphs(m.content).slice(
                                  0,
                                  window.innerWidth < 768 ? 80 : 150
                                ) + "..."
                              : extractParagraphs(m.content)}
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
                  <img src={m.mainImage} alt="" />
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
                      <p style={{ fontSize: "12px" }}>{getDate(m.date)}</p>
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
                        {extractParagraphs(m.content).length >= 100
                          ? extractParagraphs(m.content).slice(
                              0,
                              window.innerWidth < 768 ? 80 : 106
                            ) + "..."
                          : extractParagraphs(m.content)}
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
