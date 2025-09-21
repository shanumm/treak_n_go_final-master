import React, { useEffect, useState, useContext, useMemo } from "react";
import Filter from "../../Components/Filter";
import { db } from "../../firebase";
import AllTreks from "./AllTreks";
import "./Treks.css";
import FilterContext from "../../FilterContext";
import { Star } from "@mui/icons-material";

// Loading skeleton component
const CardSkeleton = () => (
  <div className="eachTrekContainer" style={{ opacity: 0.7 }}>
    <div className="eachTrekImg">
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      ></div>
    </div>
    <div className="eachTrekDetails">
      <div
        style={{
          height: "20px",
          backgroundColor: "#f0f0f0",
          marginBottom: "10px",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          height: "16px",
          backgroundColor: "#f0f0f0",
          marginBottom: "10px",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          height: "16px",
          backgroundColor: "#f0f0f0",
          marginBottom: "15px",
          borderRadius: "4px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      ></div>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div
    className="allTreks"
    style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
  >
    {Array.from({ length: 6 }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);
export default function Treks() {
  const [alltreks, setAllTreks] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [allMultiday, setAllMultiday] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("AllCategory");
  const [dayFilterTrek, setDayFilterTrek] = useState([]);
  const [locationFilterTrek, setLocationFilterTrek] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("search");
    if (myParam) setSearchParams(myParam);
  });

  const {
    DayFilter,
    updateDayFilter,
    isCategoryUpdated,
    categoryUpdate,
    sort,
  } = useContext(FilterContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const startTime = Date.now();
      console.log(
        `🚀 [Treks] Starting data fetch at ${new Date().toISOString()}`
      );

      try {
        // Fetch all data in parallel for better performance
        console.log(`📡 [Treks] Initiating parallel Firebase queries...`);
        const queryStartTime = Date.now();

        const [trekSnapshot, availabilitySnapshot, multidaySnapshot] =
          await Promise.all([
            db.collection("All Trek").orderBy("price", sort).get(),
            db.collection("Trek Availability").doc("winterTrek").get(),
            db.collection("All MultiDay").orderBy("price", sort).get(),
          ]);

        const queryEndTime = Date.now();
        console.log(
          `✅ [Treks] Parallel queries completed in ${
            queryEndTime - queryStartTime
          }ms`
        );
        console.log(
          `📊 [Treks] Results: ${trekSnapshot.docs.length} treks, ${multidaySnapshot.docs.length} multiday tours`
        );

        // Process trek data
        const trekProcessStart = Date.now();
        const allTrek = trekSnapshot.docs.map((doc) => doc.data().Details);
        setAllTreks(allTrek);
        console.log(
          `⚡ [Treks] Trek data processed in ${Date.now() - trekProcessStart}ms`
        );

        // Process multiday data
        const multidayProcessStart = Date.now();
        const allMultidayData = multidaySnapshot.docs.map(
          (doc) => doc.data().Details
        );
        setAllMultiday(allMultidayData);
        console.log(
          `⚡ [Treks] Multiday data processed in ${
            Date.now() - multidayProcessStart
          }ms`
        );

        // Process winter trek data if available
        const availabilityData = availabilitySnapshot.data();
        if (availabilityData.availability === "show") {
          console.log(
            `❄️ [Treks] Winter treks available, fetching winter data...`
          );
          const winterStartTime = Date.now();
          const winterSnapshot = await db
            .collection("All Winter Trek")
            .orderBy("price", sort)
            .get();
          const winterEndTime = Date.now();
          console.log(
            `❄️ [Treks] Winter trek query completed in ${
              winterEndTime - winterStartTime
            }ms`
          );

          const winterProcessStart = Date.now();
          const allPackage = winterSnapshot.docs.map(
            (doc) => doc.data().Details
          );
          setAllPackages(allPackage);
          console.log(
            `⚡ [Treks] Winter data processed in ${
              Date.now() - winterProcessStart
            }ms`
          );
        } else {
          console.log(`❄️ [Treks] Winter treks not available`);
        }

        const totalTime = Date.now() - startTime;
        console.log(`🎉 [Treks] Total data fetch completed in ${totalTime}ms`);
        setIsLoading(false);
      } catch (error) {
        console.error(
          `❌ [Treks] Error fetching data after ${Date.now() - startTime}ms:`,
          error
        );
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [sort]);

  // Memoize filter values for better performance
  const dayFilterValues = useMemo(() => {
    if (!alltreks?.length) return [];

    const uniqueDays = [
      ...new Set(
        alltreks.map((trek) => trek?.itinerary?.length).filter(Boolean)
      ),
    ];
    return uniqueDays.sort((a, b) => a - b);
  }, [alltreks]);

  const locationFilterValues = useMemo(() => {
    if (!alltreks?.length) return [];

    const uniqueLocations = [
      ...new Set(alltreks.map((trek) => trek?.area).filter(Boolean)),
    ];
    return uniqueLocations;
  }, [alltreks]);

  useEffect(() => {
    setSearchParams("");
    setDayFilterTrek(dayFilterValues);
    updateDayFilter("Days");
    isCategoryUpdated(!categoryUpdate);
  }, [categoryFilter, dayFilterValues]);

  useEffect(() => {
    setDayFilterTrek(dayFilterValues);
    setLocationFilterTrek(locationFilterValues);
  }, [dayFilterValues, locationFilterValues]);

  const image1 =
    "https://cdn.pixabay.com/photo/2016/10/14/19/21/canyon-1740973_960_720.jpg";
  const reviewImage =
    "https://cdn.pixabay.com/photo/2017/02/06/10/54/sad-2042536_960_720.jpg";
  return (
    <div className="treks">
      <div className="treksTop">
        {/* <div className="treksTopRight">
          <div style={{ width: "100%", height: "50vh" }}>
            <img src={image1} alt="" />
          </div>
        </div> */}
        <div className="treksTopLeft">
          <h2>TREKS</h2>
          <h5>Discover the Wonders of Nature</h5>
          <p>
            Sky above, earth below, peace within, Choose the treks from the list
            below and begin your journey of adventure in the Himalayas, Explore
            the stunning Landscapes, Bugyals (meadows), Snow capped Himalayan
            passes, Beautiful sunsets from above, Amazing hidden waterfalls,
            Streams from the glaciers, Galactic skies, Cloud beds below you and
            variety of wild flowers in your journey with TrekNgo!
          </p>
        </div>
      </div>
      <div className="treksBottom">
        <div className="treksFilter">
          <div>
            <h3>Difficulty</h3>
            <div>
              <div>
                <input type="radio" name="difficulty" value="easy" />
                <label for="easy">easy(1)</label>
              </div>
              <div>
                <input type="radio" on name="difficulty" value="moderate" />
                <label for="moderate">moderate(2)</label>
              </div>
              <div>
                <input type="radio" name="difficulty" value="difficult" />
                <label for="difficult">Difficult(3)</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="difficulty"
                  value="highly-difficult"
                />
                <label for="highly-difficult">highly difficult(4)</label>
              </div>
              <div>
                <input type="radio" name="difficulty" value="difficultyAll" />
                <label for="highly-difficult">All</label>
              </div>
            </div>
          </div>
          <div>
            <h3>Category</h3>
            <div>
              <div>
                <input
                  type="radio"
                  id="package"
                  name="category"
                  value="Winter Trek"
                  onChange={(e) =>
                    e.target.checked ? setCategoryFilter("Winter Trek") : ""
                  }
                />
                <label for="package">Winter Trek</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="tour"
                  name="category"
                  value="multiday"
                  onChange={(e) =>
                    e.target.checked ? setCategoryFilter("multiday") : ""
                  }
                />
                <label for="spring">Multiday Tour</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="tour"
                  name="category"
                  value="Trek"
                  onChange={(e) =>
                    e.target.checked ? setCategoryFilter("Trek") : ""
                  }
                />
                <label for="spring">Popular Trek</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="tour"
                  name="category"
                  value="AllCategory"
                  onChange={(e) =>
                    e.target.checked ? setCategoryFilter("AllCategory") : ""
                  }
                />
                <label for="spring">All</label>
              </div>
            </div>
          </div>
          <div>
            <h3>Popular</h3>
            <div>
              <div>
                <input type="checkbox" name="kheeranga" value="kheeranga" />
                <label for="kheeranga">Kheer Ganga</label>
              </div>
            </div>
          </div>
        </div>
        <div className="allTreksContainer">
          <Filter
            dayFilterTrek={dayFilterTrek}
            locationFilterTrek={locationFilterTrek}
          />
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {categoryFilter != "" && categoryFilter === "AllCategory" ? (
                <AllTreks
                  packageData={allPackages}
                  data={alltreks}
                  trekType="trek"
                  editSearch={searchParams === "" ? "" : searchParams}
                />
              ) : categoryFilter === "Trek" ? (
                <AllTreks
                  packageData={alltreks}
                  trekType="trek"
                  editSearch={""}
                />
              ) : categoryFilter === "Winter Trek" ? (
                <AllTreks
                  packageData={allPackages}
                  trekType="winter"
                  editSearch={searchParams === "" ? "" : searchParams}
                />
              ) : (
                <AllTreks
                  packageData={allMultiday}
                  trekType="multiday"
                  editSearch={searchParams === "" ? "" : searchParams}
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className="trekReviews">
        <h3>
          Google Reviews 4.9{" "}
          <span>
            <Star style={{ color: "#ff5e00" }} />
          </span>
        </h3>
        <div className="reviewContainer">
          <div>
            <div>
              A year ago, I used Trekngo travel agency to plan a trip to
              Kheerganga with friends. They stood out for their affordable
              prices and polite customer service. Available 24/7, they guided us
              through every step of the journey. I highly recommend Trekngo for
              their excellent service, making our trip unforgettable. 5 out of 5
              stars.
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
              TrekNgo provided an excellent experience with clear communication
              and support. Our Thatharana trek was unforgettable due to stunning
              views and attentive guides. Highly recommended for reliable
              adventure planning.
            </div>
            <div className="reviewImage">
              <img
                src="https://cdn.pixabay.com/photo/2015/08/05/01/12/phone-875488_960_720.jpg"
                alt=""
              />
            </div>
            <div>
              <h3>krishan kumar</h3>
            </div>
          </div>
          <div>
            <div>
              It was such an amazing experience with Amazing trek guides amar
              bhaiya, vikas bhaiya, jaggu bhaiya and shyam bhaiya. An amazing
              experience with attentive trek guides, who ensured proper care,
              safety, and tent setup. Grateful for their support, especially
              Amar, making the solo trek enjoyable.
            </div>
            <div className="reviewImage">
              <img
                src={
                  "https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg"
                }
                alt=""
              />
            </div>
            <div>
              <h3>Sonam Seth</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
