import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { Link, useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import { storage } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Nav from "../Navbar/Nav";
import "./AddTrek.css";
import EditTreksPackages from "./EditTreksPackages";

export default function AddTrek({ searchQueryData }) {
  useEffect(() => {
    console.log("searchQueryData", searchQueryData);
  }, [searchQueryData]);
  const location = useLocation();

  const [sliderImageURL, setSliderImageURL] = useState({});

  const [popularTreksOption, setPopularTreksOption] = useState("All");
  const [selectedPopularTreks, setSelectedPopularTreks] = useState([]);

  const [handleSliderImage, setHandleSliderImage] = useState([]);
  const [editAddSearch, setEditAddSearch] = useState("");
  const [{ basket, user }, dispatch] = useStateValue();
  const [success, setSuccess] = useState("");
  const [editType, setEditType] = useState("Trek");
  const [addon, setAddon] = useState(false);
  const [discountValue, setDiscountValue] = useState("no");
  const [value, onChange] = useState(new Date());
  const [faqNumber, setFaqNumber] = useState(2);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [predefinedDates, setPredefinedDates] = useState(false);
  const [maxAltitude, setMaxAltitude] = useState("");
  const [grade, setGrade] = useState("");
  const [trekkingKm, setTrekkingKM] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [file, setFile] = useState("");
  const [isBookingAvailable, setIsBookingAvailable] = useState(null);
  const [isWinterTrekAvailable, setIsWinterTrekAvailable] = useState(null);
  const [isSpiritualTrekAvailable, setIsSpiritualTrekAvailable] =
    useState(null);
  const [completeAddress, setCompleteAddress] = useState("");
  const [numRooms, setNumRooms] = useState(0);
  const [maxPeople, setMaxPeople] = useState(0);
  const [propertySubheading, setPropertySubheading] = useState("");
  const [propertyPoints, setPropertyPoints] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [season, setSeason] = useState("");
  const [duration, setDuration] = useState("");
  const [area, setArea] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [route, setRoute] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [transport, setTransport] = useState("");
  const [meal, setMeal] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [exclusion, setExclusion] = useState([]);
  const [inclusion, setInclusion] = useState([]);
  const [carry, setCarry] = useState([]);
  const [itineraryData, setItineraryData] = useState([]);
  const [image, setImage] = useState([]);
  const [allAddons, setAllAddons] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [importantNotes, setImportantNotes] = useState([]);
  const [WhatsNearBy, setWhatsNearBy] = useState([]);
  const [TopAttraction, setTopAttraction] = useState([]);
  const [PublicTransport, setPublicTransport] = useState([]);
  const [campDesc, setCampDesc] = useState("");
  const [faq, setFaq] = useState([]);
  const [packageOptions, setPackageOption] = useState([]);
  const [additionalPaymentInfo, setAdditionalPaymentInfo] = useState([]);
  const [allCategories, setAllCategries] = useState([]);
  const [rating, setRating] = useState(4);
  const [nearestHighlight, setNearestHighlight] = useState("");
  const [itineraryNumber, setItineraryNumber] = useState(1);
  const [itineraries, setItineraries] = useState([{ id: 1 }]);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [propertyRules, setPropertyRules] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [editSearch, setEditSearch] = useState("");

  const highlightsArray = [];
  const itineraryArray = [];
  const inclusionArray = [];
  const exclusionArray = [];
  const thingsToCarryArray = [];
  const trekImages = [];
  const getaddons = [];
  const getAllDates = [];
  const getImportantNotes = [];
  const getNearBy = [];
  const getTopAttraction = [];
  const getPublicTransport = [];
  const additionalInfoArray = [];

  const getFaq = [];
  const packages = [];

  var uploadCategory;

  const onImageChange = (e) => {
    const len = e.target.files.length;
    if (name === "") {
      window.alert("Please provide a trek name");
    } else {
      for (let i = 0; i < len; i++) {
        uploadImage(e.target.files[i], i);
      }
    }
  };

  const onSliderImageChange = (e) => {
    const len = e.target.files.length;
    if (name === "") {
      window.alert("Please provide a trek name");
    } else {
      for (let i = 0; i < len; i++) {
        uploadSliderImage2(e.target.files[i], i);
      }
    }
  };

  const uploadSliderImage2 = async (img, i) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(
      `individualSliderImages/${name.trim()}/${i}`
    );
    await fileRef.put(img);
    const c = await fileRef.getDownloadURL();
    const d = db
      .collection("individualSliderImages")
      .doc(name.trim())
      .collection("images")
      .add({
        banner: c ? c : "",
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = async (img, i) => {
    const images = document.querySelectorAll(".trekkingImages > input");
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${name.trim()}/${i}`);
    await fileRef.put(img);
    const c = await fileRef.getDownloadURL();
    images[i].value = c ? c : "";
  };

  useEffect(() => {
    uploadCategory = document.querySelectorAll(".uploadCategory input");
  });

  useEffect(() => {
    if (isWinterTrekAvailable) {
      db.collection(`Trek Availability`).doc("winterTrek").set({
        availability: isWinterTrekAvailable,
      });
    }
  }, [isWinterTrekAvailable]);
  useEffect(() => {
    if (isSpiritualTrekAvailable) {
      db.collection(`Trek Availability`).doc("spiritualTrek").set({
        availability: isSpiritualTrekAvailable,
      });
    }
  }, [isSpiritualTrekAvailable]);

  const addItinerary = () => {
    setItineraryNumber(itineraryNumber + 1);
    setItineraries([...itineraries, { id: itineraryNumber + 1 }]);
  };
  const removeItinerary = (id) => {
    setItineraryNumber(itineraryNumber - 1);
    setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
  };

  const addFaq = () => {
    const allFaq = document.querySelector(".allFaq");
    const faq = document.createElement("div");
    const faqh3 = document.createElement("h3");
    const faqInput = document.createElement("input");
    const faqh4 = document.createElement("h4");
    const faqTextarea = document.createElement("textarea");

    setFaqNumber(faqNumber + 1);
    faqh3.innerHTML = ` Faq Question ${faqNumber}`;
    faqh4.innerHTML = `Answer ${faqNumber}`;

    faq.classList.add("faq");
    faq.appendChild(faqh3);
    faq.appendChild(faqInput);
    faq.appendChild(faqh4);
    faq.appendChild(faqTextarea);
    allFaq.appendChild(faq);
  };

  const addInclusion = () => {
    const addInclusion = document.querySelector(".addInclusion");
    const input = document.createElement("input");
    addInclusion.appendChild(input);
  };
  const addExclusion = () => {
    const addExclusion = document.querySelector(".addExclusion");
    const input = document.createElement("input");
    addExclusion.appendChild(input);
  };
  const thingsToCarry = () => {
    const thingsToCarry = document.querySelector(".thingsToCarry");
    const input = document.createElement("input");
    input.type = "text";
    thingsToCarry.appendChild(input);
  };
  const addAddOns = () => {
    const addAddOns = document.querySelector(".addOns");
    const input = document.createElement("input");
    const input1 = document.createElement("input");
    const div = document.createElement("div");
    input.type = "text";
    input.placeholder = "Price";
    input.classList.add("addonprice");
    input1.classList.add("addonname");
    input1.type = "text";
    input1.placeholder = "Name";
    div.appendChild(input);
    div.appendChild(input1);
    addAddOns.appendChild(div);
  };
  const removeAddOns = () => {
    const addAddOns = document.querySelector(".addOns");
    if (addAddOns.childElementCount > 1) {
      addAddOns.removeChild(addAddOns.lastElementChild);
    }
  };

  const removeInclusion = () => {
    const addInclusion = document.querySelector(".addInclusion");
    if (addInclusion.childElementCount > 1)
      addInclusion.removeChild(addInclusion.lastElementChild);
  };
  const removeExclusion = () => {
    const addExclusion = document.querySelector(".addExclusion");
    if (addExclusion.childElementCount > 1)
      addExclusion.removeChild(addExclusion.lastElementChild);
  };
  const removeThingsToCarry = () => {
    const thingsToCarry = document.querySelector(".thingsToCarry");
    if (thingsToCarry.childElementCount > 1)
      thingsToCarry.removeChild(thingsToCarry.lastElementChild);
  };

  const removeFaq = () => {
    const IT = document.querySelector(".allFaq");
    if (IT.childElementCount > 1) IT.removeChild(IT.lastElementChild);
  };

  const DateRange = () => {
    return (
      <>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          value={startDate}
          className="startDate"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          value={endDate}
          className="endDate"
        />
      </>
    );
  };

  const addDateButton = () => {
    const startEndDate = {};
    startEndDate.startDate =
      startDate.getMonth() +
      1 +
      "/" +
      startDate.getDate() +
      "/" +
      startDate.getFullYear();
    startEndDate.endDate =
      endDate.getMonth() +
      1 +
      "/" +
      endDate.getDate() +
      "/" +
      endDate.getFullYear();
    getAllDates.push(startEndDate);
    setAllDates([...allDates, ...getAllDates]);
  };

  const handleTrekData = async () => {
    setIsAdding(true);
    const SLI = document.querySelector("#cars");
    // const HL = document.querySelectorAll(".highlightInputs > input");
    const E = document.querySelectorAll(".addExclusion > input");
    const I = document.querySelectorAll(".addInclusion > input");
    const T = document.querySelectorAll(".thingsToCarry > input");
    const IT = document.querySelectorAll(".itinerary>input");
    const ITA = document.querySelectorAll(".itinerary .ql-editor");
    const F = document.querySelectorAll(".faq>input");
    const FA = document.querySelectorAll(".faq>textarea");
    const images = document.querySelectorAll(".trekkingImages > input");
    const addonsPriceData = document.querySelectorAll(".addonprice");
    const addonsNameData = document.querySelectorAll(".addonname");
    const additionalPaymentInfoInput = document.querySelectorAll(
      ".additionalInfoPaymentInput input"
    );
    const importantNotesInputs = document.querySelectorAll(
      ".importantNotesInputs >input"
    );
    const whatsNearby = document.querySelectorAll(".whatsNearby >input");
    const topAttraction = document.querySelectorAll(".topAttraction >input");
    const publicTransport = document.querySelectorAll(
      ".publicTransport >input"
    );

    additionalPaymentInfoInput.forEach((i) => {
      if (i.value != "") {
        additionalInfoArray.push(i.value);
      }
    });
    setAdditionalPaymentInfo(additionalInfoArray);

    const packageOption = document.querySelectorAll(".packageInput1");
    const packageOption2 = document.querySelectorAll(".packageInput2");
    for (let i = 0; i < packageOption.length; i++) {
      var p = {};
      console.log(packageOption.value, ">><<");
      p.description = packageOption[i].value;
      p.price = packageOption2[i].value;
      console.log(p, "......");
      packages.push(p);
    }
    setPackageOption(packages);
    importantNotesInputs.forEach((i) => {
      if (i.value != "") getImportantNotes.push(i.value);
    });
    setImportantNotes(getImportantNotes);
    whatsNearby.forEach((i) => {
      if (i.value != "") getNearBy.push(i.value);
    });
    setWhatsNearBy(getNearBy);
    topAttraction.forEach((i) => {
      if (i.value != "") getTopAttraction.push(i.value);
    });
    setTopAttraction(getTopAttraction);
    publicTransport.forEach((i) => {
      if (i.value != "") getPublicTransport.push(i.value);
    });
    setPublicTransport(getPublicTransport);
    // HL.forEach((h) => {
    //   if (h.value != "") highlightsArray.push(h.value);
    // });
    // setHighlights(highlightsArray);
    E.forEach((e) => {
      if (e.value != "") exclusionArray.push(e.value);
    });
    setExclusion(exclusionArray);
    I.forEach((e) => {
      if (e.value != "") inclusionArray.push(e.value);
    });
    setInclusion(inclusionArray);
    T.forEach((e) => {
      if (e.value != "") thingsToCarryArray.push(e.value);
    });
    if (addon) {
      for (let i = 0; i < addonsPriceData.length; i++) {
        var addonobject = {};
        addonobject.price = addonsPriceData[i].value;
        addonobject.name = addonsNameData[i].value;
        getaddons.push(addonobject);
      }
      setAllAddons(getaddons);
    }
    setCarry(thingsToCarryArray);
    for (let i = 0; i < IT.length; i++) {
      var itinerary = {};
      itinerary.day = i + 1;
      itinerary.heading = IT[i].value;
      itinerary.description = ITA[i].innerHTML;
      itineraryArray.push(itinerary);
    }
    for (let i = 0; i < F.length; i++) {
      var fa = {};
      fa.question = F[i].value;
      fa.answer = FA[i].value;
      getFaq.push(fa);
    }
    setFaq(getFaq);
    setItineraryData(itineraryArray);
    images.forEach((i) => {
      trekImages.push(i.value);
    });
    setImage(trekImages);
    if (editType != "Camps" && editType != "Homestays") {
      if (
        name === "" ||
        price === "" ||
        duration === "" ||
        area === "" ||
        season === "" ||
        difficulty === "" ||
        route === "" ||
        accommodation === "" ||
        transport === "" ||
        meal === "" ||
        highlights?.length == 0 ||
        exclusion?.length == 0 ||
        inclusion?.length == 0 ||
        carry?.length == 0 ||
        image?.length == 0 ||
        itineraryData?.length == 0 ||
        grade === "" ||
        maxAltitude === "" ||
        trekkingKm === "" ||
        durationDays === ""
      ) {
        setSuccess("Fill All Details");
        setIsAdding(false);

        // Log the missing fields

        console.log("Missing fields: ", highlights);
      } else {
        if (editType != "Edit") {
          setTimeout(() => {
            const allSelectedCategory = [];

            const trekData = {
              name: name.trim(),
              price: price,
              season: season,
              category: editType,
              duration: duration,
              area: area,
              difficulty: grade,
              route: route,
              accommodation: accommodation,
              transport: transport,
              meal: meal,
              highlights: highlights,
              exclusion: exclusion,
              inclusion: inclusion,
              carry: carry,
              itinerary: itineraryData,
              images: image,
              maxAltitude: maxAltitude,
              trekkingKm: trekkingKm,
              durationDays: durationDays,
              additionalPaymentInfo: additionalPaymentInfo,
              isBookingAvailable: isBookingAvailable,
              packagesOption: packageOptions,
              rating: rating,
              discountValue,
            };
            if (addon) {
              trekData.addone = allAddons;
            }
            if (predefinedDates) {
              trekData.allDates = allDates;
            }
            if (importantNotes.length > 0) {
              trekData.importantNotes = importantNotes;
            }
            if (faq.length > 0) {
              trekData.faq = faq;
            }
            if (editType === "Short-Long-Isolated Trek") {
              trekData.SLI = SLI.value;
            }
            var uploadCategorySelectedLength = 0;
            uploadCategory.forEach((m) => {
              if (m.checked) {
                allSelectedCategory.push(m.value);
                uploadCategorySelectedLength += 1;
              }
            });
            trekData.allSelectedCategory = allSelectedCategory;

            if (uploadCategorySelectedLength > 0) {
              trekData.SLI = "";
              uploadCategory.forEach((m) => {
                if (m.checked) {
                  if (
                    m.value === "Short" ||
                    m.value === "Long" ||
                    m.value === "Isolated"
                  ) {
                    trekData.SLI = m.value.toLowerCase();
                    trekData.category = "Short-Long-Isolated Trek";
                    db.collection(`All Short-Long-Isolated Trek`)
                      .doc(name.trim())
                      .set({
                        Details: trekData,
                        price: parseInt(price),
                      });
                  } else {
                    trekData.category = m.value;
                    db.collection(`All ${m.value}`)
                      .doc(name.trim())
                      .set({
                        Details: trekData,
                        price: parseInt(price),
                      });
                  }
                }
              });
            } else {
              db.collection(`All ${editType}`)
                .doc(name.trim())
                .set({
                  Details: trekData,
                  price: parseInt(price),
                })
                .then(() => {
                  setName("");
                  setPrice(0);
                  setSeason("");
                  setDuration("");
                  setRating(4);
                  setArea("");
                  setDifficulty("");
                  setRoute("");
                  setAccommodation("");
                  setTransport("");
                  setMeal("");
                  setGrade("");
                  setMaxAltitude("");
                  setDurationDays("");
                  setTrekkingKM("");
                  setHighlights([]);
                  setExclusion([]);
                  setInclusion([]);
                  setCarry([]);
                  setItineraryData([]);
                  setAllAddons([]);
                  setAllDates([]);
                  trekImages.length = 0;
                  setImage(trekImages);
                  // HL.forEach((h) => {
                  //   h.value = "";
                  // });
                  I.forEach((e) => {
                    e.value = "";
                  });
                  T.forEach((e) => {
                    e.value = "";
                  });
                  images.forEach((i) => {
                    i.value = "";
                  });
                  E.forEach((e) => {
                    e.value = "";
                  });
                  if (importantNotesInputs.length > 0) {
                    importantNotesInputs.forEach((i) => {
                      i.value = "";
                    });
                  }
                  for (let i = 0; i < IT.length; i++) {
                    IT[i].value = "";
                    ITA[i].value = "";
                  }
                });
            }
            setSuccess("Successfully Uploaded");
            setIsAdding(false);
          }, 2000);
          setTimeout(() => {
            setSuccess("");
          }, 6000);
        }
      }
    } else if (editType === "Camps" || editType === "Homestays") {
      if (name === "" || price === "" || area === "" || image.length === 0) {
        setSuccess("Fill All Details");
        setIsAdding(false);
      } else {
        if (editType != "Edit") {
          setTimeout(() => {
            const trekData = {
              name: name.trim(),
              price: price,
              category: editType,
              area: area,
              images: image,
              whatsNearby: WhatsNearBy,
              topAttraction: TopAttraction,
              publicTransport: PublicTransport,
              campDesc: campDesc,
              isBookingAvailable: isBookingAvailable,
              amenities: selectedAmenities,
              numRooms: numRooms,
              maxPeople: maxPeople,
              nearestHighlight: nearestHighlight,
              rating: rating,
              completeAddress: completeAddress,
              checkIn,
              checkOut,
              propertyRules,
              propertySubheading,
              propertyPoints,
            };

            db.collection(`All ${editType}`)
              .doc(name.trim())
              .set({
                Details: trekData,
              })
              .then(() => {
                setName("");
                setPrice(0);
                setDuration("");
                setArea("");
                setDurationDays("");
                trekImages.length = 0;
                setImage(trekImages);
                images.forEach((i) => {
                  i.value = "";
                });
              });
            setSuccess("Successfully Uploaded");
            setIsAdding(false);
          }, 2000);
          setTimeout(() => {
            setSuccess("");
          }, 6000);
        }
      }
    }
  };

  useEffect(() => {
    allDates.map((e) => {});
  }, [allDates]);

  const handleRemoveDate = (idx) => {
    // assigning the list to temp variable
    const temp = [...allDates];

    // removing the element using splice
    temp.splice(idx, 1);

    // updating the list
    setAllDates(temp);
  };

  const RemoveimportantNotes = () => {
    const importantNotesInputs = document.querySelector(
      ".importantNotesInputs"
    );
    if (importantNotesInputs.childElementCount > 1)
      importantNotesInputs.removeChild(importantNotesInputs.lastElementChild);
  };
  const addMoreimportantNotes = () => {
    const importantNotesInputs = document.querySelector(
      ".importantNotesInputs"
    );
    const input = document.createElement("input");
    importantNotesInputs.appendChild(input);
  };

  const addWhatsNearby = () => {
    const whatsNearby = document.querySelector(".whatsNearby");
    const input = document.createElement("input");
    whatsNearby.appendChild(input);
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

  const removeWhatsNearby = () => {
    const importantNotesInputs = document.querySelector(".whatsNearby");
    if (importantNotesInputs.childElementCount > 1)
      importantNotesInputs.removeChild(importantNotesInputs.lastElementChild);
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

  const addPackageOption = () => {
    const packageOption = document.querySelector(".allPackages");
    const div = document.createElement("div");
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    input1.placeholder = "Description";
    input2.placeholder = "Price";
    input1.classList.add("packageInput1");
    input2.classList.add("packageInput2");
    div.classList.add("eachPackage");
    div.appendChild(input1);
    div.appendChild(input2);
    packageOption.appendChild(div);
  };
  const removePackageOption = () => {
    const packageOption = document.querySelector(".allPackages");
    if (packageOption.childElementCount > 1) {
      packageOption.removeChild(packageOption.lastElementChild);
    }
  };

  const bannerImage = async (e, number) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`banner/${number}`);
    await fileRef.put(e.target.files[0]);
    const c = await fileRef.getDownloadURL();
    const d = db
      .collection("bannerImage")
      .doc(`${number}`)
      .collection("banner")
      .add({
        banner: c ? c : "",
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sliderImage = (e) => {
    setHandleSliderImage(e.target.files);
  };

  const uploadSliderImage = async (m, i) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`sliderImages/${i}`);
    await fileRef.put(m);
    const c = await fileRef.getDownloadURL();

    const d = db
      .collection("sliderImages")
      .doc(`${i}`)
      .set({
        banner: c ? c : "",
        sliderImageURL: Object.values(sliderImageURL)[i],
      })
      .then(() => {
        window.alert("Upload Successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addAdditionalInfoInput = () => {
    const input = document.createElement("input");
    const infoInput = document.querySelector(".additionalInfoPaymentInput");
    infoInput.appendChild(input);
  };
  const removeAdditionalInfoInput = () => {
    const infoInput = document.querySelector(".additionalInfoPaymentInput");
    if (infoInput.childElementCount > 1) {
      infoInput.removeChild(infoInput.lastElementChild);
    }
  };

  const handleSliderImageDropdown = (value, index) => {
    setSliderImageURL({ ...sliderImageURL, [index]: value });
  };

  useEffect(() => {
    const i = "1";

    console.log(Object.values(sliderImageURL));
  }, [sliderImageURL]);

  const handleUploadSliderImages = () => {
    for (let i = 0; i < handleSliderImage.length; i++)
      uploadSliderImage(handleSliderImage[i], i);
  };

  const handleAddMorePopularTreks = () => {
    const popularTrek = document.querySelector(".setPopularTreksOption");
    const selectElement = document.createElement("select");
    selectElement.id = "";
    const optionElement = document.createElement("option");
    optionElement.selected = true;
    optionElement.disabled = true;
    optionElement.textContent = "Select Trek";
    optionElement.value = "";
    selectElement.appendChild(optionElement);

    if (searchQueryData) {
      searchQueryData.map((data) => {
        const optionElement = document.createElement("option");
        optionElement.value = JSON.stringify(data.query);
        optionElement.textContent = data.query.Details.name;
        selectElement.onchange = (e) =>
          handlePopularTrekSelection(e.target.value);
        selectElement.name = data.query.Details.name;
        selectElement.appendChild(optionElement);
      });
    }

    popularTrek.appendChild(selectElement);
  };

  const handlePopularTrekSelection = (value) => {
    setSelectedPopularTreks([...selectedPopularTreks, JSON.parse(value)]);
  };

  const handleUploadPopularTreks = () => {
    const d = db
      .collection("CustomPopularTreks")
      .doc("Treks")
      .set({
        isCustom: popularTreksOption === "Custom",
        selectedPopularTreks: selectedPopularTreks,
      })
      .then(() => {
        window.alert("Upload Successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    const d = db
      .collection("Categories")
      .doc("Name")
      .get()
      .then((snap) => {
        setAllCategries(Object.values(snap.data()));
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const addCategory = () => {
    //   let name = window.prompt("Enter the name of the Category");
    //   const d = db
    //     .collection("Categories")
    //     .doc("Name")
    //     .update({
    //       [name]: name,
    //     })
    //     .then(() => {
    //       getCategories();
    //       window.alert("Upload Successful");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };

  const Loader = () => <div className="loader"></div>;

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

  useEffect(() => {
    console.log(highlights.length);
  }, [highlights]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // Standard text formatting options
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // Custom header options
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }], // Custom font size options
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // Color options for text and background
    [{ font: [] }],
    [{ align: [] }],

    ["link", "image", "video", "formula"], // Insert links, images, videos, and formulas
    ["clean"], // Remove formatting button
  ];

  return (
    <div className="AddTrek">
      {user?.email === "test@example.com" ? (
        <div>
          <div className="chooseUpdate">
            <button onClick={() => setEditType("Trek")}>Add Trek</button>
            <button onClick={() => setEditType("Winter Trek")}>
              Add Winter Trek
            </button>
            <button onClick={() => setEditType("MultiDay")}>
              Add Multiday Tour
            </button>
            <button onClick={() => setEditType("Short-Long-Isolated Trek")}>
              Short/Long/Isolated
            </button>
            <button onClick={() => setEditType("Camps")}>Add Camps</button>
            <button onClick={() => setEditType("Homestays")}>
              Add Homestays
            </button>
            <button onClick={() => setEditType("Edit")}>
              Edit Trek/Packages
            </button>
            <button>
              <Link style={{ color: "white" }} to="/editCamps">
                Edit Camps/Homestays
              </Link>
            </button>
          </div>

          <div className="uploadBannerImages">
            <div>Update Banner Images</div>
            <input type="file" onChange={(e) => bannerImage(e, 1)} />
            <input type="file" onChange={(e) => bannerImage(e, 2)} />
            <input type="file" onChange={(e) => bannerImage(e, 3)} />
          </div>

          <div>
            <div>Upload Slider Images</div>
            <input type="file" multiple onChange={(e) => sliderImage(e)} />
            <div className="uploadSliderImages">
              <h5>Enter Image Destination URL</h5>
              <select
                onChange={(e) => handleSliderImageDropdown(e.target.value, 1)}
              >
                <option selected disabled>
                  Select URL for image 1
                </option>
                {searchQueryData &&
                  searchQueryData.map((data) => (
                    <option value={`/treks/${data.query.Details.name}=trek`}>
                      {data.query.Details.name}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => handleSliderImageDropdown(e.target.value, 2)}
              >
                <option selected disabled>
                  Select URL for image 2
                </option>
                {searchQueryData &&
                  searchQueryData.map((data) => (
                    <option value={`/treks/${data.query.Details.name}=trek`}>
                      {data.query.Details.name}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => handleSliderImageDropdown(e.target.value, 3)}
              >
                <option selected disabled>
                  Select URL for image 3
                </option>
                {searchQueryData &&
                  searchQueryData.map((data) => (
                    <option value={`/treks/${data.query.Details.name}=trek`}>
                      {data.query.Details.name}
                    </option>
                  ))}
              </select>
              <button onClick={handleUploadSliderImages}>Save</button>
            </div>
          </div>
          <div className="choosePopularTreks">
            <div>
              <h4>Choose Popular Treks</h4>
              <select
                name="choosePopularTrek"
                id=""
                onChange={(e) => setPopularTreksOption(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Custom">Custom</option>
              </select>
              {popularTreksOption === "Custom" && (
                <div>
                  <div className="setPopularTreksOption">
                    <select
                      name="firstSelect"
                      id=""
                      onChange={(e) =>
                        handlePopularTrekSelection(e.target.value)
                      }
                    >
                      <option selected disabled>
                        Select Trek
                      </option>
                      {searchQueryData &&
                        searchQueryData.map((data) => (
                          <option value={JSON.stringify(data.query)}>
                            {data.query.Details.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button onClick={handleAddMorePopularTreks}>Add More</button>
                </div>
              )}
              <button onClick={handleUploadPopularTreks}>Save</button>
            </div>
          </div>
          <div className="showHideTrekCategory">
            <div>
              <h4>Winter Trek</h4>
              <select
                name="winterTrekAvailable"
                value={isWinterTrekAvailable}
                onChange={(e) => {
                  e.preventDefault();
                  setIsWinterTrekAvailable(e.target.value);
                }}
              >
                <option value="0" disabled selected>
                  Select
                </option>
                <option value="show">Show</option>
                <option value="hide">Hide</option>
              </select>
            </div>
            <div>
              <h4>Spiritual Trek</h4>
              <select
                name="spiritualTrekAvailable"
                value={isSpiritualTrekAvailable}
                onChange={(e) => {
                  e.preventDefault();
                  setIsSpiritualTrekAvailable(e.target.value);
                }}
              >
                <option value="0" disabled selected>
                  Select
                </option>
                <option value="show">Show</option>
                <option value="hide">Hide</option>
              </select>
            </div>
          </div>

          <div>
            <h2 className="AddTrekHeading">{editType}</h2>
            {editType === "Edit" && (
              <input
                value={editAddSearch}
                type="text"
                placeholder="Search"
                onChange={(e) => setEditAddSearch(e.target.value)}
              />
            )}
            {editType != "Edit" ? (
              <>
                {editType === "Short-Long-Isolated Trek" && (
                  <div className="SLIDropDown">
                    <label for="cars">Choose Type</label>
                    <select name="cars" id="cars">
                      <option value="none" disabled>
                        Select
                      </option>
                      <option value="short">Short</option>
                      <option value="long">Long</option>
                      <option value="isolated">Isolated</option>
                    </select>
                  </div>
                )}

                <div className="uploadCategory">
                  <h4>Choose Category</h4>
                  <div>
                    {allCategories.length > 0 &&
                      Object.values(allCategories).map((category) => {
                        return (
                          <div>
                            <input
                              type="checkbox"
                              name={category}
                              value={category}
                            />
                            {category}
                          </div>
                        );
                      })}
                  </div>
                  <button onClick={addCategory}>Add Category</button>
                </div>

                <div>
                  <h4>Add Trek Name</h4>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                </div>
                <div>
                  <h4>Add Rating</h4>
                  <input
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    type="text"
                  />
                </div>

                <div>
                  <h4>Add Trek Price (Per Head)</h4>
                  <input
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="additionalInfoPayment">
                  <h4>Add Additional Info (Payment Box)</h4>
                  <div>
                    <button onClick={addAdditionalInfoInput}>Add</button>
                    <button onClick={removeAdditionalInfoInput}>Remove</button>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="additionalInfoPaymentInput"
                  >
                    <input style={{ margin: "5px 0" }} type="text" />
                  </div>
                </div>

                {editType != "Camps" && editType != "Homestays" && (
                  <>
                    <div className="datesContainer">
                      <h4>Add Dates</h4>
                      <div>
                        <div>
                          <input
                            type="radio"
                            name="dates"
                            id="yesDate"
                            onClick={() => setPredefinedDates(true)}
                          />
                          <label for="yesDate ">Predefined Dates</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="dates"
                            id="noDate"
                            onClick={() => setPredefinedDates(false)}
                          />
                          <label for="noDate">No Predefined Dates</label>
                        </div>
                      </div>
                      {predefinedDates && (
                        <>
                          <h4> Dates</h4>
                          <DateRange />
                          {allDates.map((e, idx) => (
                            <div key={idx} className="allDates">
                              <div>
                                {e.startDate} - {e.endDate}{" "}
                              </div>
                              <button onClick={() => handleRemoveDate(idx)}>
                                Remove
                              </button>
                            </div>
                          ))}
                          <button onClick={addDateButton}>Add Date</button>
                        </>
                      )}
                    </div>

                    <div className="try">
                      <form>
                        <div>
                          <input
                            type="radio"
                            id="have-add-ons"
                            name="addone"
                            value="haveAddOns"
                            onClick={() => setAddon(true)}
                          />
                          <label for="have-add-ons">Have AddOns</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="dont-have-add-ons"
                            name="addone"
                            value="noaddone"
                            onClick={() => setAddon(false)}
                          />
                          <label for="dont-have-add-ons">No AddOns</label>
                        </div>
                      </form>
                      {addon && (
                        <>
                          <h4>Add Ons</h4>
                          <button onClick={addAddOns}>Add add-ons</button>
                          <button onClick={removeAddOns}>Remove add-ons</button>
                          <div className="addOns">
                            <div>
                              <input
                                className="addonprice"
                                placeholder="Price"
                                type="text"
                              />
                              <input
                                className="addonname"
                                type="text"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="PackageOption">
                      <h4>Add Package Option</h4>
                      <div className="allPackages">
                        <div className="eachPackage">
                          <input
                            className="packageInput1"
                            type="text"
                            placeholder="Description"
                          />
                          <input
                            type="text"
                            className="packageInput2"
                            placeholder="Price"
                          />
                        </div>
                      </div>
                      <button
                        onClick={addPackageOption}
                        className="addMoreimportantNotes"
                      >
                        Add More
                      </button>
                      <button
                        onClick={removePackageOption}
                        className="addMoreimportantNotes"
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      <h4>Add Season</h4>
                      <input
                        value={season}
                        type="text"
                        onChange={(e) => setSeason(e.target.value)}
                      />
                    </div>
                    <div>
                      <h4>Max Altitude</h4>
                      <input
                        value={maxAltitude}
                        type="text"
                        onChange={(e) => setMaxAltitude(e.target.value)}
                      />
                    </div>
                    <div>
                      <h4>Grade</h4>
                      <input
                        value={grade}
                        type="text"
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {editType != "Camps" && editType != "Homestays" && (
                  <div>
                    <h4>Add Duration</h4>
                    <input
                      value={duration}
                      type="text"
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                )}
                {editType != "Camps" && editType != "Homestays" && (
                  <div>
                    <h4>Duration (e.g. 5Days)</h4>
                    <input
                      value={durationDays}
                      type="text"
                      onChange={(e) => setDurationDays(e.target.value)}
                    />
                  </div>
                )}
                {editType != "Camps" && editType != "Homestays" && (
                  <div>
                    <h4>Trekking KM</h4>
                    <input
                      value={trekkingKm}
                      type="text"
                      onChange={(e) => setTrekkingKM(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <h4>Add Location</h4>
                  <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    type="text"
                  />
                </div>

                {(editType === "Camps" || editType === "Homestays") && (
                  <>
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

                    {/* Max Number of People */}
                    <div>
                      <h4>Max Number of People</h4>
                      <input
                        type="number"
                        value={maxPeople}
                        onChange={(e) => setMaxPeople(e.target.value)}
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
                    <div>
                      <h4>Nearest Highlighted Place (3KM from City Center)</h4>
                      <input
                        type="text"
                        value={nearestHighlight}
                        onChange={(e) => setNearestHighlight(e.target.value)}
                      />
                    </div>

                    <div className="importantNotes">
                      <h4>Whats Nearby</h4>
                      <div className="whatsNearby">
                        <input type="text" />
                      </div>
                      <button
                        onClick={addWhatsNearby}
                        className="addMoreimportantNotes"
                      >
                        Add More
                      </button>
                      <button
                        onClick={removeWhatsNearby}
                        className="addMoreimportantNotes"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="importantNotes">
                      <h4>Top Attractions</h4>
                      <div className="topAttraction">
                        <input type="text" />
                      </div>
                      <button
                        onClick={addTopAttraction}
                        className="addMoreimportantNotes"
                      >
                        Add More
                      </button>
                      <button
                        onClick={removeTopAttraction}
                        className="addMoreimportantNotes"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="importantNotes">
                      <h4>Public Transport</h4>
                      <div className="publicTransport">
                        <input type="text" />
                      </div>
                      <button
                        onClick={addPublicTransport}
                        className="addMoreimportantNotes"
                      >
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
                                    selectedAmenities.filter(
                                      (a) => a !== e.target.value
                                    )
                                  );
                                }
                              }}
                              value={amenity.name}
                            />
                            <label htmlFor={amenity.name}>{amenity.name}</label>
                          </div>
                        ))}
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
                  </>
                )}
                {editType != "Camps" && editType != "Homestays" && (
                  <>
                    <div>
                      <h4>Add Difficulty</h4>
                      <input
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        type="text"
                      />
                    </div>

                    <div className="importantNotes">
                      <h4>Important Notes</h4>
                      <div className="importantNotesInputs">
                        <input type="text" />
                      </div>
                      <button
                        onClick={addMoreimportantNotes}
                        className="addMoreimportantNotes"
                      >
                        Add More
                      </button>
                      <button
                        onClick={RemoveimportantNotes}
                        className="addMoreimportantNotes"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="HighLights">
                      <h4>Add Highlights</h4>
                      <div className="highlightInputs">
                        {/* <input type="text" /> */}
                        <ReactQuill
                          theme="snow"
                          value={highlights}
                          onChange={(e) => {
                            setHighlights(e);
                          }}
                          modules={{ toolbar: toolbarOptions }}
                        />
                      </div>
                    </div>
                    <div className="HighLights">
                      <h4>Add Discount</h4>
                      <div className="highlightInputs">
                        <select
                          name="discount"
                          value={discountValue}
                          onChange={(e) => {
                            e.preventDefault();
                            setDiscountValue(e.target.value);
                          }}
                        >
                          <option value="no" disabled selected>
                            Select
                          </option>
                          <option value="25">25%</option>
                          <option value="50">50%</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                {editType != "Camps" && editType != "Homestays" && (
                  <>
                    <div>
                      <h4>Add Overview</h4>
                      <div>
                        <div>
                          <h5>Route/Area</h5>
                          <input
                            value={route}
                            onChange={(e) => setRoute(e.target.value)}
                            type="text"
                          />
                        </div>
                        <div>
                          <h5>Accommodation</h5>
                          <input
                            value={accommodation}
                            onChange={(e) => setAccommodation(e.target.value)}
                            type="text"
                          />
                        </div>
                        <div>
                          <h5>Transport</h5>
                          <input
                            value={transport}
                            onChange={(e) => setTransport(e.target.value)}
                            type="text"
                          />
                        </div>
                        <div>
                          <h5>Meal Type</h5>
                          <input
                            value={meal}
                            onChange={(e) => setMeal(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2>Itinerary</h2>
                      <button onClick={addItinerary} className="addItinerary">
                        Add Itinerary
                      </button>
                      <div className="allItinerary">
                        {itineraries.map((itinerary, index) => (
                          <div key={itinerary.id} className="itinerary">
                            <h3>Itinerary Heading {index + 1}</h3>
                            <input type="text" />
                            <h4>Itinerary Description {index + 1}</h4>
                            <ReactQuill
                              theme="snow"
                              modules={{ toolbar: toolbarOptions }}
                            />
                            <button
                              onClick={() => removeItinerary(itinerary.id)}
                              className="removeItinerary"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2>FAQ</h2>
                      <button onClick={addFaq} className="addFaq">
                        Add Faq
                      </button>
                      <button onClick={removeFaq} className="addFaq">
                        Remove Faq
                      </button>
                      <div className="allFaq">
                        <div className="faq">
                          <h3>Faq Question 1</h3>
                          <input type="text" />
                          <h4>Answer</h4>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {editType != "Camps" && editType != "Homestays" && (
                  <>
                    <div>
                      <h4>Inclusion</h4>
                      <button onClick={addInclusion}>Add Inclusion</button>
                      <button onClick={removeInclusion}>
                        Remove Inclusion
                      </button>
                      <div className="addInclusion">
                        <input type="text" />
                      </div>
                    </div>
                    <div>
                      <h4>Exclusion</h4>
                      <button onClick={addExclusion}>Add Exclusion</button>
                      <button onClick={removeExclusion}>
                        remove Exclusion
                      </button>
                      <div className="addExclusion">
                        <input type="text" />
                      </div>
                    </div>
                    <div>
                      <h4>Things To Carry</h4>
                      <button onClick={thingsToCarry}>Add Items</button>
                      <button onClick={removeThingsToCarry}>
                        remove Items
                      </button>
                      <div className="thingsToCarry">
                        <input type="text" />
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <h4>
                    Add Treking Images (
                    {editType === "Camps" ? "10 Images" : "10 Images"})
                  </h4>
                  <div className="trekkingImages">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                  </div>
                  <input type="file" onChange={onImageChange} multiple />
                </div>
                <div className="isBookingAvailable">
                  <h4>Select a booking type</h4>
                  <select
                    name="bookingType"
                    value={isBookingAvailable}
                    onChange={(e) => {
                      e.preventDefault();
                      setIsBookingAvailable(e.target.value);
                    }}
                  >
                    <option value="0" disabled selected>
                      Select
                    </option>
                    <option value="Booking">Booking</option>
                    <option value="Enquiry">Enquiry</option>
                  </select>
                </div>
                <h4>Individual Slider Images</h4>
                <input type="file" onChange={onSliderImageChange} multiple />

                <div>
                  <button onClick={handleTrekData}>
                    {isAdding ? <Loader /> : "Add Trek"}
                  </button>
                  <div className={success}>{success}</div>
                </div>
              </>
            ) : (
              <>
                <EditTreksPackages editSearch={editAddSearch} />
              </>
            )}
          </div>
        </div>
      ) : (
        <>Loading....</>
      )}
    </div>
  );
}
