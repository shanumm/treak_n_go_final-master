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

const liveBarContentStyle = {
  display: "inline-block",
  position: "absolute",
  animation: "marquee 25s linear infinite",
};
const LiveBar = () => {
  const [liveBarData, setLiveBarData] = useState("");
  const liveText = db
    .collection("liveBar")
    .doc("liveBar")
    .get()
    .then((snapshot) => setLiveBarData(snapshot.data().liveBar));
  if (!liveBarData.length) return;
  return (
    <div style={liveBarContainerStyle}>
      <style>
        {`
        @keyframes marquee {
          0% {
            transform: translateX(300%);
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
    db.collection(`Trek Availability`)
      .doc("winterTrek")
      .get()
      .then((snapshot) => {
        setIsWinterAvailable(snapshot.data().availability);
      });
    db.collection(`Trek Availability`)
      .doc("spiritualTrek")
      .get()
      .then((snapshot) => {
        setIsSpiritualAvailable(snapshot.data().availability);
      });
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
