import {
  AddCircleOutlineRounded,
  ArrowForward,
  ArrowRight,
  Cancel,
  Check,
  Done,
  KeyboardArrowDownRounded,
  LocationOn,
  Star,
} from "@material-ui/icons";
import LuggageIcon from "@mui/icons-material/Luggage";
import HikingIcon from "@mui/icons-material/Hiking";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { useParams } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import Nav from "../Navbar/Nav";
import "./individualTrek.css";
import DatePicker from "react-date-picker";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import PopularTrekCards from "../Popular Treks/PopularTrekCards";
import Modal from "react-modal";

import Calender from "../../Images/calendar.png";
import Mountain1 from "../../Images/mountain (1).png";
import Graph from "../../Images/graph.png";
import Trekking from "../../Images/trekking.png";
import Users from "../../Images/users.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FinalBaner from "../../Images/finalBaner.jpg";
import Whatsapp from "../../Images/whatsapp.png";
import PhoneCall from "../../Images/phone-call.png";
import CheckImg from "../../Images/check.png";
import emailjs from "@emailjs/browser";

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

const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const img =
  "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png";
export default function IndividualTrek() {
  const [individualSliderImages, setIndividualSliderImages] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();
  const [value, onChange] = useState(new Date());
  const [adult, setAdults] = useState(1);
  const [data, setData] = useState();
  const { id } = useParams();
  const [mobileError, setMobileError] = useState("");
  const [day, setDay] = useState(1);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingNumber, setBookingNumber] = useState("");
  const [currentBookingDate, setCurrentBookingDate] = useState();
  const [currentBookingMiniDate, setCurrentBookingMiniDate] = useState();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState("");
  const [isPackageSelect, setIsPackageSelected] = useState(false);
  const [packagePrice, setPackagePrice] = useState();
  const [suggestionId, setSuggestionId] = useState("");
  const [suggestedData, setSuggestedData] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState();
  const [activeNav, setActiveNav] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const gallaryRef = useRef(null);
  const destinationRef = useRef(null);
  const highlightRef = useRef(null);
  const inclusionRef = useRef(null);
  const itineraryRef = useRef(null);
  const overviewRef = useRef(null);
  const faqRef = useRef(null);

  const navigate = useNavigate();

  const [state, handleSubmit] = useForm("xqknrppk");
  // if (state.succeeded) {
  //   return <p>Thanks for joining!</p>;
  // }

  //setting trek email for booking
  useEffect(() => {
    setBookingEmail(user?.email);
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "gallary") {
              setActiveNav(1);
            } else if (entry.target.id === "destination") {
              setActiveNav(2);
            } else if (entry.target.id === "highlights") {
              setActiveNav(3);
            } else if (entry.target.id === "overview") {
              setActiveNav(4);
            } else if (entry.target.id === "itinerary") {
              setActiveNav(5);
            } else if (entry.target.id === "inclusion") {
              setActiveNav(6);
            } else if (entry.target.id === "faq") {
              setActiveNav(7);
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    if (gallaryRef.current) observer.observe(gallaryRef.current);
    if (destinationRef.current) observer.observe(destinationRef.current);
    if (highlightRef.current) observer.observe(highlightRef.current);
    if (inclusionRef.current) observer.observe(inclusionRef.current);
    if (itineraryRef.current) observer.observe(itineraryRef.current);
    if (overviewRef.current) observer.observe(overviewRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => {
      if (gallaryRef.current) observer.unobserve(gallaryRef.current);
      if (destinationRef.current) observer.unobserve(destinationRef.current);
      if (highlightRef.current) observer.unobserve(highlightRef.current);
      if (inclusionRef.current) observer.unobserve(inclusionRef.current);
      if (overviewRef.current) observer.unobserve(overviewRef.current);
      if (highlightRef.current) observer.unobserve(highlightRef.current);
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);

  //fetching trek details

  useEffect(() => {
    const terms = ["short", "long", "isolated"];
    const terms2 = ["trek", "winter", "multiday", "spiritual"];
    console.log("id->", id);

    const checkingId = id.substring(id.indexOf("="));
    if (
      !terms.some((term) => checkingId.includes(term)) &&
      !terms2.some((term) => checkingId.includes(term))
    ) {
      console.log(id, ">>>>><<<<<");
      setSuggestionId("All Trek");
      const trekData = db
        .collection("All Trek")
        .doc(id)
        .get()
        .then((snapshot) => {
          let data = {
            d: snapshot.data()?.Details,
          };
          setData(data.d);
        });
    } else if (terms.some((term) => checkingId.includes(term))) {
      setSuggestionId("All Short-Long-Isolated Trek");
      const trekData = db
        .collection("All Short-Long-Isolated Trek")
        .doc(id.substring(0, id.indexOf("=")))
        .get()
        .then((snapshot) => {
          let data = {
            d: snapshot.data()?.Details,
          };
          setData(data.d);
        });
    } else if (checkingId.toLowerCase().includes("winter")) {
      setSuggestionId("All Winter Trek");

      const finalData = id.replace("%", " ").substring(0, id.indexOf("="));

      const trekData = db
        .collection("All Winter Trek")
        .doc(finalData)
        .get()
        .then((snapshot) => {
          let data = {
            d: snapshot.data()?.Details,
          };
          setData(data.d);
        });
    } else if (checkingId.toLowerCase().includes("trek")) {
      setSuggestionId("All Trek");

      const finalData = id.replace("%", " ").substring(0, id.indexOf("="));

      const trekData = db
        .collection("All Trek")
        .doc(finalData)
        .get()
        .then((snapshot) => {
          let data = {
            d: snapshot.data()?.Details,
          };
          setData(data.d);
        });
    } else if (checkingId.toLowerCase().includes("multiday")) {
      console.log("we are inside multiday");
      setSuggestionId("All MultiDay");
      const finalData = id.replace("%", " ").substring(0, id.indexOf("="));
      console.log(finalData, "<<<<<");
      const trekData = db
        .collection("All MultiDay")
        .doc(finalData)
        .get()
        .then((snapshot) => {
          let data = {
            d: snapshot.data()?.Details,
          };
          setData(data.d);
        });
    } else if (checkingId.toLowerCase().includes("spiritual")) {
      setSuggestionId("All Spiritual");
      const finalData = id.replace("%", " ").substring(0, id.indexOf("="));

      const trekData = db
        .collection("All Spiritual Trek")
        .doc(finalData)
        .get()
        .then((snapshot) => {
          let data = {
            d: snapshot.data()?.Details,
          };
          setData(data.d);
        });
    }
  }, []);

  useEffect(() => {
    console.log(data, "MMMM");
  }, [data]);

  useEffect(() => {
    if (individualSliderImages?.length === 0) {
      const sliderImagesData = db
        .collection("individualSliderImages")
        .doc(data?.name)
        .collection("images")
        .get()
        .then((snapshot) => {
          const arr = [];
          snapshot.docs.forEach((doc) => {
            arr.push(doc.data().banner);
            console.log(snapshot.docs.length, ">>>>><<<<<<");
            if (arr.length === snapshot.docs.length) {
              setIndividualSliderImages(arr);
            }
          });
        });
    }
  });

  useEffect(() => {
    if (suggestionId != "") {
      const trekData = db
        .collection(suggestionId)
        .get()
        .then((snapshot) => {
          let d = [];
          snapshot.docs.forEach((snap) => {
            d.push(snap.data());
            if (d.length === snapshot.docs.length) {
              setSuggestedData(d);
            }
          });
        });
    }
  }, [suggestionId]);

  // get current date
  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    setCurrentBookingDate(today);
    setCurrentBookingMiniDate(today);
  });

  // payment processing
  async function displayRazorpay(e) {
    e.preventDefault();
    setIsPaymentProcessing(true);
    const mobile = document.querySelector(".mobile");
    if (mobile.value.length === 10) {
      setMobileError("");
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      console.log("in payment option");
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${
          (isPackageSelect ? packagePrice : data?.price) * 100 * adult
        }`,
      });

      const options = {
        key: __DEV__ ? "rzp_test_pJnACGFAMxAceV" : "PRODUCTION_KEY",
        currency: "INR",
        amount: response.data.amount.toString(),
        order_id: response.data.id,
        name: "TreknGo",
        description: "Thank you for booking from us. ",
        image: "http://localhost:3000/logo.png",
        handler: function (response) {
          setConfirmedBookingId(response.razorpay_order_id);
          setIsOrderConfirmed(true);
          const orders = db
            .collection("Orders")
            .doc(bookingEmail)
            .set({
              user: bookingEmail,
            })
            .then(() => {
              db.collection("Orders")
                .doc(bookingEmail)
                .collection("All Orders")
                .add({
                  travelDate: currentBookingDate,
                  date: value,
                  OrderId: response.razorpay_order_id,
                  PaymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  Adults: adult,
                  data: data,
                  email: bookingEmail,
                  number: mobile.value,
                });
            })
            .then(() => {
              var iti = data?.itinerary
                .map((i) => {
                  const c =
                    i.heading.toString() +
                    "&nbsp;" +
                    i.description.toString() +
                    "&nbsp;";
                  return c;
                })
                .toString();
              var params = {
                name: data?.name,
                to_name: bookingEmail,
                booking_id: response.razorpay_order_id,
                email_to: bookingEmail,
                contact_number: mobile.value,
                no_of_people: adult,
                tour_date: currentBookingDate,
                itinerary: iti,
                inclusion: data?.inclusion.toString(),
                exlusion: data?.exclusion.toString(),
                canvas: data?.images[0],
              };

              emailjs
                .send(
                  "service_ot4wueo",
                  "template_9ow97wa",
                  params,
                  "dcAj3UwkMO9oYa0NL"
                )
                .then(
                  (result) => {
                    console.log(result.text);
                  },
                  (error) => {
                    console.log(error.text);
                  }
                );
            });
        },
        prefill: {
          name: "",
          email: bookingEmail,
          contact: mobile.value,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setIsPaymentProcessing(false);
    } else {
      setIsPaymentProcessing(false);
      setMobileError("Please enter a valid number");
    }
  }

  const returnFormattedDate = (date) => {
    const d = new Date(date).toDateString();
    return d.substring(3);
    // return date.toDateString
  };

  const chooseFromExistingDates = (i) => {
    const dateContainer = document.querySelectorAll(".eachDateContainer img");
    dateContainer.forEach((d) => {
      d.src = "https://cdn-icons-png.flaticon.com/512/148/148764.png";
    });

    if (
      dateContainer[i].src ===
      "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
    ) {
      dateContainer[i].src =
        "https://cdn-icons-png.flaticon.com/512/148/148764.png";
    } else {
      dateContainer[i].src =
        "https://cdn-icons-png.flaticon.com/512/1828/1828843.png";
    }
  };

  const ExistingDates = () => (
    <>
      <div name="Dates" id="dates">
        {data.allDates.map((d, i) => (
          <div
            className="eachDateContainer"
            onClick={(e) => chooseFromExistingDates(i)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/148/148764.png"
              alt=""
            />
            <div>
              {returnFormattedDate(d.startDate)} to{" "}
              {returnFormattedDate(d.endDate)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
  useEffect(() => {
    const dates = document.querySelector("#dates");
    // if (data?.allDates?.length > 0) {
    //   for (let i = 0; i < data?.allDates?.length; i++) {
    //     const options = document.createElement("option");
    //     options.value = data?.allDates[i]?.startDate;
    //     options.innerHTML = data?.allDates[i]?.startDate;
    //     dates.append(options);
    //   }
    // }
  }, [data, addonsPrice]);

  const addAddon = (e, id) => {
    const addOndata = document.querySelector(`#addOndata${id}`);
    if (parseInt(addOndata.innerHTML) >= 0) {
      addOndata.innerHTML = parseInt(addOndata.innerHTML) + 1;
      const price = addonsPrice + parseInt(e.price);
      console.log(price);
      setAddonsPrice(() => price);
    }
  };
  const removeAddon = (e, id) => {
    const addOndata = document.querySelector(`#addOndata${id}`);
    if (parseInt(addOndata.innerHTML) >= 1) {
      addOndata.innerHTML = parseInt(addOndata.innerHTML) - 1;
      const price = addonsPrice - parseInt(e.price);
      setAddonsPrice(() => price);
    }
  };

  const handleAddOnOpen = () => {
    // document.removeEventListener("mouseup");
    document
      .querySelector(".addOnContainer")
      .classList.toggle("addOnContainerActive");
  };

  const Loader = () => <div className="loader"></div>;
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  useEffect(() => {
    const enquiryDiv = document.getElementById("knowMoreFormDetails");
    var foo = getParameterByName("scrollTo");
    if (foo === "enquiry") {
      enquiryDiv.scrollIntoView(false);
    }
  }, []);
  const handleOrderConfirmationBox = () => {
    setIsOrderConfirmed(false);
    setConfirmedBookingId("");
    if (user) {
      navigate("/orders");
    } else {
      navigate("/");
    }
  };

  const handlePackageChange = (e) => {
    const data = JSON.parse(e.target.value);
    setIsPackageSelected(true);
    setPackagePrice(data?.price);
  };

  useEffect(() => {
    const checkingg = document.querySelector("#checkingg");
    if (checkingg) checkingg.value = currentBookingDate;
  }, [currentBookingDate]);

  function openModal(img, index) {
    setIsOpen(true);
    setSelectedModalImage(img);
    setSelectedImgIndex(index);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedModalImage("");
  }

  const prevImage = () => {
    setSelectedImgIndex(
      (prevIndex) => (prevIndex - 1 + data?.images.length) % data?.images.length
    );
  };

  const nextImage = () => {
    setSelectedImgIndex((prevIndex) => (prevIndex + 1) % data?.images.length);
  };

  function setFixedImageDimensions(htmlString, width = 300, height = 200) {
    if (!htmlString) return "";

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlString, "text/html");

    const images = htmlDoc.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
      images[i].width = width;
      images[i].height = height;
      images[i].style.borderRadius = "4px";
      images[i].style.objectFit = "cover";
    }

    return htmlDoc.body.innerHTML;
  }

  return (
    <div className="individualTrek">
      <div className="imageModal">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <div style={{ float: "right" }} onClick={closeModal}>
            <CancelIcon style={{ color: "white", cursor: "pointer" }} />
          </div>
          <button className="arrow arrowLeft" onClick={prevImage}>
            &lt;
          </button>
          <div className="imageModalContainer">
            <img src={data?.images[selectedImgIndex]} />
          </div>
          <button className="arrow arrowRight" onClick={nextImage}>
            &gt;
          </button>
        </Modal>
      </div>
      {isOrderConfirmed && (
        <div className="orderConfirmationContainer">
          <div>
            <img src={CheckImg} />
          </div>
          <div>
            <h2>Awesome!</h2>
            <p>Your Booking ID: {confirmedBookingId} has been confirmed.</p>
            <p>Check your email for details.</p>
            <button onClick={handleOrderConfirmationBox}>Okay</button>
          </div>
        </div>
      )}
      <div className={isOrderConfirmed ? "orderBoxDisabled" : ""}>
        <div className="bottomButton">
          <a href="#enquiry">
            <button>Send Enquiry</button>
          </a>
          <a href="#bookingDeatils">
            <button>Book Now</button>
          </a>
        </div>
        <div className="backgroundOverlay"></div>
        <div className="individualTopNav">
          <div>
            <a
              className={activeNav == 1 && "activeindividualTopNav"}
              onClick={() => setActiveNav(1)}
              href="#gallary"
            >
              <div>Gallary</div>
            </a>
            <a
              onClick={() => setActiveNav(2)}
              className={activeNav == 2 && "activeindividualTopNav"}
              href="#destination"
            >
              <div>Destination Brief</div>
            </a>
            <a
              className={activeNav == 3 && "activeindividualTopNav"}
              onClick={() => setActiveNav(3)}
              href="#highlights"
            >
              <div>Highlights</div>
            </a>
            <a
              className={activeNav == 4 && "activeindividualTopNav"}
              onClick={() => setActiveNav(4)}
              href="#overview"
            >
              <div>Overview</div>
            </a>
            <a
              className={activeNav == 5 && "activeindividualTopNav"}
              onClick={() => setActiveNav(5)}
              href="#itinerary"
            >
              <div>Itinerary</div>
            </a>
            <a
              className={activeNav == 6 && "activeindividualTopNav"}
              onClick={() => setActiveNav(6)}
              href="#inclusion"
            >
              <div>Inclusion/Exclusion</div>
            </a>
            <a
              className={activeNav == 7 && "activeindividualTopNav"}
              onClick={() => setActiveNav(7)}
              href="#faq"
            >
              <div>FAQ</div>
            </a>
          </div>
        </div>
        <div>
          {/* <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={img}
          /> */}
          <div
            id="gallary"
            className="gallaryGrid scroll-target"
            ref={gallaryRef}
          >
            <div>
              <img
                onClick={() => openModal(data?.images[3], 3)}
                src={data?.images[3]}
                alt=""
              />
              <img
                onClick={() => openModal(data?.images[4], 4)}
                src={data?.images[4]}
                alt=""
              />
              <img
                onClick={() => openModal(data?.images[5], 5)}
                src={data?.images[5]}
                alt=""
              />
              <img
                onClick={() => openModal(data?.images[6], 6)}
                src={data?.images[6]}
                alt=""
              />
              <img
                onClick={() => openModal(data?.images[7], 7)}
                src={data?.images[7]}
                alt=""
              />
              <img
                onClick={() => openModal(data?.images[8], 8)}
                src={data?.images[8]}
                alt=""
              />
            </div>
            <div className="availableCategoriesContainer">
              <div className="availableCategories">
                <div>
                  {data?.allSelectedCategory &&
                    data?.allSelectedCategory.map((m) => (
                      <div>
                        {m === "Trek"
                          ? "Popular Trek"
                          : m.includes("Trek")
                          ? m
                          : `${m} Trek`}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="destination"
          ref={destinationRef}
          className="individualTrekTop scroll-target"
        >
          <div className="individualTrekTopLeft">
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 className="trekNameMain">{data?.name}</h3>
                <div>
                  <span>
                    <div
                      className="star"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Star />
                      <div>{data?.rating ? `${data?.rating}/5` : "5/5"}</div>
                    </div>
                  </span>
                  <span>{data?.duration}</span>
                </div>
              </div>
              {/* <div className="topPrice">
                <div>Starting from</div>
                <div style={{ color: "#367954" }}>
                  <span>₹</span>
                  {data?.price}
                </div>
                <div>per adult</div>
              </div> */}
            </div>
            <div className="locationAndDifficulty">
              <span>
                <LocationOn /> {data?.area}
              </span>
            </div>

            <div className="trekFeatures">
              <div className="extraTrekDetails">
                <div>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/2072/2072317.png"
                    }
                  ></img>
                  <div>
                    <div>Max Altitude</div>

                    <div style={{ color: "#ff5e00" }}>{data?.maxAltitude}m</div>
                  </div>
                </div>
                <div>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/738/738881.png"
                    }
                  ></img>
                  <div>
                    <div>Grade</div>
                    <div style={{ color: "#ff5e00" }}>{data?.difficulty}</div>
                  </div>
                </div>
                <div>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/1974/1974119.png"
                    }
                  ></img>
                  <div>
                    <div>Trekking KM</div>
                    <div style={{ color: "#ff5e00" }}>{data?.trekkingKm}km</div>
                  </div>
                </div>
                <div>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/2773/2773319.png"
                    }
                  ></img>
                  <div>
                    <div>Duration</div>
                    <div style={{ color: "#ff5e00" }}>{data?.duration}</div>
                  </div>
                </div>
              </div>
              {/* <section
                style={{ display: "flex" }}
                className="supportBoxContainer"
              >
                <div className="supportBox">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send?phone=9654749746",
                        "_blank"
                      )
                    }
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img src={PhoneCall} style={{ marginRight: "10px" }} />
                      <img src={Whatsapp} />
                    </div>
                  </div>
                </div>
              </section> */}

              {/* <div className="availableCategories">
                <div></div>
                <div>
                  {data?.allSelectedCategory &&
                    data?.allSelectedCategory.map((m) => (
                      <div>
                        {m === "Trek"
                          ? "Popular Trek"
                          : m.includes("Trek")
                          ? m
                          : `${m} Trek`}
                      </div>
                    ))}
                </div>
              </div> */}
            </div>
          </div>
          <div className="individualTrekTopRight">
            {/* <div className="payfullBookNowButton individualTrekTopRightContent">
              <div className="individualTrekTopRightContentHeading">
                Starting from{" "}
                <span
                  style={{
                    fontSize: "14px",
                    textDecoration: "line-through",
                    color: "gray",
                  }}
                >
                  INR {data?.price}
                </span>
              </div>
              <div
                className="individualTrekTopRightContentFees"
                style={{ alignItems: "center", margin: "5px 0" }}
              >
                <div>
                  <span>INR {Math.floor(data?.price / 4)}</span>
                </div>
                <div>
                  <div></div>
                  <div></div>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    padding: "8px 12px",
                    background: "#fff5db",
                    borderRadius: "4px",
                    color: "#ff5e00",
                  }}
                >
                  {data?.discountValue || "75%"} off
                </div>
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                }}
              >
                Per person
              </div>
              <div>
                <a
                  href="#inclusion"
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    color: "#ee5c36",
                  }}
                >
                  See Inclusion/Exclusion
                </a>
              </div>
              <div>
                <a
                  href="#CancellationPolicy"
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    color: "#ee5c36",
                  }}
                >
                  See Cancellation Policy
                </a>
              </div>
              <a
                href={
                  data?.isBookingAvailable === "Enquiry"
                    ? "#enquiry"
                    : "#bookingDeatils"
                }
                style={{ color: "white" }}
              >
                <button style={{ marginTop: "10px" }}>
                  {data?.isBookingAvailable != "Enquiry"
                    ? "Book Now"
                    : "Enquire Now"}
                </button>
              </a>
              <p style={{ fontSize: "12px", color: "grey" }}>
                T&C - Pay full amount
              </p>
            </div> */}
            <div className="payfullBookNowButton individualTrekTopRightContent">
              <div className="individualTrekTopRightContentHeading">
                Starting from{" "}
                <span
                  style={{
                    fontSize: "14px",
                    textDecoration: "line-through",
                    color: "gray",
                  }}
                >
                  INR {data?.price}
                </span>
              </div>
              {data?.discountValue !== "no" && (
                <div
                  className="individualTrekTopRightContentFees"
                  style={{ alignItems: "center", margin: "5px 0" }}
                >
                  <div>
                    <span>
                      INR{" "}
                      {data?.discountValue
                        ? Math.floor(
                            (data?.price *
                              (100 - parseInt(data?.discountValue))) /
                              100
                          )
                        : Math.floor(data?.price / 2)}{" "}
                      /-
                    </span>
                  </div>
                  <div>
                    <div></div>
                    <div></div>
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      padding: "8px 12px",
                      background: "#fff5db",
                      borderRadius: "4px",
                      color: "#ff5e00",
                    }}
                  >
                    {data?.discountValue || "50"}% off
                  </div>
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                }}
              >
                Per person
              </div>
              <div>
                <a
                  href="#inclusion"
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    color: "#ee5c36",
                  }}
                >
                  See Inclusion/Exclusion
                </a>
              </div>
              <div>
                <a
                  href="#CancellationPolicy"
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    color: "#ee5c36",
                  }}
                >
                  See Cancellation Policy
                </a>
              </div>
              <a
                href={
                  data?.isBookingAvailable === "Enquiry"
                    ? "#enquiry"
                    : "#bookingDeatils"
                }
                style={{ color: "white" }}
              >
                <button style={{ marginTop: "10px" }}>
                  {data?.isBookingAvailable !== "Enquiry"
                    ? "Book Now"
                    : "Enquire Now"}
                </button>
              </a>
              <p style={{ fontSize: "12px", color: "grey" }}>
                T&C - Pay full amount
              </p>
            </div>
          </div>
        </div>
        <div className="trying">
          <div>
            {data?.allDates && data?.allDates?.length > 0 && (
              <div className="existingDatesContianer">
                <div>AVAILABLE BATCHES</div>
                <div>
                  <ExistingDates />
                </div>
              </div>
            )}
            {data?.isBookingAvailable != "Enquiry" ||
            data?.isBookingAvailable === null ? (
              <div id="bookingDeatils" className="trekBooking">
                <h2>BOOKING</h2>
                <div>
                  <h3>Trekking Fee</h3>
                  <h2>
                    INR{" "}
                    {isPackageSelect
                      ? parseInt(data?.price) + parseInt(packagePrice)
                      : data?.price}
                    /-
                  </h2>
                  <h5>ratings</h5>
                </div>
                <div className="dateAndAdult">
                  <div>
                    {data?.allDates && data?.allDates?.length > 1 ? null : (
                      <>
                        <h5>Select Date</h5>
                        <input
                          type="date"
                          id="checkingg"
                          min={currentBookingMiniDate}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <h5>Adult</h5>
                    <div className="adultPicker">
                      <div
                        onClick={() => setAdults(adult + 1)}
                        className="addAdults"
                      >
                        +
                      </div>
                      <div>{adult}</div>
                      <div
                        onClick={() => {
                          if (adult > 1) setAdults(adult - 1);
                        }}
                        className="addAdults"
                      >
                        -
                      </div>
                    </div>
                  </div>
                </div>
                {data?.addone ? (
                  <>
                    <div className="addonDetails">
                      <h4 onClick={handleAddOnOpen}>
                        Add Ons <KeyboardArrowDownRounded />
                      </h4>
                      <div className="addOnContainer" id="addOnContainerId">
                        {data?.addone?.map((e, id) => (
                          <div className="addOnsCheckboxContainer">
                            <div className="addOnsCheckbox">
                              <div>
                                {e?.name} ({`${e?.price}/-`})
                              </div>
                              <div>
                                <DoneIcon
                                  key={`add${id}`}
                                  onClick={() => addAddon(e, id)}
                                />
                                <CancelIcon
                                  key={`remove${id}`}
                                  onClick={() => removeAddon(e, id)}
                                />
                                <div
                                  className="addAdults"
                                  id={`addOndata${id}`}
                                >
                                  0
                                </div>
                              </div>
                            </div>
                            <div className="isAddonAdded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <form onSubmit={displayRazorpay} className="bookingDeatils">
                  <div>
                    <input
                      type="number"
                      className="mobile"
                      minLength={10}
                      maxLength={10}
                      style={{ marginLeft: "1rem" }}
                      placeholder="number"
                      value={bookingNumber}
                      onChange={(e) => setBookingNumber(e.target.value)}
                      required
                    ></input>
                    <input
                      type="email"
                      className="mobile"
                      style={{ marginLeft: "1rem" }}
                      placeholder="email"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div>
                    <h5>Total Amount</h5>
                    <div>
                      {addonsPrice +
                        adult *
                          parseInt(
                            isPackageSelect ? packagePrice : data?.price
                          )}{" "}
                      INR
                    </div>
                  </div>
                  <h4 style={{ color: "Red" }}>{mobileError}</h4>
                  <div className="bookTrekButton">
                    <button type="submit">
                      {isPaymentProcessing ? (
                        <Loader />
                      ) : user ? (
                        "Book Now"
                      ) : (
                        "Book as guest"
                      )}
                    </button>
                  </div>
                  <div className="bookTrekButton">
                    <button>Support</button>
                  </div>
                </form>
              </div>
            ) : null}
            <div id="enquiry" className="knowMoreForm">
              <form action="https://formspree.io/f/xqknrppk" method="POST">
                <h5>
                  <span>Enquire About</span>{" "}
                  <span style={{ color: "#ff5e00" }}>{data?.name}</span>
                </h5>
                <div>
                  <input id="name" name="name" type="text" placeholder="Name" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                  />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="Date Of Travel"
                  />
                  <input
                    type="text"
                    id="NoOfPeople"
                    name="NoOfPeople"
                    placeholder="Number of People"
                  />
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Message"
                  />
                </div>
                <div id="knowMoreFormDetails" className="knowMoreFormDetails">
                  <div>
                    <Done /> We assure the privacy of your contact data.
                  </div>
                  <div>
                    <Done /> This data will only be used by our team to contact
                    you and no other purposes.
                  </div>
                </div>
                <button type="submit">Send Enquiry</button>
              </form>
            </div>
            <div className="taxExtra">
              <div>Tax Extra</div>
              <hr />
              <div>5% GST on TREK FEE</div>
            </div>
            <div className="groupDiscount">
              <div>GROUP DISCOUNTS</div>
              <hr />
              <div>
                Book for 5 persons and more to avail 10% Group Discount on any
                scheduled Fixed Departure trek.
              </div>
            </div>
          </div>
          <div>
            {data?.packagesOption && (
              <div className="packageOptionBigContainer">
                {data?.packagesOption && (
                  <div>
                    <h3>Select Package</h3>
                  </div>
                )}
                <div className="availablePackageOptionsContainer">
                  {data?.packagesOption?.map((p) => (
                    <div className="availablePackageOptions">
                      <div className="extraPackage"></div>
                      <div className="availablePackageOptionsDetails">
                        <input
                          type="radio"
                          id="huey"
                          name="drone"
                          value={JSON.stringify({
                            price: p?.price,
                            description: p?.description,
                          })}
                          onChange={(e) => handlePackageChange(e)}
                        />
                        <div>
                          <div>
                            <div style={{ fontSize: "18px" }}>
                              {p?.description}
                            </div>
                            <div style={{ fontSize: "14px", color: "gray" }}>
                              {data?.duration}
                            </div>
                          </div>

                          <label
                            style={{ marginLeft: ".2rem", color: "#ff5e00" }}
                          >
                            INR/- {p?.price} per adult
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="individualTrekHighlight">
              <div
                id="highlights"
                style={{ flex: "1 1 40rem" }}
                ref={highlightRef}
                className="scroll-target"
              >
                {" "}
                <h3>Highlights of the trek</h3>
                <div>
                  {data?.highlights && (
                    <li
                      style={{ listStyle: "none" }}
                      dangerouslySetInnerHTML={{ __html: data?.highlights }}
                    ></li>
                  )}
                </div>
              </div>
            </div>
            <div
              id="overview"
              className="overViewContainer scroll-target"
              ref={overviewRef}
            >
              <h3>Overview</h3>
              <div>
                <div>
                  <li>
                    <div>Route :</div>
                    <div>{data?.route}</div>
                  </li>
                  <li>
                    <div> Accommodation : </div>
                    <div>{data?.accommodation}</div>
                  </li>
                  <li>
                    <div>Duration :</div> <div>{data?.duration}</div>
                  </li>
                  <li>
                    <div>Transport :</div> <div>{data?.transport}</div>
                  </li>
                  <li>
                    <div> Meal : </div>
                    <div>{data?.meal}</div>
                  </li>
                </div>
              </div>
            </div>
            <div
              id="itinerary"
              className="itnerary scroll-target"
              ref={itineraryRef}
            >
              <h3>Itinerary</h3>
              <Accordion allowZeroExpanded="true">
                {data?.itinerary.map((i, index) => (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <AddCircleOutlineRounded />{" "}
                        <span style={{ fontWeight: 500 }}>
                          {" "}
                          Day {index + 1}{" "}
                        </span>
                        : {i?.heading}
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <h3>{i?.heading}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: setFixedImageDimensions(i?.description),
                        }}
                      ></p>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div
              id="inclusion"
              className="InclusionExclusionThingsToCarry scroll-target"
              ref={inclusionRef}
            >
              <div className="inclusion">
                <h3>Inclusion</h3>
                <div>
                  {data?.inclusion.map((i) => (
                    <li>
                      <Check style={{ color: "green" }} />
                      <p>{i}</p>
                    </li>
                  ))}
                </div>
              </div>
              <div>
                <h3>Exclusion</h3>
                <div>
                  {data?.exclusion.map((i) => (
                    <li>
                      <Cancel style={{ color: "Red" }} />
                      <p>{i}</p>
                    </li>
                  ))}
                </div>
              </div>
              <div>
                <h3>Things To Carry</h3>
                <div>
                  {data?.carry.map((i) => (
                    <li>
                      <ArrowForward style={{ color: "#ff5e00" }} />
                      <p>{i}</p>
                    </li>
                  ))}
                </div>
              </div>
              {/* <div className="carryThingOuterContainer">
                <h3>Things To Carry</h3>
                <div className="carrythingsContainer">
                  <img src={FinalBaner} />
                </div>
              </div> */}
            </div>
            {individualSliderImages?.length ? (
              <div className="moreToKnowSlides">
                <div>
                  <h3>More To Know</h3>
                </div>

                <Splide
                  options={{
                    perPage: 1,
                    rewind: true,
                    perMove: 1,
                    loop: true,
                    pagination: true,
                    heightRatio: 0.5,
                    arrows: false,
                  }}
                  aria-label="more to know"
                >
                  {individualSliderImages?.length > 0 &&
                    individualSliderImages?.map((m) => (
                      <SplideSlide>
                        <img src={m} alt="" />
                      </SplideSlide>
                    ))}
                </Splide>
              </div>
            ) : null}

            {data?.faq ? (
              <>
                <div id="faq" className="itnerary scroll-target" ref={faqRef}>
                  <h3>Faq</h3>
                  <div className="faqAllContainer">
                    <div class="wrapper">
                      <div class="faqcontainer">
                        <div class="faq-group">
                          {data?.faq.map((i, index) => (
                            <div class="faq-row">
                              <div class="wrap-collapsible">
                                <input
                                  class="toggle"
                                  type="checkbox"
                                  id={
                                    index === 0
                                      ? "collapsible"
                                      : `collapsible-${index}`
                                  }
                                />
                                <label
                                  class="label-toggle"
                                  for={
                                    index === 0
                                      ? "collapsible"
                                      : `collapsible-${index}`
                                  }
                                >
                                  {"Q"}
                                  {index + 1}
                                  {") "}
                                  {i?.question}
                                </label>
                                <div class="collapsible-content">
                                  <div class="content-inner">
                                    <p>{i?.answer}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div id="itinerary" className="itnerary">
                <h3>Faq</h3>
                <div className="faqAllContainer">
                  <div class="wrapper">
                    <div class="container">
                      <div class="faq-group">
                        <div class="faq-row">
                          <div class="wrap-collapsible">
                            <input
                              class="toggle"
                              type="checkbox"
                              id="collapsible"
                            />
                            <label class="label-toggle" for="collapsible">
                              Manage and Grow Your Business Online
                            </label>
                            <div class="collapsible-content">
                              <div class="content-inner">
                                <p>
                                  We offer over 200 Apps and services you can
                                  add to your website, like Bookings, Stores,
                                  Forum, Restaurants, Events, easy email
                                  marketing and more. No matter what your
                                  website or business needs are—you can manage
                                  it all in one place.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="faq-row">
                          <div class="wrap-collapsible">
                            <input
                              class="toggle"
                              type="checkbox"
                              id="collapsible-2"
                            />
                            <label class="label-toggle" for="collapsible-2">
                              Get Inspired by Other Sites Made
                            </label>
                            <div class="collapsible-content">
                              <div class="content-inner">
                                <p>
                                  Choose from over 500 stunning templates or
                                  start from scratch. Customize anything with
                                  drag and drop to look exactly the way you
                                  want. Make your website stand out with design
                                  features like media galleries, video
                                  backgrounds, parallax scroll, animation and
                                  more.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="faq-row">
                          <div class="wrap-collapsible">
                            <input
                              class="toggle"
                              type="checkbox"
                              id="collapsible-3"
                            />
                            <label class="label-toggle" for="collapsible-3">
                              5 Essential Tools to Use With Your Business Site
                            </label>
                            <div class="collapsible-content">
                              <div class="content-inner">
                                <p>
                                  Whether you want to display your photography
                                  portfolio, open an online store, or build a
                                  site for your hotel and accept reservations,
                                  Wix has something for you.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="CancellationPolicy" className="cancelationPolicy">
          <div>
            <h3>Cancellation Policy</h3>
            <div className="cancelationPolicyDetails">
              <div>
                <p>30 - ∞ Days</p>
                <div></div>
                <p>25% Deduction</p>
              </div>
              <div>
                <p>15 - 29 Days</p>
                <div></div>
                <p>50% Deduction</p>
              </div>
              <div>
                <p>0 - 15 Days</p>
                <div></div>
                <p>100% Deduction</p>
              </div>
            </div>
          </div>
        </div>
        {data?.importantNotes ? (
          <div className="importantNote">
            <div className="importantNoteContainer">
              <h4>Important Note</h4>
              {data?.importantNotes.map((e) => (
                <p dangerouslySetInnerHTML={{ __html: e }}></p>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="importantNote">
              <div className="importantNoteContainer">
                <h4>Important Note</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Possimus quibusdam distinctio voluptatem aperiam ducimus cum
                  ex ullam, natus optio voluptas.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Possimus quibusdam distinctio voluptatem aperiam ducimus cum
                  ex ullam, natus optio voluptas.
                </p>
              </div>
            </div>
          </>
        )}
        <div className="suggestionForYou">
          <div className="popularTreksHeading">Suggestions For You</div>
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
              {suggestedData
                ?.filter((item, index) => index < 4)
                .map((d) => (
                  <SplideSlide>
                    <PopularTrekCards data={d?.Details} />
                  </SplideSlide>
                ))}
            </Splide>
          </div>
        </div>
      </div>
    </div>
  );
}
