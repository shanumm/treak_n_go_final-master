import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./custom.css";

function Custom() {
  const [state, handleSubmit] = useForm("mwkjaaqr");

  if (state.succeeded) {
    return (
      <p style={{ textAlign: "center", padding: "1rem 0" }}>
        Thanks for Contacting!
      </p>
    );
  }

  const clearForm = (e) => {
    e.preventDefault();
    document.querySelector(".custom").reset();
  };

  return (
    <form className="custom" onSubmit={handleSubmit}>
      <h4>Customize your adventure</h4>
      <div>
        <label htmlFor="name">Your Full Name</label>
        <input placeholder="John Doe" type="text" name="name" />
        <label htmlFor="email">Your Email</label>
        <input
          id="email"
          placeholder="johndoe@example.com"
          type="email"
          name="email"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="mobile">Your Mobile Number</label>
        <input placeholder="+91 (123) 456-7890" type="text" name="mobile" />
        <label htmlFor="participantsNumber">Number of Participants</label>
        <input
          placeholder="5" // You can specify the default number if applicable
          type="text"
          name="participantsNumber"
        />
        <label htmlFor="agegroup">Age Group</label>
        <input placeholder="25-40 years" type="text" name="agegroup" />
        <label htmlFor="expeditionPlace">Expedition Name</label>
        <input
          placeholder="Mount Everest Expedition"
          type="text"
          name="expeditionPlace"
        />
        <label htmlFor="date">Date of Expedition</label>
        <input placeholder="MM/DD/YYYY" type="text" name="date" />
        <label htmlFor="budget">Budget</label>
        <input placeholder="5000 Rs" type="text" name="budget" />
        <div>
          <button type="submit" disabled={state.submitting}>
            Confirm
          </button>
          <button onClick={clearForm}>Clear</button>
        </div>
      </div>
    </form>
  );
}

export default Custom;
