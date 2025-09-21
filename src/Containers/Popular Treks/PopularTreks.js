import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import PopularTrekCards from "./PopularTrekCards";
import "./popularTreks.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
export default function PopularTreks() {
  const [data, setData] = useState([]);
  const [customTreks, setCustomTreks] = useState([]);
  const [isCustom, setIsCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomLoading, setIsCustomLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setIsCustomLoading(true);
    const trekData = db
      .collection("All Trek")
      .get()
      .then((snapshot) => {
        let d = [];
        snapshot.docs.forEach((snap) => {
          d.push(snap.data());
          if (d.length === snapshot.docs.length) {
            setData(d);
            setIsLoading(false);
          }
        });
      });
    const customTreks = db
      .collection("CustomPopularTreks")
      .get()
      .then((snapshot) => {
        let d = [];
        snapshot.docs.forEach((snap) => {
          setIsCustom(snap.data().isCustom);
          d.push(snap.data().selectedPopularTreks);
          if (d.length === snapshot.docs.length) {
            setCustomTreks(d[0]);
            setIsCustomLoading(false);
          }
        });
      });
  }, []);
  const Loader = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "3px solid #ff5e00",
        margin: "2rem auto",
      }}
      className="loader"
    ></div>
  );

  return (
    <div className="popularTreks">
      <div className="popularTreksHeading">
        <span style={{ color: "black" }}>Most</span> <span>Popular</span>{" "}
        <span style={{ color: "black" }}>Treks</span>
      </div>
      <div className="popularTreksDetails">
        Choose from the best Himalayan treks of all time.
      </div>
      {isLoading || isCustomLoading ? (
        <Loader />
      ) : (
        <div className="popularTrekCards">
          <Splide
            options={{
              perPage: 4,
              rewind: true,
              perMove: 1,
              pagination: false,
              gap: "2rem",
              breakpoints: {
                380: {
                  perPage: 1,
                },
                768: {
                  perPage: 2,
                },
                1300: {
                  perPage: 3,
                  gap: "3rem",
                },
              },
            }}
            aria-label="popular treks"
          >
            {isCustom
              ? customTreks?.map((d) => (
                  <SplideSlide>
                    <PopularTrekCards data={d?.Details} />
                  </SplideSlide>
                ))
              : data?.map((d) => (
                  <SplideSlide>
                    <PopularTrekCards data={d?.Details} />
                  </SplideSlide>
                ))}
          </Splide>
        </div>
      )}
    </div>
  );
}
