import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import PopularTrekCards from "../Popular Treks/PopularTrekCards";

export default function PopularPackages() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const trekData = db
      .collection("All Winter Trek")
      .get()
      .then((snapshot) => {
        let d = [];
        snapshot.docs.forEach((snap) => {
          d.push(snap.data());
          if (d.length === snapshot.docs.length) {
            setData(d);
          }
        });
      });
  }, []);

  return (
    <div className="popularTreks" style={{ padding: "0 0 8nrem 0" }}>
      <div className="popularTreksHeading">Trek by season</div>
      <div className="popularTreksDetails">
        Choose your treks according to your favourite season
      </div>
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
              1200: {
                perPage: 3,
                gap: "3rem",
              },
            },
          }}
          aria-label="popular treks"
        >
          {data?.map((d) => (
            <SplideSlide>
              <PopularTrekCards id="winter" data={d?.Details} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}
