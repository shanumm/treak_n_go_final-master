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

import { db } from "../../firebase";
import "./addblog.css";
export default function AddBlog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuther, setBlogAuther] = useState("");
  const [editorData, setEditorData] = useState();
  const addBlog = async () => {
    if (blogTitle && blogAuther && editorData) {
      try {
        const currentTime = Date.now(); // Current time in milliseconds

        // Check if the editorData contains undefined values

        await db
          .collection("Blogs")
          .doc(blogTitle.trim())
          .set({
            title: blogTitle,
            author: blogAuther,
            content: JSON.stringify(editorData),
            uploadTime: currentTime,
          });

        // Reset the form fields after a successful submission
        setBlogTitle("");
        setBlogAuther("");
        await editorRef.current.clear();

        alert("Blog added successfully!");
      } catch (error) {
        console.error("Error adding blog: ", error);
        alert("Failed to add blog. Please try again.");
      }
    } else {
      alert("Please fill out all fields before submitting.");
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
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
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
        setEditorData(content);
      },
    });
  };

  useEffect(() => {
    // console.log(editorData, ">>>>");
    // console.log(JSON.stringify(editorData).includes("undefined"), ">>>>");
  }, [editorData]);

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
        <div id="editorjs" className="editorjs"></div>
      </div>
      <button onClick={addBlog} className="addBlogButton">
        Add Blog
      </button>
    </div>
  );
}
