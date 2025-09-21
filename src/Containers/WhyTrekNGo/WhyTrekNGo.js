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
        <h3>Explore the unexplored</h3>
        <p>
          TrekNgo is renowned for its tranquil yet adventurous trekking tours in
          the Himalayan region. It extensively explores lesser-known areas and
          is recognized for its discovery of new trekking tours, trails, and
          homestays. These initiatives contribute to the economic development of
          rural areas without compromising the local culture, while also
          providing offbeat destinations for adventure seekers.
        </p>
      </div>

      <div className="why-trekngo-item">
        <h3>Clean/Green Trails</h3>
        <p>
          We firmly believe in preserving the natural beauty of the trails we
          traverse. To achieve this, we prioritize training our trek leaders to
          educate trekkers on the importance of leaving no trace behind. We
          emphasize the need to refrain from littering, disposing of plastic
          waste, or leaving any carbon footprint during our treks.
        </p>
      </div>

      <div className="why-trekngo-item">
        <h3>Life transformation experiences</h3>
        <p>
          Yes, it&#39;s true that trekking makes you a better person. You become
          connected to nature by staying away from electronic devices for a few
          days, learning, observing, and admiring nature. Most importantly, you
          challenge yourself. Through trekking, we not only improve our fitness
          but also enhance our learning abilities. We develop a deeper
          appreciation for nature and gain valuable experiences.
        </p>
      </div>
    </div>
  );
}

export default WhyTrekNgo;
