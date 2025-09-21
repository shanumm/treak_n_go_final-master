import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import PopularTrekCards from "../Popular Treks/PopularTrekCards";

export default function MultidayTour() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const trekData = db
      .collection("All MultiDay")
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
      <div className="popularTreks">
        <div className="popularTreksHeading">
          {" "}
          <span style={{ color: "black" }}>Best</span> Multiday{" "}
          <span style={{ color: "black" }}>tours</span>
        </div>
        <div className="popularTreksDetails">
          Mixed with adventure and relaxation, choose a category of tour that is
          fully customizable and flexible.
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
                <PopularTrekCards id="multiday" data={d?.Details} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}
