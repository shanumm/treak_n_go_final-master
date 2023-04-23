import React, { useEffect } from "react";
import "./peacefulStay.css";
import { Link, useNavigate } from "react-router-dom";
export default function PeacefulStay() {
  const navigation = useNavigate();
  const handleRedirect = (url) => {
    navigation(url);
  };
  return (
    <div className="peacefulStay">
      <div className="peacefulStayImage">
        <img
          src="https://cdn.pixabay.com/photo/2017/08/02/14/26/winter-landscape-2571788_960_720.jpg"
          alt=""
        />
      </div>
      <div className="peacefulStayContainer">
        <div>
          <span style={{ color: "#ff5e00" }}>Peaceful</span>{" "}
          <span style={{ color: "black" }}>Stays</span>
        </div>
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "16px",
            color: "gray",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
          tenetur.
        </div>
        <div className="peacefulStayContainerImages">
          <div>
            <img
              onClick={() => handleRedirect("/peacefulStays/camps")}
              src="https://cdn.pixabay.com/photo/2021/10/09/00/15/landscape-6692712_960_720.jpg"
              alt=""
            />
            <Link to="/peacefulStays/camps">
              <div>Camps</div>
            </Link>
          </div>
          <div>
            <img
              onClick={() => handleRedirect("/peacefulStays/homestays")}
              src="https://cdn.pixabay.com/photo/2022/01/23/00/12/house-6959502_960_720.png"
              alt=""
            />
            <Link to="/peacefulStays/homestays">
              <div>Homestays</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
