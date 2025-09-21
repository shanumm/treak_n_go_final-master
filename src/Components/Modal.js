import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Star } from "@material-ui/icons";

export default function Modal({
  modalIsOpen,
  closeModal,
  startingDate,
  endingDate,
  data,
  totalPeople,
  totalAmount,
  serviceFees,
  numberOfDays,
  onSubmitModal,
  setBookingNumber,
  bookingNumber,
  bookingEmail,
  adult,
  setBookingEmail,
  isTrek,
  currentBookingMiniDate,
  mobileError,
}) {
  return (
    <div
      className="modal"
      style={{ zIndex: 1000000000000, display: "flex !important" }}
    >
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <div
        style={{
          background: "white",
          height: "75%",
          borderRadius: "10px",
          padding: "0 2rem",
          overflow: "scroll",
          width: "80%",
        }}
        className="modal-content paymentModalParent"
      >
        <div style={{ fontSize: "24px", margin: "1rem" }}>Request To Book</div>
        <div
          className="paymentModalContainer"
          style={{ display: "flex", margin: "1rem", flexWrap: "wrap" }}
        >
          <div style={{ flex: "1 1 10rem" }}>
            <div style={{ margin: "1rem 0" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  marginBottom: "1rem",
                }}
              >
                Your Trip
              </div>
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ marginBottom: ".8rem", fontWeight: 400 }}>
                    Dates
                  </div>
                  <div style={{ fontWeight: 500 }}>
                    {isTrek
                      ? currentBookingMiniDate
                      : `${startingDate} - ${endingDate}`}
                  </div>
                </div>
                <div style={{ marginBottom: ".8rem", fontWeight: 400 }}>
                  <div>{isTrek ? "Adults" : "Guests"}</div>
                  <div style={{ fontWeight: 500 }}>
                    {isTrek ? adult : totalPeople} {isTrek ? null : "Rooms"}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <div style={{ fontSize: "22px", fontWeight: 500 }}>Details</div>
              <div>
                <input
                  type="number"
                  className="mobile"
                  minLength={10}
                  maxLength={10}
                  style={{ marginLeft: "1rem", width: "85%" }}
                  placeholder="Phone Number"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value)}
                  required
                ></input>

                <input
                  type="email"
                  className="mobile"
                  style={{ marginLeft: "1rem", width: "85%" }}
                  placeholder="Email"
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                  required
                ></input>
                <h4 style={{ color: "Red" }}>{mobileError}</h4>
              </div>
              <div
                onClick={onSubmitModal}
                style={{
                  border: "1px solid red",
                  width: "85%",
                  padding: "1rem",
                  textAlign: "center",
                  borderRadius: "10px",
                  marginTop: "1rem",
                  background: "#ff5e00",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Book Now
              </div>
            </div>
          </div>
          <div
            style={{
              flex: "1 1 10rem",
              border: "1px solid #e1e1e1",
              borderRadius: "10px",
              padding: "1rem",
            }}
          >
            <div
              className="paymentModalImgContainer"
              style={{ display: "flex" }}
            >
              <img
                className="paymentModalImg"
                style={{
                  width: "200px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src={data.images[0]}
                alt=""
              />
              <div
                className="paymentModalImgContent"
                style={{
                  margin: "0 1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: ".8rem" }}>{data?.name}</div>
                <div style={{ fontSize: "14px", color: "gray", flex: "1" }}>
                  {data?.area}
                </div>
                <div style={{ display: "flex" }}>
                  {data?.rating}
                  <Star style={{ color: "#ff5e00" }} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontWeight: "500", fontSize: "22px" }}>
                Price Details
              </div>
              <div
                className="paymentModalSubHeading"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  width: "90%",
                  padding: "0.6rem 0.6rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid lightblue",
                  margin: "0.8rem 0",
                  borderRadius: "5px",
                }}
              >
                <div>Price (For {numberOfDays} Day/s)</div>
                <div style={{ fontSize: "18px", fontWeight: "500" }}>
                  INR {totalAmount}
                </div>
              </div>
              <div
                className="paymentModalSubHeading"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  width: "90%",
                  padding: "0.6rem 0.6rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid lightblue",
                  margin: "0.8rem 0",
                  borderRadius: "5px",
                }}
              >
                <div>Service Fees</div>
                <div style={{ fontSize: "18px", fontWeight: "500" }}>
                  INR {serviceFees}
                </div>
              </div>
              <div
                className="paymentModalSubHeading"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  width: "90%",
                  padding: "0.6rem 0.6rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid lightblue",
                  margin: "0.8rem 0",
                  borderRadius: "5px",
                }}
              >
                <div>Total</div>
                <div style={{ fontSize: "18px", fontWeight: "500" }}>
                  INR {Number(totalAmount) + Number(serviceFees)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
