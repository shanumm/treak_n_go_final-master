import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import "./sliderBanner.css";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
export default function SilderBanner() {
  const [bannerImages, setBannerImages] = useState([]);
  useEffect(() => {
    if (bannerImages.length != 0) {
      const sliderGlide = new Glide(".sliderGlide", {
        type: "carousel",
        perView: 1,
        gap: 0,
        autoplay: 5000,
        hoverpause: true,
      }).mount();
    }
  }, [bannerImages]);

  useEffect(() => {
    const sliderData = db
      .collection("sliderImages")
      .get()
      .then((snapshot) => {
        const array = [];
        snapshot.docs.forEach((doc) => {
          array.push(doc.data());
          if (array.length === snapshot.docs.length) {
            setBannerImages(array);
          }
        });
      });
  }, []);
  useEffect(() => {}, [bannerImages]);

  return (
    <div className="sliderBanner">
      <div>
        <div className="sliderGlide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              {bannerImages.length > 0 ? (
                bannerImages?.map((e) => (
                  <Link to={e.sliderImageURL}>
                    <li class="glide__slide">
                      <img src={e.banner} alt="" />
                      <button>explore</button>
                    </li>
                  </Link>
                ))
              ) : (
                <li class="glide__slide">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png"
                    alt=""
                  />
                </li>
              )}
            </ul>
          </div>
          <div class="glide__bullets" data-glide-el="controls[nav]">
            {bannerImages?.map((e, i) => (
              <button class="glide__bullet" data-glide-dir={`=${i}`}></button>
            ))}
            {/* <button class="glide__bullet" data-glide-dir="=1"></button>
            <button class="glide__bullet" data-glide-dir="=2"></button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
