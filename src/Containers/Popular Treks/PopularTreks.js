import React, { useEffect, useState, useMemo } from "react";
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
    const fetchData = async () => {
      setIsLoading(true);
      setIsCustomLoading(true);
      const startTime = Date.now();
      console.log(
        `🚀 [PopularTreks] Starting data fetch at ${new Date().toISOString()}`
      );

      try {
        // Fetch data in parallel for better performance
        console.log(
          `📡 [PopularTreks] Initiating parallel Firebase queries...`
        );
        const queryStartTime = Date.now();

        const [trekSnapshot, customSnapshot] = await Promise.all([
          db.collection("All Trek").get(),
          db.collection("CustomPopularTreks").get(),
        ]);

        const queryEndTime = Date.now();
        console.log(
          `✅ [PopularTreks] Parallel queries completed in ${
            queryEndTime - queryStartTime
          }ms`
        );
        console.log(
          `📊 [PopularTreks] Results: ${trekSnapshot.docs.length} treks, ${customSnapshot.docs.length} custom configs`
        );

        // Process trek data
        const trekProcessStart = Date.now();
        const trekData = trekSnapshot.docs.map((snap) => snap.data());
        setData(trekData);
        setIsLoading(false);
        console.log(
          `⚡ [PopularTreks] Trek data processed in ${
            Date.now() - trekProcessStart
          }ms`
        );

        // Process custom treks data
        const customProcessStart = Date.now();
        if (customSnapshot.docs.length > 0) {
          const customData = customSnapshot.docs.map((snap) => snap.data());
          setIsCustom(customData[0].isCustom);
          setCustomTreks(customData[0].selectedPopularTreks);
          console.log(
            `🎯 [PopularTreks] Custom treks enabled: ${customData[0].isCustom}`
          );
        } else {
          console.log(`🎯 [PopularTreks] No custom trek configuration found`);
        }
        setIsCustomLoading(false);
        console.log(
          `⚡ [PopularTreks] Custom data processed in ${
            Date.now() - customProcessStart
          }ms`
        );

        const totalTime = Date.now() - startTime;
        console.log(
          `🎉 [PopularTreks] Total data fetch completed in ${totalTime}ms`
        );
      } catch (error) {
        console.error(
          `❌ [PopularTreks] Error fetching data after ${
            Date.now() - startTime
          }ms:`,
          error
        );
        setIsLoading(false);
        setIsCustomLoading(false);
      }
    };

    fetchData();
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
