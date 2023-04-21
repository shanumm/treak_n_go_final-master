import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";

export default function EditIndividualCamps() {
  const popularAmenities = [
    { name: "Wi-Fi" },
    { name: "Parking" },
    { name: "Air Conditioning" },
    { name: "Swimming Pool" },
    { name: "Gym" },
    { name: "Kitchen" },
    { name: "Pet Friendly" },
    { name: "Smoking Allowed" },
    { name: "Hot Water" },
    { name: "Television" },
    { name: "Breakfast Included" },
    { name: "24-hour Reception" },
    { name: "Laundry Services" },
    { name: "Wheelchair Accessible" },
    { name: "Conference Facilities" },
    { name: "Bar or Lounge" },
    { name: "Restaurant" },
    { name: "Elevator" },
    { name: "Housekeeping" },
    { name: "Airport Shuttle" },
  ];

  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [campDesc, setCampDesc] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [numRooms, setNumRooms] = useState(0);
  const [maxPeople, setMaxPeople] = useState(0);
  const [nearestHighlight, setNearestHighlight] = useState("");
  const [propertySubheading, setPropertySubheading] = useState("");
  const [propertyPoints, setPropertyPoints] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [whatsNearby, setWhatsNearby] = useState([]);
  const [topAttraction, setTopAttraction] = useState([]);
  const [publicTransport, setPublicTransport] = useState([]);
  const [price, setPrice] = useState(0);
  const [editType, setEditType] = useState("Camps");
  const [area, setArea] = useState("");
  const [image, setImage] = useState([]);
  const [isBookingAvailable, setIsBookingAvailable] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [propertyRules, setPropertyRules] = useState("");
  const [rating, setRating] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const addWhatsNearby = () => {
    const whatsNearby = document.querySelector(".whatsNearby");
    const input = document.createElement("input");
    whatsNearby.appendChild(input);
  };
  const removeWhatsNearby = () => {
    const importantNotesInputs = document.querySelector(".whatsNearby");
    if (importantNotesInputs.childElementCount > 1)
      importantNotesInputs.removeChild(importantNotesInputs.lastElementChild);
  };

  const addTopAttraction = () => {
    const whatsNearby = document.querySelector(".topAttraction");
    const input = document.createElement("input");
    whatsNearby.appendChild(input);
  };

  const addPublicTransport = () => {
    const whatsNearby = document.querySelector(".publicTransport");
    const input = document.createElement("input");
    whatsNearby.appendChild(input);
  };
  const removeTopAttraction = () => {
    const importantNotesInputs = document.querySelector(".topAttraction");
    if (importantNotesInputs.childElementCount > 1)
      importantNotesInputs.removeChild(importantNotesInputs.lastElementChild);
  };
  const removePublicTransport = () => {
    const importantNotesInputs = document.querySelector(".publicTransport");
    if (importantNotesInputs.childElementCount > 1)
      importantNotesInputs.removeChild(importantNotesInputs.lastElementChild);
  };

  const { id } = useParams();
  useEffect(() => {
    const idArray = id.split("-");
    console.log(idArray, `All ${idArray[0]}`);
    if (idArray.length > 0) {
      const dataa = db
        .collection(`All ${idArray[0]}`)
        .doc(idArray[1])
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const fetchedData = snapshot.data();
            if (fetchedData && "Details" in fetchedData) {
              setData(fetchedData.Details);
            } else {
              console.log("Details field is not present in the document");
            }
          } else {
            console.log("Document not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching document:", error);
        });
    }
  }, []);

  const handleImageChange = (e, index) => {
    const updatedImages = [...image];
    updatedImages[index] = e.target.value;
    setImage(updatedImages);
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setCampDesc(data?.campDesc);
      setNumRooms(data?.numRooms);
      setCompleteAddress(data?.completeAddress);
      setMaxPeople(data?.maxPeople);
      setNearestHighlight(data?.nearestHighlight);
      setWhatsNearby(data?.whatsNearby || []);
      setTopAttraction(data?.topAttraction || []);
      setPublicTransport(data?.publicTransport || []);
      setSelectedAmenities(data?.amenities || []);
      setPrice(data?.price || 0);
      setEditType(data?.category || "Camps");
      setArea(data?.area || "");
      setImage(data?.images || []);
      setIsBookingAvailable(data?.isBookingAvailable || false);
      setRating(data?.rating || 4);
      setCheckIn(data?.checkIn || "");
      setCheckOut(data?.checkOut || "");
      setPropertyRules(data?.propertyRules || "");
      setPropertyPoints(data?.propertyPoints || "");
      setPropertySubheading(data?.propertySubheading || "");
    }
  }, [data]);

  const updateData = () => {
    setIsLoading(true);
    if (id) {
      const idArray = id.split("-");
      if (idArray.length > 0) {
        db.collection(`All ${idArray[0]}`)
          .doc(idArray[1])
          .set(
            {
              Details: {
                name,
                campDesc,
                numRooms,
                completeAddress,
                maxPeople,
                nearestHighlight,
                whatsNearby,
                topAttraction,
                publicTransport,
                amenities: selectedAmenities,
                price,
                category: editType,
                area,
                images: image,
                isBookingAvailable,
                rating,
                checkIn,
                checkOut,
                propertyRules,
                propertySubheading,
                propertyPoints,
              },
            },
            { merge: true }
          )
          .then(() => {
            console.log("Document successfully updated!");
            window.alert("Updated");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            window.alert("Something went wrong");
          });
      }
    }
    setIsLoading(false);
  };

  const updateDocName = async (newDocName) => {
    setIsLoading(true);

    if (id) {
      const idArray = id.split("-");
      if (idArray.length > 0) {
        if (idArray[1] !== newDocName) {
          if (id) {
            const idArray = id.split("-");
            if (idArray.length > 0) {
              // Create a new document with the new name
              const newDocRef = db
                .collection(`All ${idArray[0]}`)
                .doc(newDocName);
              await newDocRef.set(
                {
                  Details: {
                    name,
                    campDesc,
                    numRooms,
                    completeAddress,
                    maxPeople,
                    nearestHighlight,
                    whatsNearby,
                    topAttraction,
                    publicTransport,
                    amenities: selectedAmenities,
                    price,
                    category: editType,
                    area,
                    images: image,
                    isBookingAvailable,
                    rating,
                    checkIn,
                    checkOut,
                    propertyRules,
                    propertySubheading,
                    propertyPoints,
                  },
                },
                { merge: true }
              );

              // Delete the old document
              db.collection(`All ${idArray[0]}`)
                .doc(idArray[1])
                .delete()
                .then(() => {
                  console.log("Old document successfully deleted!");
                  window.alert("Updated");
                })
                .catch((error) => {
                  console.error("Error deleting old document: ", error);
                  window.alert("Something went wrong");
                });
            }
          }
        } else {
          updateData();
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div style={{ margin: "2rem 0" }} className="AddTrek">
      <div>
        <h4>Add Trek Name</h4>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <h4>Description</h4>
        <textarea
          rows="10"
          cols="58"
          value={campDesc}
          onChange={(e) => setCampDesc(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <h4>Price</h4>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <h4>Category</h4>
        <select value={editType} onChange={(e) => setEditType(e.target.value)}>
          <option value="Camps">Camps</option>
          <option value="Tents">Tents</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <h4>Area</h4>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      <div>
        <h4>Is Booking Available</h4>
        <input
          style={{ width: "auto" }}
          type="checkbox"
          checked={isBookingAvailable}
          onChange={(e) => setIsBookingAvailable(e.target.checked)}
        />
      </div>
      <div>
        <h4>Rating</h4>
        <input
          type="number"
          min="1"
          max="5"
          step="1"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
        />
      </div>
      {/* Number of Rooms */}
      <div>
        <h4>Number of Rooms</h4>
        <input
          type="number"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
        />
      </div>
      <div>
        <h4>Complete Address</h4>
        <input
          type="text"
          value={completeAddress}
          onChange={(e) => setCompleteAddress(e.target.value)}
        />
      </div>
      <div>
        <h4>Max Number of People</h4>
        <input
          type="number"
          value={maxPeople}
          onChange={(e) => setMaxPeople(e.target.value)}
        />
      </div>
      <div>
        <h4>Nearest Highlighted Place (3KM from City Center)</h4>
        <input
          type="text"
          value={nearestHighlight}
          onChange={(e) => setNearestHighlight(e.target.value)}
        />
      </div>

      <div>
        <h4>About the Property Subheading</h4>
        <input
          type="text"
          value={propertySubheading}
          onChange={(e) => setPropertySubheading(e.target.value)}
        />
      </div>
      <div>
        <h4>About the Property Points (seperate by ";")</h4>
        <textarea
          type="text"
          value={propertyPoints}
          onChange={(e) => setPropertyPoints(e.target.value)}
        />
      </div>
      <div className="importantNotes">
        <h4>Whats Nearby</h4>
        <div className="whatsNearby">
          {whatsNearby.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => {
                const updatedWhatsNearby = [...whatsNearby];
                updatedWhatsNearby[index] = e.target.value;
                setWhatsNearby(updatedWhatsNearby);
              }}
            />
          ))}
        </div>
        <button onClick={addWhatsNearby} className="addMoreimportantNotes">
          Add More
        </button>
        <button onClick={removeWhatsNearby} className="addMoreimportantNotes">
          Remove
        </button>
      </div>
      <div className="importantNotes">
        <h4>Top Attractions</h4>
        <div className="topAttraction">
          {topAttraction.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => {
                const updatedTopAttraction = [...topAttraction];
                updatedTopAttraction[index] = e.target.value;
                setTopAttraction(updatedTopAttraction);
              }}
            />
          ))}
        </div>
        <button onClick={addTopAttraction} className="addMoreimportantNotes">
          Add More
        </button>
        <button onClick={removeTopAttraction} className="addMoreimportantNotes">
          Remove
        </button>
      </div>
      <div className="importantNotes">
        <h4>Public Transport</h4>
        <div className="publicTransport">
          {publicTransport.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => {
                const updatedPublicTransport = [...publicTransport];
                updatedPublicTransport[index] = e.target.value;
                setPublicTransport(updatedPublicTransport);
              }}
            />
          ))}
        </div>
        <button onClick={addPublicTransport} className="addMoreimportantNotes">
          Add More
        </button>
        <button
          onClick={removePublicTransport}
          className="addMoreimportantNotes"
        >
          Remove
        </button>
      </div>
      <div className="amenitiesSection">
        <h4>Amenities</h4>
        <div className="amenitiesCheckboxes">
          <div>
            {popularAmenities.map((amenity, index) => (
              <div style={{ width: "30rem" }} key={index}>
                <input
                  style={{ width: "auto", marginRight: "10px" }}
                  type="checkbox"
                  id={amenity.name}
                  name={amenity.name}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAmenities([
                        ...selectedAmenities,
                        e.target.value,
                      ]);
                    } else {
                      setSelectedAmenities(
                        selectedAmenities.filter((a) => a !== e.target.value)
                      );
                    }
                  }}
                  value={amenity.name}
                  checked={selectedAmenities.includes(amenity.name)}
                />
                <label htmlFor={amenity.name}>{amenity.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h4>Check IN</h4>
        <input
          type="text"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div>
        <h4>Check OUT</h4>
        <input
          type="text"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div>
        <h4>Property Rules (seperate by ";")</h4>
        <textarea
          type="text"
          value={propertyRules}
          onChange={(e) => setPropertyRules(e.target.value)}
        />
      </div>
      <div>
        <h4>Images</h4>
        <div className="trekkingImages">
          {image.map((imgLink, index) => (
            <input
              key={index}
              type="text"
              value={imgLink}
              onChange={(e) => handleImageChange(e, index)}
            />
          ))}
        </div>
      </div>
      <div>
        <button disabled={isLoading} onClick={() => updateDocName(name)}>
          {isLoading ? "Saving..." : "Update"}
        </button>
      </div>
    </div>
  );
}
