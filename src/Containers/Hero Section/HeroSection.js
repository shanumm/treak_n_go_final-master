import React, { useEffect, useState } from "react";
import "./heroSection.css";

import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

import ImageBanner from "../Treks/trekBannerBg.jpg";

import { Link } from "react-router-dom";
import Banner_1 from "../../Images/banner-1.jpg";
import Banner_2 from "../../Images/banner-2.jpg";
import Banner_3 from "../../Images/banner-3.jpg";
import Banner_M1 from "../../Images/TrekBGMobile1.jpg";
import Banner_M2 from "../../Images/TrekBGMobile2.jpg";
import Banner_M3 from "../../Images/TrekBGMobile3.jpg";

export default function HeroSection({ data }) {
  const [search, setSearch] = useState("");
  const [noOfAdults, setNoOfAdults] = useState(0);
  const [b1, setB1] = useState("");
  const [b2, setB2] = useState("");
  const [b3, setB3] = useState("");
  useEffect(() => {
    const heroSectionGlide = new Glide(".glide").mount();

    if (window.innerWidth > 896) {
      setB1(Banner_1);
      setB2(Banner_2);
      setB3(Banner_3);
    } else {
      setB1(Banner_M1);
      setB2(Banner_M2);
      setB3(Banner_M3);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 896) {
        setB1(Banner_1);
        setB2(Banner_2);
        setB3(Banner_3);
      } else {
        setB1(Banner_M1);
        setB2(Banner_M2);
        setB3(Banner_M3);
      }
    });
  }, []);

  return (
    <div className="heroSectionContainer">
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            {/* <li class="glide__slide">
              <img src={b3} alt="" />
            </li>
            <li class="glide__slide">
              <img src={b2} alt="" />
            </li> */}
            <li class="glide__slide">
              <img src={ImageBanner} alt="" />
            </li>
          </ul>
        </div>
        {/* <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
            {"<"}
          </button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
            {">"}
          </button>
        </div> */}
      </div>
      <div className="headerSearch">
        <div>
          <div className="headerSearchOuterContainer">
            <div>
              <img
                style={{
                  width: "18px",
                  height: "18",
                  objectFit: "contain",
                  filter: "invert(1)",
                  marginRight: "10px",
                }}
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search “TrekNgo”"
              />
            </div>

            <div>
              <Link to={`/treks?search=${search}&adults=${noOfAdults}`}>
                <button>Search</button>
              </Link>
            </div>
          </div>
          {/* <div className="searchData">
            {search.length != 0 &&
              data &&
              data
                .filter((d) => {
                  if (
                    d.query.Details.name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return d;
                  } else if (search.length > 0 && search.length < 2) {
                    return d;
                  }
                })
                .map((d) => (
                  <Link to={`/treks/${d.query.Details.name}`}>
                    <div>
                      <div>
                        <img src={d.query.Details.images[0]} />
                      </div>
                      <div>
                        <div>{d.query.Details.name}</div>
                        <div style={{ fontSize: ".8rem" }}>
                          {d.query.Details.area}
                        </div>
                      </div>
                      <div style={{ color: "red" }}>
                        {d.query.Details.price.replace(/[^0-9]/g, "")}₹
                      </div>
                    </div>
                  </Link>
                ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
