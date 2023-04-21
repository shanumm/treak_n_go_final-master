import React from "react";
import "./custom.css";
export default function Custom() {
  const clearForm = (e) => {
    e.preventDefault();
    document.querySelector(".custom").reset();
  };
  return (
    <form className="custom">
      <h4>Customize your adventure</h4>
      <div>
        <label htmlFor="name">name</label>
        <input placeholder="Your Answer" type="text" name="name" />
        <label htmlFor="email">email</label>
        <input placeholder="Your Answer" type="text" name="email" />
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
        <select name="expedition">
          <option value="place1">Place1</option>
          <option value="place2">Place2</option>
        </select>
        <label htmlFor="expeditionPlace">expedition name</label>
        <input placeholder="Your Answer" type="text" name="expeditionPlace" />
        <label htmlFor="date">date</label>
        <input placeholder="Your Answer" type="text" name="date" />
        <label htmlFor="budget">budget</label>
        <input placeholder="Your Answer" type="text" name="budget" />
        <div>
          <button type="submit">Confirm</button>
          <button onClick={clearForm}>Clear</button>
        </div>
      </div>
    </form>
  );
}
