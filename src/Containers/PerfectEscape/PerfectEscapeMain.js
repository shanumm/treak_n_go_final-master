import React from "react";
import { Link } from "react-router-dom";
export default function PerfectEscapeMain() {
  const img1 =
    "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_960_720.jpg";
  const img2 =
    "https://cdn.pixabay.com/photo/2016/11/08/05/20/sunset-1807524_960_720.jpg";
  const img3 =
    "https://cdn.pixabay.com/photo/2019/08/28/12/20/fog-4436636_960_720.jpg";

  return (
    <div>
      <div className="ite2">
        {/* <img src={TrekBanner} alt="" /> */}
        <div className="ite2Details">
          <div>
            <div className="ite2Heading">
              <span style={{ color: "#ff5e00" }}>Adventure</span> is waiting,
              let us take you there
            </div>
            <div className="ite2SubHeading">Choose your type of adventure</div>
          </div>
          <div>
            <Link to="/perfectEscape/shortTreks">
              <div></div>
            </Link>
            <Link to="/perfectEscape/isolatedTreks">
              <div></div>
            </Link>
            <Link to="/perfectEscape/longTreks">
              <div></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
