import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import "./allblog.css";
import { client } from "./client";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

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

function extractTextFromHTML(content) {
  const mainString = extractMainStrings(content);
  return mainString;
}

export default function Allblog() {
  const [testingBlog, setTestingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

        setTestingBlog(data);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
        setTestingBlog(null);
      }
    };

    getData();
  }, []);

  const Loader = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "3px solid #ff5e00",
        margin: "2rem auto",
      }}
      className="loader"
    ></div>
  );

  const img =
    "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png";

  return testingBlog ? (
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
            <div className="topBlogContent">
              <img
                src={testingBlog[0].mainImage}
                alt=""
                onError={(e) => {
                  e.target.onerror = null;
                }}
              />
              <div className="topBlogContentContainer">
                <div>
                  <span className="showOnSmall" style={{ color: "#ff5e00" }}>
                    {testingBlog[0]?.author?.toUpperCase()} -{" "}
                  </span>
                  {testingBlog[0]?.date
                    ? formatDate(testingBlog[0].date)
                    : "1 Jan 2023"}
                </div>
                <div>{testingBlog[0]?.title}</div>
                <div>
                  <p>
                    {extractTextFromHTML(testingBlog[0]?.content).substring(
                      0,
                      600
                    )}
                    ...
                  </p>
                  <span>
                    <Link
                      style={{ color: "#ff5e00" }}
                      to={`/blog/${testingBlog[0]?.id}`}
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
                          marginTop: "1rem",
                        }}
                      >
                        {" "}
                        Read more
                      </button>
                    </Link>
                  </span>
                </div>
                <div
                  className="hideAuthorOnSmall"
                  style={{ fontSize: "13px", marginTop: "6px" }}
                >
                  Author : {testingBlog[0]?.author}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="blogContainer">
          <div className="allOtherBlogs">
            {testingBlog?.length > 0 &&
              testingBlog?.map((b, i) => {
                if (i > 0)
                  return (
                    <div className="eachBlog">
                      <img
                        src={b.mainImage}
                        alt=""
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = img;
                        }}
                      />
                      <div>
                        <div>
                          <span style={{ color: "#ff5e00" }}>
                            {b?.author?.toUpperCase()}
                          </span>{" "}
                          - {b?.date ? formatDate(b.date) : "1 Jan 2023"}
                        </div>

                        <div>{b?.title}</div>
                        <div>
                          <p>
                            {extractTextFromHTML(b?.content).substring(0, 300)}
                          </p>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                          <Link to={`/blog/${b?.id}`}>
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
  ) : null;
}
