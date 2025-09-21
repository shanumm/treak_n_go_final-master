import {
  DirectionsWalk,
  LocalParking,
  LocationOn,
  RoomService,
  SportsGolf,
  Star,
  Wifi,
} from "@mui/icons-material";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";

import { AirplaneTicket } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import "./individualPeacefulStays.css";
import PaymentBox from "../../Payment/PaymentBox";
import { useSwipeable } from "react-swipeable";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

export default function IndividualPeacefulStays() {
  const [data, setData] = useState();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomsCount, setRoomsCount] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [currentBookingMiniDate, setCurrentBookingMiniDate] = useState();
  const [bookingNumber, setBookingNumber] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isShowMoreExpanded, setIsShowMoreExpanded] = useState(false);

  // useEffect(() => {
  //   const individualPeacefulStays = document.querySelector(
  //     ".individualPeacefulStays"
  //   );
  //   const peacefulPaymentContainer = document.querySelector(
  //     ".peacefulPaymentContainer"
  //   );
  //   peacefulPaymentContainer.style.height = `calc(${individualPeacefulStays.clientHeight}px - 210vh)`;
  // }, []);

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

  function isValidEmail(email) {
    // regular expression for checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  async function displayRazorpay(e) {
    e.preventDefault();
    // setIsPaymentProcessing(true);
    // const mobile = bookingNumber;
    // if (mobile.length === 10 && isValidEmail(bookingEmail)) {
    //   const res = await loadScript(
    //     "https://checkout.razorpay.com/v1/checkout.js"
    //   );

    //   if (!res) {
    //     alert("Razorpay SDK failed to load. Are you online?");
    //     return;
    //   }
    //   const finalSellPrice = Math.floor(data?.price) * roomsCount;
    //   const response = await axios({
    //     method: "post",
    //     url: `/payments/create?total=${finalSellPrice * 100}`,
    //   });

    //   const options = {
    //     key: __DEV__ ? "rzp_test_pJnACGFAMxAceV" : "PRODUCTION_KEY",
    //     currency: "INR",
    //     amount: response.data.amount.toString(),
    //     order_id: response.data.id,
    //     name: "TreknGo",
    //     description: "Thank you for booking from us. ",
    //     image: "http://localhost:3000/logo.png",
    //     handler: function (response) {
    //       setConfirmedBookingId(response.razorpay_order_id);
    //       setIsOrderConfirmed(true);
    //       const orders = db
    //         .collection("Orders")
    //         .doc(bookingEmail)
    //         .set({
    //           user: bookingEmail,
    //         })
    //         .then(() => {
    //           const orderDetails = {
    //             travelDate: currentBookingDate,
    //             date: value,
    //             OrderId: response.razorpay_order_id,
    //             PaymentId: response.razorpay_payment_id,
    //             signature: response.razorpay_signature,
    //             Adults: adult,
    //             data: data,
    //             email: bookingEmail,
    //             number: bookingNumber,
    //           };

    //           db.collection("Orders")
    //             .doc(bookingEmail)
    //             .collection("All Orders")
    //             .add(orderDetails);
    //         })
    //         .then(() => {
    //           var iti = data?.itinerary
    //             .map((i) => {
    //               const c =
    //                 i.heading.toString() +
    //                 "&nbsp;" +
    //                 i.description.toString() +
    //                 "&nbsp;";
    //               return c;
    //             })
    //             .join("<br>");

    //           var inclusions = data?.inclusion.join("<br>");
    //           var exclusions = data?.exclusion.join("<br>");

    //           var params = {
    //             name: data?.name,
    //             to_name: bookingEmail,
    //             booking_id: response.razorpay_order_id,
    //             email_to: bookingEmail,
    //             contact_number: mobile.value,
    //             no_of_people: adult,
    //             tour_date: currentBookingDate,
    //             itinerary: iti,
    //             inclusion: inclusions,
    //             exlusion: exclusions,
    //             canvas: data?.images[0],
    //           };
    //           if (selectedAddOns) {
    //             params.selectedAddOns = selectedAddOns;
    //           }
    //           if (packageSelectedData) {
    //             params.packageSelectedData = packageSelectedData;
    //           }
    //           if (selectedAvailableBatch) {
    //             params.selectedAvailableBatch = selectedAvailableBatch;
    //           }

    //           emailjs
    //             .send(
    //               "service_p1nqdtc",
    //               "template_9ow97wa",
    //               params,
    //               "dcAj3UwkMO9oYa0NL"
    //             )
    //             .then(
    //               (result) => {
    //                 console.log(result.text);
    //               },
    //               (error) => {
    //                 console.log(error.text);
    //               }
    //             );
    //         });
    //     },
    //     prefill: {
    //       name: "",
    //       email: bookingEmail,
    //       contact: mobile.value,
    //     },
    //   };
    //   const paymentObject = new window.Razorpay(options);
    //   paymentObject.open();
    //   setIsPaymentProcessing(false);
    // } else {
    //   setIsPaymentProcessing(false);
    //   setMobileError("Please enter a valid number or email");
    // }
  }

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
      marginBottom: "5px",
      position: "relative",
      // paddingLeft: "20px",
      // textIndent: "-20px",
    };

    const ulStyle = {
      listStyleType: "disc",
      paddingLeft: "1.2em",
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
              <ul style={ulStyle}>
                {leftRules.map((rule, index) => (
                  <li key={index} style={listStyle}>
                    {rule.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul style={ulStyle}>
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
      marginBottom: "5px",
      position: "relative",
      // paddingLeft: "20px",
      // textIndent: "-20px",
    };

    const ulStyle = {
      listStyleType: "disc",
      paddingLeft: "1.2em",
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
              <ul style={ulStyle}>
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

  const StaffInfo = (list = []) => {
    const staffList = list?.list || [
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
      marginBottom: "5px",
      position: "relative",
      // paddingLeft: "20px",
      // textIndent: "-20px",
    };

    const ulStyle = {
      listStyleType: "disc",
      paddingLeft: "1.2em",
    };

    return (
      <div>
        <div style={titleStyle}>Staff available at the Property</div>
        <div style={{ display: "flex" }}>
          {staffList.map((staff, index) => (
            <div style={{ marginLeft: index !== 0 ? "40px" : "0" }} key={index}>
              <div>{staff.role}</div>
              <ul style={ulStyle}>
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

  const handleShowMoreDesc = () => {
    setIsShowMoreExpanded(!isShowMoreExpanded);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      return navigateImage(-1);
    },
    onSwipedRight: () => {
      return navigateImage(1);
    },
  });

  return (
    <div className="individualPeacefulStays">
      <div className="fixed-bottom-right">
        <div className="whatsAppFloatingIcon">
          <a
            href="https://wa.me/+919654749746" // Replace 1234567890 with the desired phone number (including country code)
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/color/256/whatsapp.png"
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
          </a>
        </div>
      </div>
      {modalVisible && (
        <div
          className="modal imageModall"
          style={{
            display: "block",
            zIndex: "10000000000000",
            height: "100%",
            display: "flex",
            background: "black",
          }}
        >
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            {...handlers}
            className="modal-content"
            src={data.images[currentImageIndex]}
            alt=""
          />
          <div
            className="arrow arrowLeft prev"
            onClick={() => navigateImage(-1)}
          >
            &lt;
          </div>
          <div
            className="arrow arrowRight next"
            onClick={() => navigateImage(1)}
          >
            &gt;
          </div>
        </div>
      )}
      <div className="ipsNav">
        <ul>
          <li>
            <a href="#ipsGallary">Gallery</a>
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
          <img src={data?.images[4]} alt="" />
          <div className="view-more-container">
            <img src={data?.images[3]} alt="" onClick={() => openModal(3)} />
            <button onClick={() => openModal(3)}>View More Photos</button>
          </div>
        </div>
      </div>

      <div
        className="ipsDetailsContainerParent"
        style={{ display: "flex", position: "relative" }}
      >
        <div
          className="ipsDetailsContainer"
          style={{ marginRight: "1rem", width: "100%" }}
        >
          <div className="ipsDetails">
            <div id="infoPrice" className="ipsDetailsHeading">
              <div>
                <div>{data?.name ? data?.name : ""}</div>
                <div>
                  {data?.rating ? (
                    <>
                      {Array.from({ length: parseInt(data?.rating) }).map(
                        () => (
                          <Star style={{ color: "#ff5e00" }} />
                        )
                      )}
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
                {data?.area ? data?.area : ""} |
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
                {data?.completeAddress ? data?.completeAddress : ""}{" "}
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "5px", fontWeight: "500" }}>
              All Amenities
            </div>
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
              <div
                style={{
                  marginBottom: "5px",
                  fontWeight: "500",
                  fontSize: "19.2px",
                  fontWeight: "bold",
                }}
              >
                Highlights of the property
              </div>
              <div
                className={
                  isShowMoreExpanded
                    ? "highlightsExpanededContainer showMoreExpanded"
                    : "highlightsExpanededContainer notExpanded"
                }
                style={{ fontSize: "14px" }}
              >
                {data?.campDesc ? data?.campDesc : <></>}
              </div>
              <div
                className="hideOnSmall"
                style={{
                  fontSize: "14px",
                  marginTop: "5px",
                  color: "#ff5e00",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleShowMoreDesc}
              >
                {isShowMoreExpanded ? "Hide" : "Show More"}
                {isShowMoreExpanded ? (
                  <img
                    style={{
                      width: "12px",
                      height: "12px",
                      marginLeft: "12px",
                      marginLeft: "4px",
                    }}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/130/130906.png"
                    }
                  />
                ) : (
                  <img
                    style={{
                      width: "18px",
                      height: "18px",
                      marginLeft: "12px",
                      marginLeft: "4px",
                    }}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/2722/2722987.png"
                    }
                  />
                )}
              </div>
            </div>

            {/* <div> */}
            {/* <div className="peacefulPaymentContainer"> */}

            {/* </div> */}
            {/* </div> */}
          </div>
          <StaffInfo list={data?.staffList} />
          {data?.whatsIncluded && (
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginBottom: "5px",
                  paddingBottom: "5px",
                }}
              >
                What's Included
              </div>
              <div>
                {data?.whatsIncluded.split(";").map((item) => (
                  <li
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      marginBottom: "5px",
                      position: "relative",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </div>
            </div>
          )}

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
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#3C3C3C",
                  }}
                >
                  {data?.checkIn}
                </span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>
                Check Out
                <br />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#3C3C3C",
                  }}
                >
                  {data?.checkOut}
                </span>
              </div>
            </div>
            <PropertyRules />
          </div>

          {data?.cancellationPoints && (
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginBottom: "5px",
                  paddingBottom: "5px",
                }}
              >
                Cancellation Policy
              </div>
              {data?.cancellationPoints.split(";").map((item) => (
                <li
                  style={{
                    fontSize: "14px",
                    color: "#333",
                    marginBottom: "5px",
                    position: "relative",
                  }}
                >
                  {item}
                </li>
              ))}
            </div>
          )}
          <div className="ipsSurroundings">
            <h5>Hotel surroundings *</h5>
            <div>
              <div>
                <div>
                  <DirectionsWalk /> What's nearby
                </div>
                <div>
                  {data?.whatsNearby?.map((m) => (
                    <div>
                      <div style={{ fontSize: "14px" }}>{m}</div>
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
                      <div style={{ fontSize: "14px" }}>{m}</div>
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
                      <div style={{ fontSize: "14px" }}>{m}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaymentBox
          data={data}
          isTrekPage={false}
          roomsCount={roomsCount}
          setRoomsCount={setRoomsCount}
          numberOfPeople={numberOfPeople}
          setNumberOfPeople={setNumberOfPeople}
          currentBookingMiniDate={startDate}
          setCurrentBookingDate={setStartDate}
          fromIndividualPeacefulStays={true}
          isPaymentProcessing={isPaymentProcessing}
          name={data?.name}
          displayRazorpay={displayRazorpay}
          maxRooms={data?.numRooms}
          maxPeople={data?.maxPeople}
          bookingNumber={bookingNumber}
          setBookingNumber={setBookingNumber}
          bookingEmail={bookingEmail}
          setBookingEmail={setBookingEmail}
        />
      </div>
    </div>
  );
}
