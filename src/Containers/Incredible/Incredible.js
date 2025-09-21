import React from "react";
import "./incredible.css";
export default function Incredible() {
  return (
    <div className="incredible">
      <img
        src="https://cdn.pixabay.com/photo/2021/06/07/14/21/mountains-6318080_960_720.jpg"
        alt=""
      />
      <div className="incredibleContainer">
        <div>
          <h2>Incredible</h2>
          <h4>Lorem ipsum dolor sit.</h4>
          <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi rem
            quam odio tempore voluptatum quasi iure et recusandae natus
            accusantium.
          </h5>
        </div>
        <div className="incredibleImages">
          <img
            src="https://cdn.pixabay.com/photo/2016/02/22/21/07/snow-1216543_960_720.jpg"
            alt=""
          />
          <img
            src="https://cdn.pixabay.com/photo/2016/02/22/21/07/snow-1216543_960_720.jpg"
            alt=""
          />
          <img
            src="https://cdn.pixabay.com/photo/2016/02/22/21/07/snow-1216543_960_720.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
