import React, { useEffect, useState } from "react";
import PeacefulStay from "./Containers/Peaceful Stay/PeacefulStay";
import HeroSection from "./Containers/Hero Section/HeroSection";
import ITE from "./Containers/IncredibleTrekingExperience/ITE";
import PopularTreks from "./Containers/Popular Treks/PopularTreks";
import PopularPackages from "./Containers/PopularPackages/PopularPackages";
import MultidayTour from "./Containers/Multidays Tour/MultidayTour";
import SpiritualTrek from "./Containers/Spiritual Trek/SpiritualTrek";
import Incredible from "./Containers/Incredible/Incredible";
import PerfectEscapeMain from "./Containers/PerfectEscape/PerfectEscapeMain";
import SliderBanner from "./Components/Slider Banner/SilderBanner";
import { db } from "./firebase";
import WhyTrekNgo from "./Containers/WhyTrekNGo/WhyTrekNGo";
import { useLocation } from "react-router-dom";

const liveBarContainerStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  backgroundColor: "#f1c40f",
  color: "#000",
  fontWeight: "500",
  padding: "5px",
  position: "relative",
  height: "5vh",
};
function calculateMarqueeSpeed() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    return 20; // slower speed for smaller screens
  } else {
    return 30; // faster speed for larger screens
  }
}

const liveBarContentStyle = {
  display: "inline-block",
  position: "absolute",
  animation: `marquee ${calculateMarqueeSpeed()}s linear infinite`,
};

const LiveBar = () => {
  const [liveBarData, setLiveBarData] = useState("");

  useEffect(() => {
    const fetchLiveBarData = async () => {
      const startTime = Date.now();
      console.log(
        `🚀 [LiveBar] Starting data fetch at ${new Date().toISOString()}`
      );

      try {
        const snapshot = await db.collection("liveBar").doc("liveBar").get();
        const data = snapshot.data().liveBar;
        setLiveBarData(data);

        const totalTime = Date.now() - startTime;
        console.log(`🎉 [LiveBar] Data fetch completed in ${totalTime}ms`);
      } catch (error) {
        console.error(
          `❌ [LiveBar] Error fetching data after ${Date.now() - startTime}ms:`,
          error
        );
      }
    };

    fetchLiveBarData();
  }, []);

  if (!liveBarData.length) return;

  return (
    <div style={liveBarContainerStyle}>
      <style>
        {`
        @keyframes marquee {
          0% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @media (max-width: 768px) {
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        }
        `}
      </style>
      <div style={liveBarContentStyle}>{liveBarData}</div>
    </div>
  );
};

export default function MainPage({ data }) {
  const [isWinterAvailable, setIsWinterAvailable] = useState(false);
  const [isSpiritualAvailable, setIsSpiritualAvailable] = useState(false);

  useEffect(() => {
    const fetchAvailabilityData = async () => {
      const startTime = Date.now();
      console.log(
        `🚀 [MainPage] Starting availability check at ${new Date().toISOString()}`
      );

      try {
        console.log(`📡 [MainPage] Initiating availability queries...`);
        const queryStartTime = Date.now();

        const [winterSnapshot, spiritualSnapshot] = await Promise.all([
          db.collection(`Trek Availability`).doc("winterTrek").get(),
          db.collection(`Trek Availability`).doc("spiritualTrek").get(),
        ]);

        const queryEndTime = Date.now();
        console.log(
          `✅ [MainPage] Availability queries completed in ${
            queryEndTime - queryStartTime
          }ms`
        );

        // Process winter availability
        const winterAvailability = winterSnapshot.data().availability;
        setIsWinterAvailable(winterAvailability);
        console.log(
          `❄️ [MainPage] Winter treks availability: ${winterAvailability}`
        );

        // Process spiritual availability
        const spiritualAvailability = spiritualSnapshot.data().availability;
        setIsSpiritualAvailable(spiritualAvailability);
        console.log(
          `🧘 [MainPage] Spiritual treks availability: ${spiritualAvailability}`
        );

        const totalTime = Date.now() - startTime;
        console.log(
          `🎉 [MainPage] Total availability check completed in ${totalTime}ms`
        );
      } catch (error) {
        console.error(
          `❌ [MainPage] Error checking availability after ${
            Date.now() - startTime
          }ms:`,
          error
        );
      }
    };

    fetchAvailabilityData();
  }, []);

  return (
    <div>
      <HeroSection data={data} />
      <LiveBar />
      <PopularTreks />
      <PerfectEscapeMain />
      {isWinterAvailable === "show" && <PopularPackages />}
      <MultidayTour />
      <SliderBanner />
      {isSpiritualAvailable === "show" && <SpiritualTrek />}
      <PeacefulStay />
      <ITE />
      <WhyTrekNgo />
    </div>
  );
}
