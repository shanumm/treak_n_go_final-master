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
        <label htmlFor="name">name</label>
        <input placeholder="Your Answer" type="text" name="name" />
        <label htmlFor="email">email</label>
        <input id="email" placeholder="Your Answer" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="mobile">mobile</label>
        <input placeholder="Your Answer" type="text" name="mobile" />
        <label htmlFor="participantsNumber">Number of participants</label>
        <input
          placeholder="Your Answer"
          type="text"
          name="participantsNumber"
        />
        <label htmlFor="agegroup">Age group</label>
        <input placeholder="Your Answer" type="text" name="agegroup" />
        <label htmlFor="expeditionPlace">expedition name</label>
        <input placeholder="Your Answer" type="text" name="expeditionPlace" />
        <label htmlFor="date">date</label>
        <input placeholder="Your Answer" type="text" name="date" />
        <label htmlFor="budget">budget</label>
        <input placeholder="Your Answer" type="text" name="budget" />
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
