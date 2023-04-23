import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filter from "../../Components/Filter";
import { db } from "../../firebase";
import AllTreks from "../Treks/AllTreks";
import "./perfectEscape.css";
export default function PerfectEscape() {
  const [alltreks, setAllTreks] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("AllCategory");
  const [dayFilterTrek, setDayFilterTrek] = useState([]);
  const [locationFilterTrek, setLocationFilterTrek] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const trekData = db
      .collection("All Short-Long-Isolated Trek")
      .get()
      .then((snapshot) => {
        let allTrek = [];
        snapshot.docs.forEach((doc) => {
          allTrek.push(doc.data().Details);
          if (allTrek.length === snapshot.docs.length) {
            setAllTreks(allTrek);
          }
        });
      });
  }, []);
  useEffect(() => {
    var dayFilterValue = [];
    var locationFilterValue = [];
    for (let i = 0; i < alltreks?.length; i++) {
      if (dayFilterValue.indexOf(alltreks[i]?.itinerary.length) === -1) {
        dayFilterValue.push(alltreks[i]?.itinerary.length);
      }
    }
    for (let i = 0; i < alltreks?.length; i++) {
      if (locationFilterValue.indexOf(alltreks[i]?.area) === -1) {
        locationFilterValue.push(alltreks[i]?.area);
      }
    }
    setDayFilterTrek(dayFilterValue);
    setLocationFilterTrek(locationFilterValue);
  }, [alltreks]);

  const image1 =
    "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png";
  const image2 =
    "https://cdn.pixabay.com/photo/2021/08/12/10/38/mountains-6540497_960_720.jpg";
  const reviewImage =
    "https://cdn.pixabay.com/photo/2017/02/06/10/54/sad-2042536_960_720.jpg";
  const img =
    "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png";
  return (
    <div className="perfectEscape">
      <div className="perfectEscapeBanner">
        <img src={img} alt="" />
      </div>
      <div className="perfectEscapeTop">
        <div className="perfectEscapeHeading">
          <div>
            <div>
              {id === "shortTreks" && (
                <div>
                  <span>Short</span>{" "}
                  <span style={{ color: "black" }}>Treks</span>
                </div>
              )}
              {id === "longTreks" && (
                <div>
                  <span>Long</span>{" "}
                  <span style={{ color: "black" }}>Treks</span>
                </div>
              )}
              {id === "isolatedTreks" && (
                <div>
                  <span>Isolated</span>{" "}
                  <span style={{ color: "black" }}>Treks</span>
                </div>
              )}
            </div>
            <div className="perfectdes">
              {id === "shortTreks" &&
                "Don't have much time? Don't worry, these short treks can be completed in as little as two days, making them ideal for beginners and a quick weekend getaway."}
              {id === "longTreks" &&
                "Here is a list of the best long treks to get you away from your daily routine and reconnect with yourself by disconnecting from the crowd for a few days in nature's lush paradise full of adventure."}
              {id === "isolatedTreks" &&
                "These are the most stunning off-the-beaten-path hikes on the planet, with untouched and pristine beauty, glistening waterfalls, and breathtaking scenery. Apart from your team members, trees, mountains, waterfalls, streams, grasslands, glaciers, clouds, birds, the galaxy, and possibly some animals, you won't see anyone on these trails. It gives you a life-changing experience."}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="treks">
          <div className="treksBottom">
            <div className="treksFilter">
              <div>
                <h3>Difficulty</h3>
                <div>
                  <div>
                    <input type="radio" name="difficulty" value="easy" />
                    <label for="easy">easy</label>
                  </div>
                  <div>
                    <input type="radio" on name="difficulty" value="moderate" />
                    <label for="moderate">moderate</label>
                  </div>
                  <div>
                    <input type="radio" name="difficulty" value="difficult" />
                    <label for="difficult">Difficult</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="difficulty"
                      value="highly-difficult"
                    />
                    <label for="highly-difficult">highly difficult</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="allTreksContainer">
              <Filter
                dayFilterTrek={dayFilterTrek}
                locationFilterTrek={locationFilterTrek}
              />
              <AllTreks
                id={id}
                data={alltreks}
                escape="escape"
                editSearch={""}
              />
            </div>
          </div>
          {/* <div className="treksGetInTouch">
            <h3>Get In Touch</h3>
            <div>
              <input type="text" placeholder="email/number" />
              <button>Submit</button>
            </div>
          </div> */}
          <div className="trekReviews">
            <h3>Review</h3>
            <div className="reviewContainer">
              <div>
                <div>
                  A year ago, I used Trekngo travel agency to plan a trip to
                  Kheerganga with friends. They stood out for their affordable
                  prices and polite customer service. Available 24/7, they
                  guided us through every step of the journey. I highly
                  recommend Trekngo for their excellent service, making our trip
                  unforgettable. 5 out of 5 stars.
                </div>
                <div className="reviewImage">
                  <img src={reviewImage} alt="" />
                </div>
                <div>
                  <h3>Nikhil Rawat</h3>
                </div>
              </div>
              <div>
                <div>
                  TrekNgo provided an excellent experience with clear
                  communication and support. Our Thatharana trek was
                  unforgettable due to stunning views and attentive guides.
                  Highly recommended for reliable adventure planning.
                </div>
                <div className="reviewImage">
                  <img src={reviewImage} alt="" />
                </div>
                <div>
                  <h3>krishan kumar</h3>
                </div>
              </div>
              <div>
                <div>
                  It was such an amazing experience with Amazing trek guides
                  amar bhaiya, vikas bhaiya, jaggu bhaiya and shyam bhaiya. An
                  amazing experience with attentive trek guides, who ensured
                  proper care, safety, and tent setup. Grateful for their
                  support, especially Amar, making the solo trek enjoyable.
                </div>
                <div className="reviewImage">
                  <img src={reviewImage} alt="" />
                </div>
                <div>
                  <h3>Sonam Seth</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
