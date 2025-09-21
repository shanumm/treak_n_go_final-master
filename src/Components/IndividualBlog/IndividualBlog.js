import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./individualBlog.css";
import { useStateValue } from "../../StateProvider";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import InlineImage from "editorjs-inline-image";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
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
import ImageGallery from "@rodrigoodhin/editorjs-image-gallery";
import { db } from "../../firebase";

function useApplyImageBorderRadius(individualBlog) {
  useEffect(() => {
    const applyBorderRadius = () => {
      const images = document.querySelectorAll("#editorjs img");
      images.forEach((img) => {
        img.style.borderRadius = "10px";
      });
    };
    applyBorderRadius();
  }, [individualBlog]);
}

function Output({ data }) {
  const renderBlock = (block) => {
    switch (block.type) {
      case "imageGallery":
        return <ImageGalleryDisplay key={block.id} data={block.data} />;
      default:
        return null;
    }
  };

  return <div>{data.blocks.map((block) => renderBlock(block))}</div>;
}

function ImageGalleryDisplay({ data }) {
  if (!data) return null;

  return (
    <div className="image-gallery">
      {data.urls.map((image, index) => (
        <img key={index} src={image} alt={image} />
      ))}
    </div>
  );
}

export default function IndividualBlog() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [individualBlog, setIndividualBlog] = useState();
  const [isNotEditable, setIsNotEditable] = useState(true);
  const [editorData, setEditorData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    var title = id;
    if (id.includes("edit")) {
      title = title.substring(0, title.indexOf("="));
    }

    const data = db
      .collection("Blogs")
      .doc(title)
      .get()
      .then((snapshot) => {
        setIndividualBlog(snapshot.data());
      });
  }, []);

  useEffect(() => {
    if (individualBlog && Object.keys(individualBlog).length) {
      const content = JSON.parse(individualBlog.content);
      const editorJS = new EditorJS({
        holder: "editorjs",
        readOnly: isNotEditable,
        data: content,
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
          let content = await editorJS.saver.save();
          setEditorData(content);
        },
      });
    }
  }, [individualBlog, isNotEditable]);

  useApplyImageBorderRadius(individualBlog); // Call the custom hook here

  const getTime = (value) => {
    const timestamp = value;
    const date = new Date(timestamp);
    return date.toDateString();
  };

  const handleButtonClick = async () => {
    if (isNotEditable) {
      setIsNotEditable(!isNotEditable);
      return;
    } else {
      await db
        .collection("Blogs")
        .doc(individualBlog.title.trim())
        .update({
          content: JSON.stringify(editorData),
        });
      setIsNotEditable(!isNotEditable);
      window.location.reload();
    }
  };

  return (
    <div
      className="individualBlogCcontainer"
      style={{ background: "#F7F7F8", padding: "2rem" }}
    >
      <div className="individualBlog">
        <div className="individualBlogHeading">{individualBlog?.title}</div>
        <div id="editorjs"></div>
        <div className="individualBlogBy">
          Author : {individualBlog?.author}
        </div>
        <div className="individualBlogTime">
          {getTime(individualBlog?.uploadTime)}
        </div>
        {user?.email === "test@example.com" ? (
          <div style={{ width: "80%", margin: "auto", padding: "1rem 0" }}>
            <button onClick={handleButtonClick}>
              {isNotEditable ? "Update Blog" : "Confirm"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
