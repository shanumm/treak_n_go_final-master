import React from "react";
import "./WhyTrekNgo.css";

function WhyTrekNgo() {
  return (
    <div className="why-trekngo">
      <div>
        <h2 style={{ fontSize: "30px", fontWeight: "600", color: "#ff5e00" }}>
          <span style={{ color: "black" }}>Why</span> TrekNgo?
        </h2>
        <p style={{ color: "gray", width: "80%", margin: "auto" }}>
          TrekNgo offers various packages; all you have to do is select the one
          which is most relevant. Create a journey full of memories.
        </p>
      </div>

      <div className="why-trekngo-item">
        <h3>+50 Premium tours</h3>
        <p>
          Trekking is not just a journey, it is the way of discovering yourself.
          Amidst nature you have that peace, that feeling and that time. So,
          make reservations soon and get lost to find the real your inner self.
        </p>
      </div>

      <div className="why-trekngo-item">
        <h3>+1000 Customers</h3>
        <p>
          We always hustle around trying to settle down and end up searching for
          a change to start over afresh. Do you have the same question on mind,
          when are holidays lined? Tired from everyday routine, looking for a
          break then go Trek.
        </p>
      </div>

      <div className="why-trekngo-item">
        <h3>24/7 Support</h3>
        <p>
          Extra Ordinary service right from the sales staff to tour managers to
          help you get the best holiday experience and life long memories.
        </p>
      </div>
    </div>
  );
}

export default WhyTrekNgo;
