import {
  DirectionsWalk,
  LocalParking,
  LocationOn,
  RoomService,
  SportsGolf,
  Star,
  Wifi,
} from "@material-ui/icons";
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
import DatePicker from "react-date-picker";

import { AirplaneTicket } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import "./individualPeacefulStays.css";
export default function IndividualPeacefulStays() {
  const [data, setData] = useState();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomsCount, setRoomsCount] = useState(1);
  const [startDate, setStartDate] = useState(new Date());

  const incrementRoomsCount = () => {
    if (roomsCount < 3) {
      setRoomsCount(roomsCount + 1);
    }
  };

  const decrementRoomsCount = () => {
    if (roomsCount > 1) {
      setRoomsCount(roomsCount - 1);
    }
  };

  const img =
    "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_960_720.jpg";
  const { id } = useParams();
  useEffect(() => {
    const idArray = id.split("-");
    console.log(id);
    var d = "";
    if (id.includes("camp")) {
      d = "Camps";
    } else {
      d = "Homestays";
    }
    const dataa = db
      .collection(`All ${d}`)
      .doc(idArray[1])
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        setData(snapshot.data().Details);
      });
  }, []);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateImage = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) {
        return data.images.length - 1;
      }
      if (newIndex >= data.images.length) {
        return 0;
      }
      return newIndex;
    });
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

  const PropertyRules = () => {
    const propertyRules = data?.propertyRules
      ? data.propertyRules.split(";")
      : [];

    const midIndex = Math.ceil(propertyRules.length / 2);
    const leftRules = propertyRules.slice(0, midIndex);
    const rightRules = propertyRules.slice(midIndex);

    const listStyle = {
      fontSize: "14px",
      color: "#333",
      listStyleType: "circle",
      listStylePosition: "inside",
      marginBottom: "5px",
    };

    return (
      <div
        className="rulesContainer"
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {data?.propertyRules && (
          <>
            <div>
              <ul>
                {leftRules.map((rule, index) => (
                  <li key={index} style={listStyle}>
                    {rule.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {rightRules.map((rule, index) => (
                  <li key={index} style={listStyle}>
                    {rule.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  };
  const PropertyPoints = () => {
    const propertyRules = data?.propertyPoints
      ? data.propertyPoints.split(";")
      : [];

    const midIndex = Math.ceil(propertyRules.length / 2);
    const leftRules = propertyRules.slice(0, midIndex);
    const rightRules = propertyRules.slice(midIndex);

    const listStyle = {
      fontSize: "14px",
      color: "#333",
      listStyleType: "circle",
      listStylePosition: "inside",
      marginBottom: "5px",
    };

    return (
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {data?.propertyPoints && (
          <>
            <div style={{ marginRight: "20px" }}>
              <ul>
                {leftRules.map((rule, index) => (
                  <li key={index} style={listStyle}>
                    {rule.trim()}
                  </li>
                ))}
                {rightRules.map((rule, index) =>
                  rule.trim().length > 0 ? (
                    <li key={index} style={listStyle}>
                      {rule.trim()}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            {/* <div style={{ marginRight: "20px" }}>
              <ul>
                {rightRules.map((rule, index) =>
                  rule.trim().length > 0 ? (
                    <li key={index} style={listStyle}>
                      {rule.trim()}
                    </li>
                  ) : null
                )}
              </ul>
            </div> */}
          </>
        )}
      </div>
    );
  };
  const StaffInfo = () => {
    const staffList = [
      {
        role: "Caretaker",
        language: "Speaks English, Hindi",
        availability: "Available at Property From 8 AM - 11:59 PM",
        responsibilities: "Responsibilities - Cleaning etc",
      },
      {
        role: "Cook",
        language: "Speaks English, Hindi",
        availability: "Available at Property From 7 AM - 10 PM",
        responsibilities: "Responsibilities - Cooking meals",
      },
    ];

    const titleStyle = {
      fontWeight: "bold",
      fontSize: "1.2rem",
      marginBottom: "5px",
      paddingBottom: "5px",
    };

    const listStyle = {
      fontSize: "14px",
      color: "#333",
      listStyleType: "circle",
      listStylePosition: "inside",
      marginBottom: "5px",
    };

    return (
      <div>
        <div style={titleStyle}>Staff available at the Property</div>
        <div style={{ display: "flex" }}>
          {staffList.map((staff, index) => (
            <div style={{ marginLeft: index != 0 ? "40px" : "0" }} key={index}>
              <div>{staff.role}</div>
              <ul>
                <li style={listStyle}>{staff.language}</li>
                <li style={listStyle}>{staff.availability}</li>
                <li style={listStyle}>{staff.responsibilities}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="individualPeacefulStays">
      {modalVisible && (
        <div className="modal">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-content"
            src={data.images[currentImageIndex]}
            alt=""
          />
          <div className="prev" onClick={() => navigateImage(-1)}>
            &#10094;
          </div>
          <div className="next" onClick={() => navigateImage(1)}>
            &#10095;
          </div>
        </div>
      )}
      <div className="ipsNav">
        <ul>
          <li>
            <a href="#ipsGallary">Gallary</a>
          </li>
          <li>
            <a href="#infoPrice">Description</a>
          </li>
          <li>
            <a href="#ipsFacility">Facilities</a>
          </li>

          <li>
            <a href="#rules">Rules</a>
          </li>
        </ul>
      </div>

      <div id="ipsGallary" className="ipsGallary">
        <div>
          <img src={data?.images[0]} alt="" />
          <img src={data?.images[1]} alt="" />
          <img src={data?.images[2]} alt="" />
          <div className="view-more-container">
            <img src={data?.images[3]} alt="" onClick={() => openModal(3)} />
            <button onClick={() => openModal(3)}>View More Photos</button>
          </div>
        </div>
      </div>
      <div className="ipsDetails">
        <div id="infoPrice" className="ipsDetailsHeading">
          <div>
            <div>
              {data?.name ? data?.name : "Capital O 89808 Sk Residency"}
            </div>
            <div>
              {data?.rating ? (
                <>
                  {Array.from({ length: parseInt(data?.rating) }).map(() => (
                    <Star style={{ color: "#ff5e00" }} />
                  ))}
                </>
              ) : (
                <>
                  <Star style={{ color: "#F7BB44" }} />
                  <Star style={{ color: "#F7BB44" }} />
                  <Star style={{ color: "#F7BB44" }} />
                </>
              )}
            </div>
          </div>
          <div className="ipslocation">
            <LocationOn style={{ color: "#2378CC" }} />{" "}
            {data?.area ? data?.area : "New Delhi"} |
            <span
              style={{
                color: "gray",
                marginLeft: "4px",
                textDecoration: "underline",
              }}
            >
              {data?.nearestHighlight || "5Km From Mall"}
            </span>
          </div>
          <div className="ipsCompleteAddress">
            {data?.completeAddress ? data?.completeAddress : "New Delhi"}{" "}
          </div>
        </div>
      </div>
      <div>
        <div style={{ marginBottom: "5px" }}>All Amenities</div>
        <div className="AmenityContainer">
          {data?.amenities &&
            data?.amenities?.map((backendAmenity, index) => {
              const matchedAmenity = popularAmenities.find(
                (amenity) => amenity.name === backendAmenity
              );

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "10px",
                  }}
                >
                  {matchedAmenity && matchedAmenity.icon}
                  <div>{matchedAmenity && matchedAmenity.name}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="ipsDescription">
        <div>
          {data?.campDesc ? (
            data?.campDesc
          ) : (
            <>
              Capital O 89808 Sk Residency features air-conditioned rooms with
              TV in the South West district of New Delhi. Among the facilities
              at this property are a shared kitchen and room service, along with
              free WiFi throughout the property. Local points of interest like
              Gurudwara Bangla Sahib and Qutub Minar are reachable within 13 km
              and 14 km, respectively. <br />
              Rashtrapati Bhavan is 12 km from the hotel, while Gandhi Smriti is
              13 km away. The nearest airport is Delhi International, 6 km from
              Capital O 89808 Sk Residency, and the property offers a paid
              airport shuttle service. Capital O 89808 Sk Residency has been
              welcoming Booking.com guests since 10 Jun 2022. Hotel chain/brand:
              OYO Rooms
              <br />
              Distance in property description is calculated using ©
              OpenStreetMap
            </>
          )}
        </div>
        <div className="ipsPropertyHighlight">
          <div>
            <div style={{ margin: "5px 0" }}>
              {data?.highlightHeading
                ? data.highlightHeading
                : "Property highlights"}
            </div>
            <div style={{ margin: "5px 0" }}>
              <div>Starting from - Rs. {data?.price}</div>
            </div>
            <div style={{ margin: "5px 0" }}>
              <span>
                Number of rooms:{" "}
                <button onClick={decrementRoomsCount}>-</button> {roomsCount}{" "}
                <button onClick={incrementRoomsCount}>+</button>
              </span>
            </div>
            <div style={{ margin: "10px 0" }}>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                minDate={new Date()}
                format="y-MM-dd"
              />
            </div>

            <button>Book Now</button>
          </div>
        </div>
      </div>
      <StaffInfo />
      <div id="ipsFacility">
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginBottom: "5px",
            paddingBottom: "5px",
          }}
        >
          About {data?.name || "Name"}
        </div>
        <div>
          <div>{data?.propertySubheading || ""}</div>
          {<PropertyPoints />}
        </div>
      </div>
      <div
        id="rules"
        className="propertyRules"
        style={{ marginBottom: "20px" }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginBottom: "15px",
            borderBottom: "2px solid #333",
            paddingBottom: "5px",
          }}
        >
          Property Rules
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>
            Check In
            <br />
            <span
              style={{ fontSize: "18px", fontWeight: "500", color: "#3C3C3C" }}
            >
              {data?.checkIn}
            </span>
          </div>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>
            Check Out
            <br />
            <span
              style={{ fontSize: "18px", fontWeight: "500", color: "#3C3C3C" }}
            >
              {data?.checkOut}
            </span>
          </div>
        </div>
        <PropertyRules />
      </div>

      <div className="ipsSurroundings">
        <h5>Hotel surroundings *</h5>
        <div>
          <div>
            <div>
              <DirectionsWalk /> What's Nearby
            </div>
            <div>
              {data?.whatsNearby?.map((m) => (
                <div>
                  <div>{m}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <SportsGolf /> Top Attractions
            </div>
            <div>
              {data?.topAttraction?.map((m) => (
                <div>
                  <div>{m}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <AirplaneTicket /> Airport / Public Transport
            </div>
            <div>
              {data?.publicTransport?.map((m) => (
                <div>
                  <div>{m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
