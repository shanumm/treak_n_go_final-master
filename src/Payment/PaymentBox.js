import React, { useEffect, useState } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";

import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import Modal from "../Components/Modal";
import { useStateValue } from "../StateProvider";

export default function PaymentBox({
  bookingDetailsRef,
  isPackageSelect,
  data,
  packagePrice,
  packageSelectedData,
  currentBookingMiniDate,
  setCurrentBookingDate,
  adult,
  setAdults,
  handleAddOnOpen,
  addAddon,
  removeAddon,
  displayRazorpay,
  bookingNumber,
  setBookingNumber,
  bookingEmail,
  setBookingEmail,
  mobileError,
  isPaymentProcessing,
  user,
  addonsPrice,
  isTrekPage,
  roomsCount,
  setRoomsCount,
  numberOfPeople,
  setNumberOfPeople,
  startDate,
  setStartDate,
  fromIndividualPeacefulStays,
  name,
  maxRooms,
  maxPeople,
}) {
  const [{ isPaymentModalOpen }, dispatch] = useStateValue();

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);
  const [rooms, setRooms] = useState([{ id: 1, people: 1 }]);
  const [paymentModal, setPaymentModal] = useState(false);

  const Loader = () => <div className="loader"></div>;

  const notify = (message) =>
    toast.warn(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  function getNumberOfDays(date1, date2) {
    // Ensure the dates are in the correct format
    if (!date1 || !date2) {
      return 1;
    }
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calculate the difference in milliseconds
    const diffTime = d2 - d1;
    if (diffTime <= 0) {
      return 1;
    }

    // Convert the difference in milliseconds to days
    const diffDays = Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  const addRoom = () => {
    if (rooms.length < maxRooms) {
      setRooms([...rooms, { id: rooms.length + 1, people: 1 }]);
    } else {
      alert("Max rooms selected");
    }
  };

  const increasePeople = (id) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, people: room.people + 1 } : room
      )
    );
  };

  const decreasePeople = (id) => {
    setRooms(
      rooms.map((room) =>
        room.id === id && room.people > 1
          ? { ...room, people: room.people - 1 }
          : room
      )
    );
  };

  const handleRemoveRoom = (Roomid) => {
    if (rooms.length > 1) {
      const filteredRooms = rooms.filter((room) => room.id != Roomid);
      setRooms(filteredRooms);
    }
  };

  const handleModal = (e, value = true) => {
    e.preventDefault();
    setPaymentModal(value);
    dispatch({
      type: "SET_PAYMENT_MODAL_OPEN",
      isPaymentModalOpen: value,
    });
  };

  const getTotalPeople = (array) => {
    let checking = array.reduce((total, item) => total + item.people, 0);
    if (checking > array.length * 2) {
      return (checking - array.length * 2) * Number(data?.extraPersonPrice);
    }
    return 0;
    // return array.reduce((total, item) => total + item.people, 0);
  };

  return (
    <div
      id="bookingDeatils"
      className="trekBooking"
      ref={bookingDetailsRef}
      style={
        !isTrekPage
          ? {
              marginTop: 0,
              height: "fit-content",
              position: "sticky",
              top: "12%",
            }
          : { marginTop: "1rem" }
      }
    >
      <h2>BOOKING</h2>
      <div style={fromIndividualPeacefulStays ? { width: "90%" } : null}>
        <h3>{fromIndividualPeacefulStays ? "Fees" : "Trekking Fee"}</h3>
        <h2 style={{ fontWeight: 400, margin: "5px 0", color: "#008000" }}>
          INR{" "}
          {fromIndividualPeacefulStays
            ? Math.floor(data?.price) *
                rooms.length *
                getNumberOfDays(startingDate, endingDate) +
              getTotalPeople(rooms)
            : addonsPrice +
              adult *
                (isPackageSelect
                  ? data?.discountValue
                    ? Math.floor(
                        (parseInt(packagePrice) *
                          (100 - parseInt(data?.discountValue))) /
                          100
                      )
                    : Math.floor(parseInt(packagePrice))
                  : data?.discountValue
                  ? Math.floor(
                      (data?.price * (100 - parseInt(data?.discountValue))) /
                        100
                    )
                  : Math.floor(data?.price / 2))}
          /-
        </h2>
        {isPackageSelect ? (
          <h5 style={{ fontWeight: 500 }}>
            {packageSelectedData.description.split(";")[0]}
          </h5>
        ) : (
          <h5 style={{ fontWeight: 500 }}>
            {fromIndividualPeacefulStays
              ? getNumberOfDays(startingDate, endingDate) === 1
                ? "Per Night"
                : `For ${getNumberOfDays(startingDate, endingDate)} Nights`
              : "Per Person"}
          </h5>
        )}
      </div>
      <div style={{ width: "90%", position: "relative" }}>
        {fromIndividualPeacefulStays && (
          <div
            style={{
              width: "90%",
              margin: "15px 0",
              cursor: "pointer",
            }}
            onClick={() => setIsPopoverVisible(!isPopoverVisible)}
          >
            <div
              style={{ fontWeight: 600, display: "flex", alignItems: "center" }}
            >
              Guests{" "}
              {isPopoverVisible ? (
                <KeyboardArrowUpRounded />
              ) : (
                <KeyboardArrowDownRounded />
              )}
            </div>
            {/* <div style={{ display: "flex", fontSize: "14px" }}>
              <div style={{ marginRight: "4px" }}>{numberOfPeople} People </div>{" "}
              <div> {" " + roomsCount} Room</div>
            </div> */}
          </div>
        )}

        {fromIndividualPeacefulStays && isPopoverVisible && (
          // <div
          //   style={{
          //     width: "90%",
          //     marginBottom: "1rem",
          //     position: "absolute",
          //     padding: "1rem",
          //     borderRadius: "10px",
          //     boxShadow:
          //       "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          //     background: "white",
          //     width: "80%",
          //     backgroundColor: "blue",
          //   }}
          // >
          //   <div style={{ marginBottom: "10px" }}>
          //     <h5 style={{ marginRight: "8px" }}>Rooms</h5>
          //     <div
          //       className="roomsPicker"
          //       style={{
          //         display: "flex",
          //         justifyContent: "space-between",
          //         alignItems: "center",
          //         width: "80px",
          //       }}
          //     >
          //       <div
          //         onClick={() => {
          //           if (roomsCount < maxRooms) {
          //             setRoomsCount(roomsCount + 1);
          //             return;
          //           }
          //           notify("Max rooms selected");
          //           return;
          //         }}
          //         className="addRooms"
          //         style={{
          //           cursor: "pointer",
          //           width: "1.5rem",
          //           background: "#2b78a7",
          //           display: "grid",
          //           placeItems: "center",
          //           color: "#fff",
          //         }}
          //       >
          //         +
          //       </div>
          //       <div>{roomsCount}</div>
          //       <div
          //         onClick={() => {
          //           if (roomsCount > 1) setRoomsCount(roomsCount - 1);
          //           setNumberOfPeople(1);
          //         }}
          //         className="addRooms"
          //         style={{
          //           cursor: "pointer",
          //           width: "1.5rem",
          //           display: "grid",
          //           placeItems: "center",
          //           background: "#2b78a7",
          //           color: "#fff",
          //         }}
          //       >
          //         -
          //       </div>
          //     </div>
          //   </div>
          //   <div>
          //     <h5 style={{ marginRight: "8px" }}>Number of People</h5>

          //     <div
          //       className="peoplePicker"
          //       style={{
          //         display: "flex",
          //         justifyContent: "space-between",
          //         alignItems: "center",
          //         width: "80px",
          //       }}
          //     >
          //       <div
          //         onClick={() => {
          //           if (numberOfPeople < maxPeople * roomsCount) {
          //             setNumberOfPeople(numberOfPeople + 1);
          //             return;
          //           }
          //           notify("Add more rooms, max 3 people in a room");
          //         }}
          //         className="addPeople"
          //         style={{
          //           cursor: "pointer",
          //           background: "#2b78a7",
          //           color: "#fff",
          //           width: "1.5rem",
          //           display: "grid",
          //           placeItems: "center",
          //         }}
          //       >
          //         +
          //       </div>
          //       <div>{numberOfPeople}</div>
          //       <div
          //         onClick={() => {
          //           if (numberOfPeople > 1)
          //             setNumberOfPeople(numberOfPeople - 1);
          //         }}
          //         className="addPeople"
          //         style={{
          //           cursor: "pointer",
          //           background: "#2b78a7",
          //           color: "#fff",
          //           width: "1.5rem",
          //           display: "grid",
          //           placeItems: "center",
          //         }}
          //       >
          //         -
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div
            style={{
              width: "90%",
              marginBottom: "1rem",
              position: "absolute",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              background: "white",
              width: "80%",
              backgroundColor: "#f0f0f0",
            }}
          >
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ width: "70px" }}>Rooms</div>
              <div
                style={{
                  width: "80px",
                  textAlign: "center",
                }}
              >
                People
              </div>
            </div>
            {rooms.map((room, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <h5 style={{ width: "70px" }}>Room {index + 1}</h5>
                <div
                  style={{
                    display: "flex",
                    width: "80px",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      cursor: "pointer",
                      width: "1.5rem",
                      background: "#2b78a7",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      borderRadius: "4px",
                    }}
                    onClick={() =>
                      room.people < maxPeople
                        ? increasePeople(room.id)
                        : notify(
                            `Add more rooms, max ${maxPeople} people in a room`
                          )
                    }
                  >
                    +
                  </button>
                  {room.people}
                  <button
                    style={{
                      cursor: "pointer",
                      width: "1.5rem",
                      background: "#2b78a7",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      borderRadius: "4px",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={() => decreasePeople(room.id)}
                  >
                    -
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                  onClick={() => handleRemoveRoom(room.id)}
                >
                  <CancelIcon />
                </div>
              </div>
            ))}
            <button
              style={{
                background: "rgb(255, 94, 0)",
                padding: "4px 8px",
                marginTop: "4px",
                color: "white",
                border: "none",
                outline: "none",
                borderRadius: "4px",
              }}
              onClick={() => {
                if (rooms.length < maxRooms) {
                  addRoom();
                  return;
                }
                notify("Max rooms selected");
              }}
            >
              Add Room
            </button>
          </div>
        )}
      </div>

      {fromIndividualPeacefulStays && (
        <div style={{ width: "90%", display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <h5>Check-In</h5>
            <input
              type="date"
              id="checkingg"
              onChange={(e) => {
                setStartingDate(e.target.value);
                setCurrentBookingDate(e.target.value);
              }}
            />
          </div>
          <div>
            <h5>Check-Out</h5>
            <input
              type="date"
              id="checkingg"
              min={startingDate}
              onChange={(e) => {
                setEndingDate(e.target.value);
              }}
            />
          </div>
        </div>
      )}
      {isTrekPage && (
        <div className="dateAndAdult">
          <div>
            {data?.allDates && data?.allDates?.length > 1 ? null : (
              <>
                <h5>Select Date</h5>
                <input
                  type="date"
                  id="checkingg"
                  min={currentBookingMiniDate}
                  onChange={(e) => setCurrentBookingDate(e.target.value)}
                />
              </>
            )}
          </div>
          <div>
            <h5>Adult</h5>
            <div className="adultPicker">
              <div onClick={() => setAdults(adult + 1)} className="addAdults">
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
      )}
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
                      <div className="addAdults" id={`addOndata${id}`}>
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
      <form className="bookingDeatils">
        {/* {!fromIndividualPeacefulStays && (
          <div>
            <input
              type="number"
              className="mobile"
              minLength={10}
              maxLength={10}
              style={{ marginLeft: "1rem" }}
              placeholder="Phone Number"
              value={bookingNumber}
              onChange={(e) => setBookingNumber(e.target.value)}
              required
            ></input>
            <input
              type="email"
              className="mobile"
              style={{ marginLeft: "1rem" }}
              placeholder="Email"
              value={bookingEmail}
              onChange={(e) => setBookingEmail(e.target.value)}
              required
            ></input>
          </div>
        )} */}
        {fromIndividualPeacefulStays ? (
          <div>
            <h5>Serive Fees</h5>
            <div>INR {data?.serviceFees || 0} </div>
          </div>
        ) : null}
        <div>
          <h5>Total Amount</h5>
          <div>
            INR{" "}
            {fromIndividualPeacefulStays
              ? Math.floor(data?.price) *
                  rooms.length *
                  getNumberOfDays(startingDate, endingDate) +
                getTotalPeople(rooms) +
                Math.floor(data?.serviceFees || 0)
              : addonsPrice +
                adult *
                  (isPackageSelect
                    ? data?.discountValue
                      ? Math.floor(
                          (parseInt(packagePrice) *
                            (100 - parseInt(data?.discountValue))) /
                            100
                        )
                      : Math.floor(parseInt(packagePrice))
                    : data?.discountValue
                    ? Math.floor(
                        (data?.price * (100 - parseInt(data?.discountValue))) /
                          100
                      )
                    : Math.floor(data?.price / 2))}
          </div>
        </div>

        <div
          className="bookTrekButton"
          style={{ paddingRight: 0, paddingLeft: 0 }}
        >
          {!fromIndividualPeacefulStays ? (
            <button
              style={{ cursor: "pointer" }}
              onClick={(e) => handleModal(e)}
            >
              {isPaymentProcessing ? (
                <Loader />
              ) : user ? (
                "Book Now"
              ) : (
                "Book as guest"
              )}
            </button>
          ) : (
            <button
              style={{ cursor: "pointer" }}
              onClick={(e) => handleModal(e)}
            >
              Book as a guest
            </button>
          )}
        </div>
        {fromIndividualPeacefulStays ? null : (
          <div className="bookTrekButton">
            <button>
              <a
                href="https://wa.me/+919654749746" // Replace 1234567890 with the desired phone number (including country code)
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                Support
              </a>
            </button>
          </div>
        )}
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {paymentModal && (
        <Modal
          modalIsOpen={paymentModal}
          closeModal={(e) => handleModal(e, false)}
          startingDate={startingDate}
          endingDate={endingDate}
          data={data}
          totalPeople={rooms.length}
          numberOfDays={getNumberOfDays(startingDate, endingDate)}
          totalAmount={
            fromIndividualPeacefulStays
              ? Math.floor(data?.price) *
                  rooms.length *
                  getNumberOfDays(startingDate, endingDate) +
                getTotalPeople(rooms) +
                Math.floor(data?.serviceFees || 0)
              : addonsPrice +
                adult *
                  (isPackageSelect
                    ? data?.discountValue
                      ? Math.floor(
                          (parseInt(packagePrice) *
                            (100 - parseInt(data?.discountValue))) /
                            100
                        )
                      : Math.floor(parseInt(packagePrice))
                    : data?.discountValue
                    ? Math.floor(
                        (data?.price * (100 - parseInt(data?.discountValue))) /
                          100
                      )
                    : Math.floor(data?.price / 2))
          }
          serviceFees={data?.serviceFees || 0}
          onSubmitModal={displayRazorpay}
          setBookingNumber={setBookingNumber}
          bookingNumber={bookingNumber}
          bookingEmail={bookingEmail}
          setBookingEmail={setBookingEmail}
          adult={adult}
          isTrek={!fromIndividualPeacefulStays}
          currentBookingMiniDate={currentBookingMiniDate}
          mobileError={mobileError}
        />
      )}
    </div>
  );
}
