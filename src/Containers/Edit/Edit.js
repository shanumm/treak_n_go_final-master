import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { useLocation, useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles
import { useStateValue } from "../../StateProvider";
import EditTreksPackages from "../AdminAddTrek/EditTreksPackages";
export default function Edit() {
  const [isAdding, setIsAdding] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [{ basket, user }, dispatch] = useStateValue();
  const [success, setSuccess] = useState("");
  const [editType, setEditType] = useState("Trek");
  const [allAddons, setAllAddons] = useState([]);
  const [predefinedDates, setPredefinedDates] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allDates, setAllDates] = useState([]);
  const [discountValue, setDiscountValue] = useState("no");
  const [maxAltitude, setMaxAltitude] = useState("");
  const [grade, setGrade] = useState("");
  const [trekkingKm, setTrekkingKM] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [faqNumber, setFaqNumber] = useState(2);
  const [faq, setFaq] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [season, setSeason] = useState("");
  const [importantNotes, setImportantNotes] = useState([]);
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
  const [isBookingAvailable, setIsBookingAvailable] = useState(null);
  const [additionalPaymentInfo, setAdditionalPaymentInfo] = useState([]);
  const [addon, setAddon] = useState(false);
  const [packageOptions, setPackageOption] = useState([]);
  const [itineraryNumber, setItineraryNumber] = useState(1);
  const [itineraries, setItineraries] = useState([]);
  const [rating, setRating] = useState(4);
  const getFaq = [];
  const packages = [];
  const getImportantNotes = [];
  const highlightsArray = [];
  const itineraryArray = [];
  const inclusionArray = [];
  const exclusionArray = [];
  const thingsToCarryArray = [];
  const trekImages = [];
  const getaddons = [];
  const getAllDates = [];
  const additionalInfoArray = [];

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

  const saveAsDraft = () => {
    localStorage.setItem(editT.name, JSON.stringify(itineraries));
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
    const fileRef = storageRef.child(`${name}/${i}`);
    await fileRef.put(img);
    const c = await fileRef.getDownloadURL();
    images[i].value = c ? c : "";
    console.log(c);
  };

  useEffect(() => {
    uploadCategory = document.querySelectorAll(".uploadCategory input");
    uploadCategory.forEach((m) => {
      // console.log(m.value);
    });
  });

  // const addItinerary = () => {
  //   const allItinerary = document.querySelector(".allItinerary");
  //   const itinerary = document.createElement("div");
  //   const itineraryh3 = document.createElement("h3");
  //   const itineraryInput = document.createElement("input");
  //   const itineraryh4 = document.createElement("h4");
  //   const itineraryTextarea = document.createElement("textarea");
  //   const itineraryButton = document.createElement("button");

  //   itineraryButton.addEventListener("click", (e) => {
  //     e.target.parentElement.remove();
  //   });

  //   setitinerary(itineraryNumber + 1);
  //   itineraryh3.innerHTML = `Itinerary Heading ${itineraryNumber}`;
  //   itineraryh4.innerHTML = `Itinerary Description ${itineraryNumber}`;
  //   itineraryButton.innerHTML = "Remove";
  //   itinerary.classList.add("itinerary");
  //   itinerary.appendChild(itineraryh3);
  //   itinerary.appendChild(itineraryInput);
  //   itinerary.appendChild(itineraryh4);
  //   itinerary.appendChild(itineraryTextarea);
  //   itinerary.appendChild(itineraryButton);
  //   allItinerary.appendChild(itinerary);
  // };

  const addItinerary = () => {
    setItineraryNumber(itineraryNumber + 1);
    setItineraries([...itineraries, { id: itineraryNumber + 1 }]);
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

  const removeFaq = () => {
    const IT = document.querySelector(".allFaq");
    if (IT.childElementCount > 1) IT.removeChild(IT.lastElementChild);
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

  const DateRange = () => {
    // Create a new Date object for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

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
          minDate={tomorrow} // Set the minimum selectable date as tomorrow
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
  const handleRemoveDate = (idx) => {
    console.log(idx);
    // assigning the list to temp variable
    const temp = [...allDates];

    // removing the element using splice
    temp.splice(idx, 1);

    // updating the list
    setAllDates(temp);
  };

  const handleTrekData = () => {
    setIsAdding(true);
    const E = document.querySelectorAll(".addExclusion > input");
    const I = document.querySelectorAll(".addInclusion > input");
    const T = document.querySelectorAll(".thingsToCarry > input");
    const IT = document.querySelectorAll(".itinerary>input");
    const ITA = document.querySelectorAll(".itinerary .ql-editor");
    const F = document.querySelectorAll(".faq>input");
    const FA = document.querySelectorAll(".faq>textarea");
    const images = document.querySelectorAll(".trekkingImages > input");
    const addonsPriceData = document.querySelectorAll(".addonprice");
    const importantNotesInputs = document.querySelectorAll(
      ".importantNotesInputs >input"
    );
    const additionalPaymentInfoInput = document.querySelectorAll(
      ".additionalInfoPaymentInput input"
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

      p.description = packageOption[i].value;
      p.price = packageOption2[i].value;
      if (p.description.length > 0 && p.price.length > 0) packages.push(p);
    }
    setPackageOption(packages);

    const addonsNameData = document.querySelectorAll(".addonname");
    importantNotesInputs.forEach((i) => {
      if (i.value != "") getImportantNotes.push(i.value);
    });
    setImportantNotes(getImportantNotes);

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
    for (let i = 0; i < F.length; i++) {
      var fa = {};
      fa.question = F[i].value;
      fa.answer = FA[i].value;
      getFaq.push(fa);
    }
    setFaq(getFaq);
    for (let i = 0; i < IT.length; i++) {
      var itinerary = {};
      itinerary.day = i + 1;
      itinerary.heading = IT[i].value;
      itinerary.description = ITA[i].innerHTML;
      itineraryArray.push(itinerary);
    }
    setItineraryData(itineraryArray);
    images.forEach((i) => {
      trekImages.push(i.value);
    });
    setImage(trekImages);

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
      highlights.length === 0 ||
      exclusion.length === 0 ||
      inclusion.length === 0 ||
      carry.length === 0 ||
      image.length === 0 ||
      itineraryData.length === 0
    ) {
      setIsAdding(false);
      setSuccess("Fill All Details");
    } else {
      if (editType != "Edit") {
        setTimeout(() => {
          const allSelectedCategory = [];
          const trekData = {
            name: name,
            price: price,
            season: season,
            category: editType,
            duration: duration,
            area: area,
            difficulty: difficulty,
            route: route,
            accommodation: accommodation,
            transport: transport,
            meal: meal,
            highlights: highlights,
            exclusion: exclusion,
            inclusion: inclusion,
            carry: carry,
            itinerary: itineraryData,
            additionalPaymentInfo: additionalPaymentInfo,
            images: image,
            maxAltitude: maxAltitude,
            trekkingKm: trekkingKm,
            durationDays: durationDays,
            isBookingAvailable: isBookingAvailable,
            packagesOption: packageOptions,
            rating: rating || 4,
            discountValue: discountValue === "no" ? "0" : discountValue,
          };
          if (predefinedDates) {
            trekData.allDates = allDates;
          }
          if (addon) {
            trekData.addone = allAddons;
          }
          if (faq) {
            trekData.faq = faq;
          }
          if (importantNotes.length > 0) {
            trekData.importantNotes = importantNotes;
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
                    .doc(name)
                    .set({
                      Details: trekData,
                      price: parseInt(price),
                    });
                } else {
                  trekData.category = m?.value;
                  db.collection(`All ${m.value}`)
                    .doc(name)
                    .set({
                      Details: trekData,
                      price: parseInt(price),
                    });
                }
              }
            });
          } else {
            db.collection(`All ${editType}`)
              .doc(name)
              .set({
                Details: trekData,
                price: parseInt(price),
              })
              .then(() => {
                setName("");
                setPrice(0);
                setSeason("");
                setDuration("");
                setArea("");
                setDifficulty("");
                setRoute("");
                setAccommodation("");
                setTransport("");
                setMeal("");
                setHighlights([]);
                setExclusion([]);
                setInclusion([]);
                setCarry([]);
                setItineraryData([]);
                trekImages.length = 0;
                setImage(trekImages);
              });
          }
          setSuccess("Successfully Uploaded");
          localStorage.removeItem(editT.name);
          setIsAdding(false);
        }, 2000);
        setTimeout(() => {
          setSuccess("");
        }, 6000);
      }
    }
  };

  const [editT, setEditT] = useState([]);
  useEffect(() => {
    const paramArray = id.split("-");
    if (paramArray[0] === "trek") {
      paramArray[0] = "Trek";
    } else if (paramArray[0] === "winter") {
      paramArray[0] = "Winter Trek";
    } else if (paramArray[0] === "multiday") {
      paramArray[0] = "MultiDay";
    }
    console.log(paramArray[0], paramArray[1], "testing");
    setEditType(paramArray[0]);
    const trekData = db
      ?.collection(`All ${paramArray[0]}`)
      .doc(paramArray[1])
      .get()
      .then((snapshot) => {
        console.log(snapshot.data(), ":sdafasd");
        setEditT(snapshot.data()?.Details);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setItineraries(
      editT?.itinerary?.map((itinerary, index) => ({
        id: index + 1,
        heading: itinerary.heading,
        description: itinerary.description,
      }))
    );
  }, [editT]);

  const getFromDraft = () => {
    if (localStorage.getItem(editT.name)) {
      setItineraries(JSON.parse(localStorage.getItem(editT.name)));
    }
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
    if (packageOption.childElementCount > 0) {
      packageOption.removeChild(packageOption.lastElementChild);
    }
  };

  const removeAddOns = () => {
    const addAddOns = document.querySelector(".addOns");
    if (addAddOns.childElementCount > 1) {
      addAddOns.removeChild(addAddOns.lastElementChild);
    }
  };
  const addSameDiscount = () => {
    setDiscountValue(editT?.discountValue);
  };
  const addSameName = () => {
    setName(editT?.name);
  };
  const addSameRating = () => {
    if (editT?.rating) {
      setRating(editT?.rating);
    } else {
      setRating(4);
    }
  };
  const addSamePrice = () => {
    setPrice(editT?.price);
  };
  const addSameArea = () => {
    setArea(editT?.area);
  };
  const addSameSeason = () => {
    setSeason(editT?.season);
  };
  const addSameDuration = () => {
    setDuration(editT?.duration);
  };
  const addSameDifficulty = () => {
    setDifficulty(editT?.difficulty);
  };
  const addSameGrade = () => {
    setGrade(editT?.difficulty);
  };
  const addSameDurationDays = () => {
    setDurationDays(editT?.durationDays);
  };
  const addSameAltitude = () => {
    setMaxAltitude(editT?.maxAltitude);
  };
  const addSameTrekkingKM = () => {
    setTrekkingKM(editT?.trekkingKm);
  };

  const addSameAdditionalInfoInput = () => {
    const additionalPaymentInfoInput = document.querySelectorAll(
      ".additionalInfoPaymentInput input"
    );
    for (let i = 0; i < editT?.additionalPaymentInfo?.length; i++) {
      additionalPaymentInfoInput[i].value = editT?.additionalPaymentInfo[i];
    }
  };

  const addSamePackageOptions = () => {
    if (editT?.packagesOption?.length > 0) {
      const packageOption = document.querySelectorAll(".packageInput1");
      const packageOption2 = document.querySelectorAll(".packageInput2");
      for (let i = 0; i < editT?.packagesOption?.length; i++) {
        packageOption[i].value = editT.packagesOption[i]?.description;
        packageOption2[i].value = editT.packagesOption[i]?.price;
      }
    }
  };

  const addSameAddons = () => {
    if (editT?.addone?.length > 0) {
      setAddon(true);
      const have_add_one = document.getElementById("have-add-ons");
      have_add_one.checked = true;
      const addonprice = document.querySelectorAll(".addonprice");
      const addonename = document.querySelectorAll(".addonname");
      for (let i = 0; i < editT?.addone?.length; i++) {
        addonename[i].value = editT?.addone[i]?.name;
        addonprice[i].value = editT?.addone[i]?.price;
      }
    } else {
    }
  };
  const setIti = () => {
    const IT = document.querySelectorAll(".itinerary>input");
    const ITA = document.querySelectorAll(".itinerary .ql-editor");
    for (let i = 0; i < editT?.itinerary?.length; i++) {
      IT[i].value = editT?.itinerary[i].heading;
      ITA[i].innerHTML = editT?.itinerary[i].description;
    }
  };
  const setFaqDetails = () => {
    const F = document.querySelectorAll(".faq>input");
    const FA = document.querySelectorAll(".faq>textarea");
    for (let i = 0; i < editT?.faq?.length; i++) {
      F[i].value = editT?.faq[i].question;
      FA[i].innerHTML = editT?.faq[i].answer;
    }
  };

  const setImportantNoteDetails = () => {
    const IN = document.querySelectorAll(".importantNotesInputs >input");

    for (let i = 0; i < editT?.importantNotes?.length; i++) {
      IN[i].value = editT?.importantNotes[i];
    }
  };

  const setHigh = () => {
    if (Array.isArray(editT?.highlights)) {
      setHighlights(editT?.highlights.join(" "));
    } else {
      setHighlights(editT?.highlights);
    }
  };

  const setInc = () => {
    const I = document.querySelectorAll(".addInclusion > input");
    for (let i = 0; i < editT?.inclusion?.length; i++) {
      I[i].value = editT?.inclusion[i];
    }
  };
  const setExc = () => {
    const E = document.querySelectorAll(".addExclusion > input");
    for (let i = 0; i < editT?.exclusion?.length; i++) {
      E[i].value = editT?.exclusion[i];
    }
  };
  const setCar = () => {
    const T = document.querySelectorAll(".thingsToCarry > input");
    for (let i = 0; i < editT?.carry?.length; i++) {
      T[i].value = editT?.carry[i];
    }
  };
  const setImg = () => {
    const images = document.querySelectorAll(".trekkingImages > input");
    for (let i = 0; i < editT?.images?.length; i++)
      images[i].value = editT?.images[i];
  };
  useEffect(() => {
    if (editT?.addone?.length > 0) {
      setAddon(true);
      const have_add_one = document.getElementById("have-add-ons");
      have_add_one.checked = true;
    }
    if (editT?.allDates?.length > 0) {
      document.getElementById("yesDate").checked = true;
      setPredefinedDates(true);
    }
  }, [editT]);

  const addAllSame = () => {
    addSameRating();
    addSamePackageOptions();

    addSameName();
    addSamePrice();
    addSameAddons();
    addSameSeason();
    addSameDuration();
    addSameAltitude();
    addSameGrade();
    addSameDurationDays();
    addSameTrekkingKM();
    addSameArea();
    addSameDifficulty();
    addSameAdditionalInfoInput();
    setRoute(editT?.route);
    setAccommodation(editT?.accommodation);
    setTransport(editT?.transport);
    setImportantNoteDetails();
    setMeal(editT?.meal);
    setFaqDetails();
    setHigh();
    setIti();
    setInc();
    setExc();
    setCar();
    setImg();
    addSameDiscount();
  };
  const Loader = () => <div className="loader"></div>;

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
        <div className="check">
          <div>
            <h2 className="AddTrekHeading">{editType}</h2>
            {editType != "Edit" ? (
              <>
                <button onClick={addAllSame}>Add All Same</button>

                <div className="uploadCategory">
                  <h4>Choose Category</h4>
                  <div>
                    <div>
                      <input type="checkbox" name="Trek" value="Trek" />
                      Trek
                    </div>
                    {/* <div>
                      <input
                        type="checkbox"
                        name="Winter Trek"
                        value="Winter Trek"
                      />
                      Winter Trek
                    </div> */}
                    <div>
                      <input
                        type="checkbox"
                        name="Spiritual Trek"
                        value="Spiritual Trek"
                      />
                      Spiritual Trek
                    </div>
                    <div>
                      <input type="checkbox" name="Long" value="Long" />
                      Long
                    </div>
                    <div>
                      <input type="checkbox" name="Short" value="Short" />
                      Short
                    </div>
                    <div>
                      <input type="checkbox" name="Isolated" value="Isolated" />
                      Isolated
                    </div>
                  </div>
                </div>

                <div>
                  <h4>Change Trek Name</h4>
                  <input
                    placeholder={editT?.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                  <button onClick={addSameName}>Add Same</button>
                </div>
                <div>
                  <h4>Change Rating</h4>
                  <input
                    placeholder={editT?.rating}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    type="text"
                  />
                  <button onClick={addSameRating}>Add Same</button>
                </div>
                <div>
                  <h4>Add Trek Price (Per Head)</h4>
                  <input
                    type="number"
                    placeholder={editT?.price}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button onClick={addSamePrice}>Add Same</button>
                </div>

                <div className="additionalInfoPayment">
                  <h4>Add Additional Info (Payment Box)</h4>
                  <div>
                    <button onClick={addAdditionalInfoInput}>Add</button>
                    <button onClick={removeAdditionalInfoInput}>Remove</button>
                    <button onClick={addSameAdditionalInfoInput}>
                      Add Same
                    </button>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="additionalInfoPaymentInput"
                  >
                    {editT?.additionalPaymentInfo &&
                      editT?.additionalPaymentInfo.map((m) => (
                        <input
                          style={{ margin: "5px 0" }}
                          type="text"
                          placeholder={m}
                        />
                      ))}
                  </div>
                </div>

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
                      {editT?.allDates &&
                        editT?.allDates.map((e, idx) => (
                          <div key={idx} className="allDates">
                            <div>
                              {e.startDate} - {e.endDate}{" "}
                            </div>
                            <button onClick={() => handleRemoveDate(idx)}>
                              Remove
                            </button>
                          </div>
                        ))}

                      {allDates.length > 0 &&
                        allDates.map((e, idx) => (
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
                  <button onClick={addSameAddons}>Add Same</button>
                  {addon && (
                    <>
                      <h4>Add Ons</h4>
                      <button onClick={addAddOns}>Add add-ons</button>
                      <button onClick={removeAddOns}>Remove add-ons</button>

                      <div className="addOns">
                        {editT?.addone?.length > 0 &&
                          editT?.addone?.map((i) => (
                            <div>
                              <input
                                className="addonprice"
                                placeholder={i?.price}
                                type="text"
                              />
                              <input
                                className="addonname"
                                type="text"
                                placeholder={i?.name}
                              />
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="PackageOption">
                  <h4>Add Package Option (add desc after ";")</h4>
                  <div className="allPackages">
                    {editT?.packagesOption &&
                      editT?.packagesOption.map((m) => (
                        <div className="eachPackage">
                          <>
                            <input
                              className="packageInput1"
                              type="text"
                              placeholder={m.description}
                            />
                            <input
                              type="text"
                              className="packageInput2"
                              placeholder={m.price}
                            />
                          </>
                        </div>
                      ))}
                  </div>
                  <button onClick={addSamePackageOptions}>Add Same</button>
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
                    placeholder={editT?.season}
                    value={season}
                    type="text"
                    onChange={(e) => setSeason(e.target.value)}
                  />
                  <button onClick={addSameSeason}>Add Same</button>
                </div>
                <div>
                  <h4>Add Duration</h4>
                  <input
                    placeholder={editT?.duration}
                    value={duration}
                    type="text"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <button onClick={addSameDuration}>Add Same</button>
                </div>
                <div>
                  <h4>Max Altitude</h4>
                  <input
                    placeholder={editT?.maxAltitude}
                    value={maxAltitude}
                    type="text"
                    onChange={(e) => setMaxAltitude(e.target.value)}
                  />
                  <button onClick={addSameAltitude}>Add Same</button>
                </div>
                <div>
                  <h4>Grade</h4>
                  <input
                    placeholder={editT?.difficulty}
                    value={grade}
                    type="text"
                    onChange={(e) => setGrade(e.target.value)}
                  />
                  <button onClick={addSameGrade}>Add Same</button>
                </div>
                <div>
                  <h4>Duration (e.g. 5Days)</h4>
                  <input
                    placeholder={editT?.durationDays}
                    value={durationDays}
                    type="text"
                    onChange={(e) => setDurationDays(e.target.value)}
                  />
                  <button onClick={addSameDurationDays}>Add Same</button>
                </div>
                <div>
                  <h4>Trekking KM</h4>
                  <input
                    placeholder={editT?.trekkingKm}
                    value={trekkingKm}
                    type="text"
                    onChange={(e) => setTrekkingKM(e.target.value)}
                  />
                  <button onClick={addSameTrekkingKM}>Add Same</button>
                </div>
                <div>
                  <h4>Add Location</h4>
                  <input
                    placeholder={editT?.area}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    type="text"
                  />
                  <button onClick={addSameArea}>Add Same</button>
                </div>
                <div>
                  <h4>Add Difficulty</h4>
                  <input
                    placeholder={editT?.difficulty}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    type="text"
                  />
                  <button onClick={addSameDifficulty}>Add Same</button>
                </div>

                <div className="importantNotes">
                  <div className="importantNotesInputs">
                    <h4>Important Notes</h4>
                    {editT?.importantNotes &&
                      editT?.importantNotes.map((i) => (
                        <input type="text" placeholder={i} />
                      ))}
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
                  <button
                    onClick={setImportantNoteDetails}
                    className="addMoreimportantNotes"
                  >
                    Add Same
                  </button>
                </div>
                <div className="HighLights">
                  <h4>Add Highlights</h4>
                  <div className="highlightInputs">
                    {/* {editT?.highlights?.map((m) => (
                      <>
                        <input type="text" placeholder={m} />
                      </>
                    ))} */}
                    {highlights && highlights.length > 0 && (
                      <ReactQuill
                        theme="snow"
                        value={
                          highlights && highlights.length === 0
                            ? editT?.highlights
                            : highlights
                        }
                        onChange={(e) => {
                          setHighlights(e);
                        }}
                        modules={{ toolbar: toolbarOptions }}
                      />
                    )}
                  </div>

                  <button onClick={setHigh}>Add Same</button>
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
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                      <option value="30">30%</option>
                      <option value="50">50%</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4>Add Overview</h4>
                  <div>
                    <div>
                      <h5>Route/Area</h5>
                      <input
                        placeholder={editT?.route}
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        type="text"
                      />
                      <button onClick={() => setRoute(editT?.route)}>
                        Add Same
                      </button>
                    </div>
                    <div>
                      <h5>Accommodation</h5>
                      <input
                        placeholder={editT?.accommodation}
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                        type="text"
                      />
                      <button
                        onClick={() => setAccommodation(editT?.accommodation)}
                      >
                        Add Same
                      </button>
                    </div>
                    <div>
                      <h5>Transport</h5>
                      <input
                        placeholder={editT?.transport}
                        value={transport}
                        onChange={(e) => setTransport(e.target.value)}
                        type="text"
                      />
                      <button onClick={() => setTransport(editT?.transport)}>
                        Add Same
                      </button>
                    </div>
                    <div>
                      <h5>Meal Type</h5>
                      <input
                        placeholder={editT?.meal}
                        value={meal}
                        onChange={(e) => setMeal(e.target.value)}
                        type="text"
                      />
                      <button onClick={() => setMeal(editT?.meal)}>
                        Add Same
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h2>Itinerary</h2>
                  <button onClick={addItinerary} className="addItinerary">
                    Add Itinerary
                  </button>
                  <button onClick={saveAsDraft} className="addItinerary">
                    Save as Draft
                  </button>
                  {localStorage.getItem(editT?.name) ? (
                    <button onClick={getFromDraft} className="addItinerary">
                      Get From Draft
                    </button>
                  ) : null}
                  <div className="allItinerary">
                    {itineraries?.map((i, index) => (
                      <div className="itinerary">
                        <h3>Itinerary Heading 1</h3>
                        <input
                          type="text"
                          value={i.heading}
                          onChange={(e) => {
                            const newItineraries = [...itineraries];
                            newItineraries[index].heading = e.target.value;
                            setItineraries(newItineraries);
                          }}
                        />
                        <h4>Itinerary Description</h4>

                        <ReactQuill
                          theme="snow"
                          value={i?.description}
                          onChange={(value) => {
                            const newItineraries = [...itineraries];
                            newItineraries[index].description = value;
                            setItineraries(newItineraries);
                          }}
                          modules={{ toolbar: toolbarOptions }}
                        />

                        {index > 0 && (
                          <button
                            onClick={() => {
                              setItineraries(
                                itineraries.filter((it) => it.id !== i.id)
                              );
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button onClick={setIti}>Add Same</button>
                </div>

                <div>
                  <h2>FAQ</h2>
                  <button onClick={addFaq} className="addFaq">
                    Add Faq
                  </button>
                  <button onClick={removeFaq} className="addFaq">
                    Remove Faq
                  </button>
                  <button onClick={setFaqDetails} className="addFaq">
                    Add Same
                  </button>
                  <div className="allFaq">
                    {editT?.faq &&
                      editT?.faq.length > 0 &&
                      editT?.faq.map((m) => (
                        <div className="faq">
                          <h3>Faq Question 1</h3>
                          <input placeholder={m.question} type="text" />
                          <h4>Answer</h4>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            placeholder={m.answer}
                          ></textarea>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4>Inclusion</h4>
                  <button onClick={addInclusion}>Add Inclusion</button>
                  <button onClick={removeInclusion}>Remove Inclusion</button>
                  <button onClick={setInc}>Add Same</button>
                  <div className="addInclusion">
                    {editT?.inclusion?.map((i) => (
                      <input placeholder={i} type="text" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4>Exclusion</h4>
                  <button onClick={addExclusion}>Add Exclusion</button>
                  <button onClick={removeExclusion}>remove Exclusion</button>
                  <button onClick={setExc}>Add Same</button>
                  <div className="addExclusion">
                    {editT?.exclusion?.map((i) => (
                      <input placeholder={i} type="text" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4>Things To Carry</h4>
                  <button onClick={thingsToCarry}>Add Items</button>
                  <button onClick={removeThingsToCarry}>remove Items</button>
                  <button onClick={setCar}>Add Same</button>
                  <div className="thingsToCarry">
                    {editT?.carry?.map((i) => (
                      <input placeholder={i} type="text" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4>Add Treking Images (10 Images)</h4>
                  <div className="trekkingImages">
                    {editT?.images && (
                      <>
                        <input placeholder={editT?.images[0]} type="text" />
                        <input placeholder={editT?.images[1]} type="text" />
                        <input placeholder={editT?.images[2]} type="text" />
                        <input placeholder={editT?.images[3]} type="text" />
                        <input placeholder={editT?.images[4]} type="text" />
                        <input placeholder={editT?.images[5]} type="text" />
                        <input placeholder={editT?.images[6]} type="text" />
                        <input placeholder={editT?.images[7]} type="text" />
                        <input placeholder={editT?.images[8]} type="text" />
                        <input placeholder={editT?.images[9]} type="text" />
                        <input type="file" onChange={onImageChange} multiple />
                      </>
                    )}
                    <button onClick={setImg}>Add Same</button>
                  </div>
                </div>
                <div>
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
                </div>
                <div>
                  <button onClick={handleTrekData}>
                    {isAdding ? <Loader /> : "Update Trek"}
                  </button>
                  <div className={success}>{success}</div>
                </div>
              </>
            ) : (
              <>
                <EditTreksPackages />
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
