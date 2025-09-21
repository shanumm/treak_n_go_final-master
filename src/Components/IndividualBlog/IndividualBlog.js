import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./individualBlog.css";
import { useStateValue } from "../../StateProvider";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { client } from "../AllBlog/client";

export default function IndividualBlog() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [individualBlog, setIndividualBlog] = useState();
  const [isNotEditable, setIsNotEditable] = useState(true);
  const [testingBlog, setTestingBlog] = useState(null);

  const [allBlogsData, setAllBlogsData] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const [newAuthor, setNewAuthor] = useState(null);
  const { id } = useParams();
  const navigation = useNavigate();

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
                [BLOCKS.PARAGRAPH]: (node, children) => (
                  <p
                    className="individualBlogContentP"
                    style={{ margin: "1rem 0" }}
                  >
                    {children}
                  </p>
                ),
                [BLOCKS.HEADING_1]: (node, children) => (
                  <h1 style={{ margin: "1rem 0" }}>{children}</h1>
                ),
                [BLOCKS.HEADING_2]: (node, children) => (
                  <h2 style={{ margin: "1rem 0" }}>{children}</h2>
                ),
                [BLOCKS.HEADING_3]: (node, children) => (
                  <h3 style={{ margin: "1rem 0" }}>{children}</h3>
                ),
                [BLOCKS.UL_LIST]: (node, children) => (
                  <ul style={{ margin: "1rem 0" }}>{children}</ul>
                ),
                [BLOCKS.OL_LIST]: (node, children) => (
                  <ol style={{ margin: "1rem 0" }}>{children}</ol>
                ),
                [BLOCKS.LIST_ITEM]: (node, children) => (
                  <li style={{ margin: "1rem 0" }}>{children}</li>
                ),
                [BLOCKS.QUOTE]: (node, children) => (
                  <blockquote style={{ margin: "1rem 0" }}>
                    {children}
                  </blockquote>
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
                  return (
                    <img
                      style={{
                        borderRadius: "20px",
                        height: "25rem",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={imageUrl}
                      alt={altText}
                    />
                  );
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
        console.log(data, ">>>>");
        setTestingBlog(data);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
        setTestingBlog(null);
      }
    };

    getData();
  }, []);
  const getTime = (value) => {
    const timestamp = value;
    const date = new Date(timestamp);
    return date.toDateString();
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

  function extractTextFromHTML(content) {
    const mainString = extractMainStrings(content);
    return mainString;
  }

  return (
    testingBlog &&
    testingBlog
      .filter((blog) => blog.id === id)
      .map((blog) => (
        <div
          className="individualBlogCcontainer"
          style={{ background: "#F7F7F8", padding: "2rem", display: "flex" }}
        >
          <div className="individualBlog">
            <div className="individualBlogHeading">{blog.title}</div>
            <div>
              <div style={{ width: "90%", margin: ".4rem auto 2rem auto" }}>
                <img className="individualBlogMainImage" src={blog.mainImage} />
                <div style={{ marginTop: "1rem" }}>{blog?.content}</div>
              </div>
            </div>
            <div className="individualBlogBy">Author : {blog.author}</div>
            <div className="individualBlogTime">{getTime(blog?.date)}</div>
          </div>
          <div className="popularReads">
            <div className="popularReadsHeading">Popular Reads</div>
            <div>
              {testingBlog &&
                testingBlog
                  .filter((blog) => blog.id != id)
                  .map((b) => (
                    <div
                      style={{
                        cursor: "pointer",
                        background: "white",
                        padding: "1rem .5rem",
                        marginBottom: "20px",
                        borderRadius: "4px",
                      }}
                    >
                      <div>
                        <img
                          style={{
                            width: "100%",
                            height: "8rem",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                          src={b.mainImage}
                          alt=""
                          onError={(e) => {
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                      <div style={{ paddingTop: ".4rem ", color: "#ff5e00" }}>
                        {b.title}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          marginTop: "4px",
                          textDecoration: "underline",
                        }}
                      >
                        Author : {b?.author}
                      </div>

                      <div style={{ fontSize: "14px", marginTop: "4px" }}>
                        <p>
                          {extractTextFromHTML(b?.content).substring(0, 100)}...
                        </p>
                      </div>
                      <Link
                        onClick={() => {
                          setTimeout(() => {
                            window.location.reload();
                          }, 100);
                        }}
                        style={{ color: "#ff5e00" }}
                        to={`/blog/${b?.id}`}
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
                    </div>
                  ))}
            </div>
          </div>
        </div>
      ))
  );
}
