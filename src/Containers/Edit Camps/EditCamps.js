import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Star } from "@mui/icons-material";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import PetsIcon from "@mui/icons-material/Pets";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import WcIcon from "@mui/icons-material/Wc";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import TvIcon from "@mui/icons-material/Tv";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import HotTubIcon from "@mui/icons-material/HotTub";
import CasinoIcon from "@mui/icons-material/Casino";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import SpaIcon from "@mui/icons-material/Spa";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import "./editCamps.css";
import { Link } from "react-router-dom";

export default function EditCamps() {
  const [campData, setCampData] = useState(null);
  const [homestayData, sethomestayData] = useState(null);
  useEffect(() => {
    const data = db
      .collection(`All Camps`)
      .get()
      .then((snapshot) => {
        const allCamps = [];
        snapshot.docs.forEach((doc) => {
          allCamps.push(doc.data());
        });
        if (allCamps.length === snapshot.docs.length) {
          setCampData(allCamps);
        }
      });
  }, []);
  useEffect(() => {
    const data = db
      .collection(`All Homestays`)
      .get()
      .then((snapshot) => {
        const allCamps = [];
        snapshot.docs.forEach((doc) => {
          allCamps.push(doc.data());
        });
        if (allCamps.length === snapshot.docs.length) {
          sethomestayData(allCamps);
        }
      });
  }, []);

  const handleRemove = (category, name) => {
    const check = window.confirm("Do you want to delete?");
    if (check) {
      const deleteData = db
        .collection(`All ${category}`)
        .doc(name)
        .delete()
        .then(() => {
          alert("deleted successfully");
        });
    }
  };

  const popularAmenities = [
    { icon: <WifiIcon style={{ color: "#ff5e00" }} />, name: "Wi-Fi" },
    {
      icon: <LocalParkingIcon style={{ color: "#ff5e00" }} />,
      name: "Parking",
    },
    {
      icon: <AcUnitIcon style={{ color: "#ff5e00" }} />,
      name: "Air Conditioning",
    },
    { icon: <PoolIcon style={{ color: "#ff5e00" }} />, name: "Swimming Pool" },
    { icon: <FitnessCenterIcon style={{ color: "#ff5e00" }} />, name: "Gym" },
    { icon: <KitchenIcon style={{ color: "#ff5e00" }} />, name: "Kitchen" },
    { icon: <BathtubIcon style={{ color: "#ff5e00" }} />, name: "Bathtub" },
    {
      icon: <SmokeFreeIcon style={{ color: "#ff5e00" }} />,
      name: "Non-Smoking",
    },
    { icon: <PetsIcon style={{ color: "#ff5e00" }} />, name: "Pet Friendly" },
    {
      icon: <ChildFriendlyIcon style={{ color: "#ff5e00" }} />,
      name: "Child Friendly",
    },
    { icon: <WcIcon style={{ color: "#ff5e00" }} />, name: "Private Bathroom" },
    {
      icon: <RoomServiceIcon style={{ color: "#ff5e00" }} />,
      name: "Room Service",
    },
    { icon: <TvIcon style={{ color: "#ff5e00" }} />, name: "Television" },

    {
      icon: <FreeBreakfastIcon style={{ color: "#ff5e00" }} />,
      name: "Free Breakfast",
    },
    { icon: <HotTubIcon style={{ color: "#ff5e00" }} />, name: "Hot Water" },
    { icon: <CasinoIcon style={{ color: "#ff5e00" }} />, name: "Casino" },
    {
      icon: <GolfCourseIcon style={{ color: "#ff5e00" }} />,
      name: "Golf Course",
    },
    { icon: <SpaIcon style={{ color: "#ff5e00" }} />, name: "Spa" },
    {
      icon: <BeachAccessIcon style={{ color: "#ff5e00" }} />,
      name: "Beach Access",
    },
  ];

  const PeacefulStayComponent = ({ data, category }) => (
    <div className="peacefulStayComponent">
      <div>
        <img src={data?.Details?.images[0]} />
      </div>
      <div>
        <h4>{data?.Details?.name}</h4>
        <h4 style={{ display: "flex", alignItems: "center" }}>
          {data?.Details?.rating
            ? Array.from({ length: parseInt(data?.Details?.rating) }).map(
                () => <Star style={{ color: "#ff5e00" }} />
              )
            : Array.from({ length: 4 }).map(() => (
                <Star style={{ color: "#ff5e00" }} />
              ))}
          <img
            style={{ height: "20px", width: "20px", marginLeft: "4px" }}
            src="https://cdn-icons-png.flaticon.com/512/6114/6114604.png"
            alt=""
          />
        </h4>
        <h4 style={{ display: "flex", alignItems: "baseline" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              color: "#ff5e00",
              textTransform: "capitalize",
              textDecoration: "underline",
              fontSize: "16px",
              marginRight: "6px",
            }}
            className="reviewTitle"
          >
            {data?.Details?.area}{" "}
          </span>{" "}
          <span
            style={{
              fontSize: "14px",
              color: "#595959",
              textDecoration: "underline",
            }}
          >
            {data?.Details?.nearestHighlight
              ? data?.Details?.nearestHighlight
              : "3K.M from the city center"}
          </span>
        </h4>
        <div> Popular Amenities</div>
        <div>
          {data?.Details?.amenities
            ?.slice(0, 4)
            .map((backendAmenity, index) => {
              const matchedAmenity = popularAmenities.find(
                (amenity) => amenity.name === backendAmenity
              );

              return (
                matchedAmenity?.icon && (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "10px",
                    }}
                  >
                    {matchedAmenity.icon}
                  </div>
                )
              );
            })}
        </div>
        <div style={{ color: "#ff5e00", fontSize: "14px" }}>
          {Math.floor(Math.random() * (50 - 10 + 1)) + 10} people are looking at
          this deal
        </div>
      </div>

      <div>
        <div>
          <div>
            <div>Good</div>
            <div>5367 reviews</div>
          </div>
          <div>{data?.Details?.rating ? data?.Details?.rating : "4.5"}</div>
        </div>

        <div>
          <Link to={`/editCamps/${category}-${data?.Details?.name}`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => handleRemove(category, data?.Details?.name)}
            style={{ marginLeft: "5px" }}
          >
            Delete
          </button>
        </div>
        <div className="peacefulStayPageStartingFrom">
          <div>Starting From</div>
          <div>Rs. {data?.Details?.price}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="editHC">
      <div className="editHCHeading">Edit Camps/Homestays</div>
      <div className="editHCContainer">
        <div>Homestay</div>
        {homestayData &&
          homestayData.map((data) => (
            <PeacefulStayComponent data={data} category="Homestays" />
          ))}
      </div>
      <div className="editHCContainer">
        <div>Camp</div>
        {campData &&
          campData.map((data) => (
            <PeacefulStayComponent data={data} category="Camps" />
          ))}
      </div>
    </div>
  );
}
