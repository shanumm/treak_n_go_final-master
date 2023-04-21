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
export default function MainPage({ data }) {
  const [isWinterAvailable, setIsWinterAvailable] = useState(false);
  const [isSpiritualAvailable, setIsSpiritualAvailable] = useState(false);
  useEffect(() => {
    db.collection(`Trek Availability`)
      .doc("winterTrek")
      .get()
      .then((snapshot) => {
        setIsWinterAvailable(snapshot.data().availability);
        console.log(snapshot.data());
      });
    db.collection(`Trek Availability`)
      .doc("spiritualTrek")
      .get()
      .then((snapshot) => {
        setIsSpiritualAvailable(snapshot.data().availability);
      });
    //   let d = {};
    //   const trekData = db
    //     .collection("All Short-Long-Isolated Trek")
    //     .doc("Tungnath Chandrashilla & Deoriatal Trek")
    //     .get()
    //     .then((snapshot) => {
    //       d = { ...snapshot.data() };
    //       d.Details.allSelectedCategory = [];
    //       d.Details.category = "MultiDay";
    //       delete d.Details.SLI;
    //     })
    //     .then(() => {
    //       db.collection(`All MultiDay`)
    //         .doc("Tungnath Chandrashilla & Deoriatal Trek")
    //         .set({
    //           Details: d.Details,
    //           price: parseInt(d.price),
    //         });
    //     });
  }, []);

  return (
    <div>
      <HeroSection data={data} />
      <PopularTreks />
      <PerfectEscapeMain />
      {isWinterAvailable === "show" && <PopularPackages />}
      <MultidayTour />
      <SliderBanner />
      {isSpiritualAvailable === "show" && <SpiritualTrek />}
      <PeacefulStay />
      <ITE />
      {/* <WhyTrekNgo /> */}
    </div>
  );
}
