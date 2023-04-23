import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import PopularTrekCards from "../Popular Treks/PopularTrekCards";

export default function MultidayTour() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const trekData = db
      .collection("All Spiritual Trek")
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
    <div>
      <div className="popularTreks " style={{ paddingTop: "0" }}>
        <div className="popularTreksHeading">
          Spiritual <span style={{ color: "black" }}>Treks</span>
        </div>
        <div className="popularTreksDetails">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet,
          temporibus. Lorem ipsum dolor sit.
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
                <PopularTrekCards id={"spiritual"} data={d?.Details} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}
