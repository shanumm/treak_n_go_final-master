import React, { useEffect, useState } from "react";
import Filter from "../../Components/Filter";
import { Link, useParams } from "react-router-dom";
import "./peacefulstays.css";
import { Star } from "@material-ui/icons";
import { LocationOn } from "@mui/icons-material";
import { db } from "../../firebase";
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

export default function PeacefulStays() {
  const [categoryFilter, setCategoryFilter] = useState("AllCategory");
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [campData, setCampData] = useState();
  const [getLocationFilter, setLocationFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const handleNameFilter = (e) => {
    console.log(e);
    setNameFilter(e.target.value);
  };

  const image1 =
    "https://cdn.pixabay.com/photo/2016/10/14/19/21/canyon-1740973_960_720.jpg";
  const image2 =
    "https://cdn.pixabay.com/photo/2021/08/12/10/38/mountains-6540497_960_720.jpg";

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

  const { id } = useParams();
  useEffect(() => {
    const name = id.charAt(0).toUpperCase() + id.slice(1);
    const data = db
      .collection(`All ${name}`)
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
  }, [id]);
  useEffect(() => {
    var locations = [];
    if (campData?.length > 0) {
      campData?.forEach((c) => {
        if (locations.indexOf(c.Details.area) === -1) {
          locations.push(c.Details.area);
        }
      });
    }

    setUniqueLocations(locations);
  }, [campData]);

  const filterLocation = (location) => {
    setLocationFilter(location);
  };

  const PeacefulStayComponent = ({ data, i }) => (
    <Link to={`/stays/${id}-${data?.Details?.name}`}>
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
                if (!matchedAmenity) {
                  return null; // Return null if no matching amenity is found
                }

                return (
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
                );
              })}
          </div>
          <div style={{ color: "gray", fontSize: "14px" }}>
            {Math.floor(Math.random() * (50 - 10 + 1)) + 10} people are looking
            at this deal
          </div>
        </div>

        <div>
          <div>
            <div>
              <div>Good</div>
              <div>{5367 + i * 13} reviews</div>
            </div>
            <div>{data?.Details?.rating ? data?.Details?.rating : "4.5"}</div>
          </div>

          <div className="peacefulStayPageStartingFrom">
            <div>INR {data?.Details?.price}/-</div>
            <div>Starting From (per night / 2 adults)</div>
          </div>
          <div>
            <Link to={`/stays/${id}-${data?.Details?.name}`}>
              <button>Show Details</button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="peacefulStayPage">
      <div className="peacefulStayPageTop">
        <img src={image2} alt="" />
      </div>
      <div className="peacefulStayHeadingTop">
        <div
          style={{
            margin: "auto",
            background: "white",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          {id}
        </div>
      </div>
      <div
        className="peacefulStaySubHeadingTop"
        style={{
          textAlign: "center",
          fontSize: "16px",
          color: "gray",
        }}
      >
        <div
          style={{
            margin: "auto",
            background: "white",
            paddingBottom: "10px",
            borderBottomRightRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        >
          {id === "camps"
            ? "Discover Cozy Escapes: Unwind at Our Charming Camps"
            : "Discover Cozy Escapes: Unwind at Our Charming Homestays"}
        </div>
      </div>
      <div className="peacefulStayBottom">
        <div className="treksFilter">
          <div>
            <h3>Locations</h3>
            <div>
              {uniqueLocations?.map((m) => (
                <div>
                  <input
                    type="radio"
                    name="location"
                    value={m}
                    onChange={(e) => {
                      e.target.checked && filterLocation(m);
                    }}
                  />
                  <label for="easy">{m}</label>
                </div>
              ))}
              <div>
                <input
                  type="radio"
                  name="location"
                  value="All"
                  onChange={(e) => {
                    e.target.checked && filterLocation("");
                  }}
                />
                <label for="easy">All</label>
              </div>
            </div>
          </div>
        </div>
        <div className="peacefulStayBottomRight">
          <Filter
            isPeaceful={true}
            handleNameFilter={handleNameFilter}
            nameFilter={nameFilter}
          />
          <div>
            {campData &&
              (getLocationFilter === "" && nameFilter === ""
                ? campData.map((c, i) => (
                    <PeacefulStayComponent data={c} i={i} />
                  ))
                : campData
                    .filter((c) => {
                      if (
                        c.Details.area
                          .toLowerCase()
                          .includes(getLocationFilter.toLowerCase()) &&
                        c.Details.name
                          .toLowerCase()
                          .includes(nameFilter.toLowerCase())
                      ) {
                        return c;
                      }
                    })
                    .map((data) => <PeacefulStayComponent data={data} />))}
          </div>
        </div>
      </div>
    </div>
  );
}
