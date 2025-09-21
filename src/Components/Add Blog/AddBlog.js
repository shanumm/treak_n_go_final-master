import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Underline from "@editorjs/underline";
import LinkAutocomplete from "@editorjs/link-autocomplete";
import Hyperlink from "editorjs-hyperlink";
import InlineSpoilerTool from "editorjs-inline-spoiler-tool";
import AnyButton from "editorjs-button";

import ChangeCase from "editorjs-change-case";
import Tooltip from "editorjs-tooltip";
import Strikethrough from "@sotaproject/strikethrough";
import TextColorPlugin from "editorjs-text-color-plugin";
import InlineImage from "editorjs-inline-image";
// index.js
// import "@editorjs/editorjs/dist/editor.min.css";
// index.js

import { db, storage } from "../../firebase";
import "./addblog.css";
import ReactQuill from "react-quill";
export default function AddBlog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuther, setBlogAuther] = useState("");
  const [editorData, setEditorData] = useState();
  const [loading, setLoading] = useState(false);
  const addBlog = async () => {
    setLoading(true);
    if (blogTitle && blogAuther && editorData) {
      try {
        const currentTime = Date.now(); // Current time in milliseconds

        // Check if the editorData contains undefined values
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`blog/${blogTitle.trim()}`);
        fileRef
          .putString(
            JSON.stringify({
              title: blogTitle,
              author: blogAuther,
              content: JSON.stringify(editorData),
              uploadTime: currentTime,
            })
          )
          .then(() => {
            setBlogTitle("");
            setBlogAuther("");
            // await editorRef.current.clear();

            alert("Blog added successfully!");
          })
          .catch((err) => {
            console.error("Error adding blog: ", err);
            alert("Failed to add blog. Please try again.");
          })
          .finally(() => {
            setLoading(false);
            localStorage.removeItem("blogdraft");
          });

        //   await db
        //     .collection("Blogs")
        //     .doc(blogTitle.trim())
        //     .set({
        //       title: blogTitle,
        //       author: blogAuther,
        //       content: JSON.stringify(editorData),
        //       uploadTime: currentTime,
        //     });

        //   // Reset the form fields after a successful submission
        //   setBlogTitle("");
        //   setBlogAuther("");
        //   // await editorRef.current.clear();

        //   alert("Blog added successfully!");
      } catch (error) {
        console.error("Error adding blog: ", error);
        alert("Failed to add blog. Please try again.");
      } finally {
        setLoading(false);
        localStorage.removeItem("blogdraft");
      }
    } else {
      alert("Please fill out all fields before submitting.");
      setLoading(false);
    }
  };

  const editorRef = useRef();

  useEffect(() => {
    if (
      editorRef.current === null ||
      editorRef.current === "undefined" ||
      editorRef.current === undefined
    ) {
      initiator();
    }

    return () => {
      editorRef?.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  const initiator = () => {
    let initialContent = {}; // Initialize initialContent as an empty object
    if (localStorage.getItem("blogdraft")) {
      initialContent = JSON.parse(localStorage.getItem("blogdraft"));
    }
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      data: initialContent,
      onReady: () => {
        console.log("Ready");
        editorRef.current = editor;
      },
      tools: {
        image: {
          class: InlineImage,
          inlineToolbar: true,
          config: {
            embed: {
              display: true,
            },
            unsplash: {
              appName: "your_app_name",
              clientId: "your_client_id",
            },
          },
        },
        header: {
          type: "header",
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6],
          },
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
        },
        delimiter: {
          class: Delimiter,
          inlineToolbar: true,
        },
        marker: {
          class: Marker,
          inlineToolbar: true,
        },
        inlineCode: {
          class: InlineCode,
          inlineToolbar: true,
        },
        underline: {
          class: Underline,
          inlineToolbar: true,
        },
        linkAutocomplete: {
          class: LinkAutocomplete,
          config: {
            endpoint: "http://localhost:8008/searchLinks",
          },
        },
        hyperlink: {
          class: Hyperlink,
          config: {
            placeholder: "Enter a link",
            target: "_blank",
            rel: "nofollow",
          },
          inlineToolbar: true,
        },
        inlineSpoilerTool: {
          class: InlineSpoilerTool,
          inlineToolbar: true,
        },
        changeCase: {
          class: ChangeCase,
          inlineToolbar: true,
        },
        tooltip: {
          class: Tooltip,
          inlineToolbar: true,
        },
        strikethrough: {
          class: Strikethrough,
          inlineToolbar: true,
        },
        textColor: {
          class: TextColorPlugin,
          inlineToolbar: true,
        },
      },
      onChange: async (api, event) => {
        let content = await editor.saver.save();
        // localStorage.setItem("blogdraft", JSON.stringify(content));
        setEditorData(content);
      },
    });
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // Standard text formatting options
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // Custom header options
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }], // Custom font size options
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // Color options for text and background
    [{ font: [] }],
    [{ align: [] }],

    ["link", "image", "video", "formula"], // Insert links, images, videos, and formulas
    ["clean"], // Remove formatting button
  ];

  const saveAsDraft = () => {
    localStorage.setItem("blogdraft", JSON.stringify(editorData));
    window.alert("Saved");
  };

  useEffect(() => {
    if (localStorage.getItem("blogdraft")) {
      let initialContent = JSON.parse(localStorage.getItem("blogdraft"));
      setEditorData(initialContent);
    }
  }, []);

  const Loader = () => <div className="loader"></div>;

  return (
    <div className="addblog">
      <div>Add Blog</div>
      <div>
        <div>
          <h4>Title</h4>
          <input
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <h4>Auther</h4>
          <input
            value={blogAuther}
            onChange={(e) => setBlogAuther(e.target.value)}
            type="text"
          />
        </div>
        {/* <ReactQuill
          theme="snow"
          value={editorData}
          onChange={(e) => {
            setEditorData(e);
          }}
          modules={{ toolbar: toolbarOptions }}
        /> */}
        <div id="editorjs" className="editorjs"></div>
      </div>
      <button onClick={addBlog} className="addBlogButton">
        {loading ? <Loader /> : "Add Blog"}
      </button>
      <button onClick={saveAsDraft}>Save Draft</button>
    </div>
  );
}
