import { Star } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./popularTrekCards.css";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { LocationCity, LocationOn } from "@material-ui/icons";

export default function PopularTrekCards({ data, id }) {
  const [{ basket }, dispatch] = useStateValue();
  const [imageUrl, setImageUrl] = useState("");
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg|JPEG)$/.test(url);
  };

  const img =
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80";
  return (
    <Link to={!id ? `/treks/${data?.name}` : `/treks/${data?.name}=${id}`}>
      <div className="popularTrekCard">
        <div className="popularTrekCardImage">
          <img
            src={
              isImage(data?.images[0])
                ? data?.images[0]
                : data?.images[0].includes("storage")
                ? data?.images[0]
                : img
            }
            alt=""
          />
          <div className="eachTrekTag">{data?.duration}</div>
        </div>
        <div className="popularTrekCardDetails">
          <div className="popularTrekCardName">{data?.name.toLowerCase()}</div>
          <div className="popularTrekCardLocation">
            <LocationOn />
            {data?.route ? data?.route.toLowerCase() : "Location"}
          </div>
          <div
            className="popularTrekRating"
            style={{ display: "flex", alignItems: "center" }}
          >
            {data?.rating ? (
              <>
                {Array.from({ length: parseInt(data?.rating) }).map(() => (
                  <Star style={{ color: "#ff5e00" }} />
                ))}
              </>
            ) : (
              <>
                <Star style={{ color: "#ff5e00" }} />
                <Star style={{ color: "#ff5e00" }} />
                <Star style={{ color: "#ff5e00" }} />
                <Star style={{ color: "#ff5e00" }} />
              </>
            )}
            <span>{data?.rating ? data?.rating : "4.0"}</span>
          </div>
          <div
            className="popularTrekCardButton"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div style={{ flex: "1 1 5rem" }} className="popularTrekCardPrice">
              <span style={{ marginRight: ".4rem" }}>₹</span> {data?.price}
            </div>
            <Link
              to={!id ? `/treks/${data?.name}` : `/treks/${data?.name}=${id}`}
            >
              <button>Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
