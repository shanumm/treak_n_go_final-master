import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { useStateValue } from "../../StateProvider";
export default function Footer() {
  const [{ isPaymentModalOpen }] = useStateValue();

  return !isPaymentModalOpen ? (
    <div className="footer">
      <img
        src="https://cdn.pixabay.com/photo/2020/06/09/08/20/egypt-5277521_960_720.jpg"
        alt=""
      />
      <div>
        <div className="footerLeft">
          <div>
            <div>Need Help?</div>
            <div>
              <h3>+91-9654749746</h3>
              <h3>contact@trekngo.com</h3>
            </div>
          </div>
          <div>
            <div>
              <h3>About</h3>
              <ul>
                <li>
                  {" "}
                  <Link style={{ color: "inherit" }} to="aboutUs">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link style={{ color: "inherit" }} to="privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link style={{ color: "inherit" }} to="t&c">
                    T&C
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Discover</h3>
              <ul>
                <Link style={{ color: "inherit" }} to="blog">
                  <li>Blog</li>
                </Link>

                <Link
                  style={{ color: "inherit" }}
                  to="/perfectEscape/shortTreks"
                >
                  <li>Short Treks</li>
                </Link>
                <Link
                  style={{ color: "inherit" }}
                  to="/perfectEscape/longTreks"
                >
                  <li>Long Treks</li>
                </Link>
                <Link
                  style={{ color: "inherit" }}
                  to="/perfectEscape/isolatedTreks"
                >
                  <li>Isolated Treks</li>
                </Link>
              </ul>
            </div>
            <div>
              <h3>More</h3>
              <ul>
                <li>My Account</li>
                <li>Booked Tour</li>
                <li>Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="followUs">
            <div>Follow Us</div>
            <div>
              <a href="https://www.facebook.com/Trekngo/">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/trekngo/">
                <Instagram />
              </a>
              <a href="https://www.youtube.com/channel/UCmum696vcsFLcJAiVCYw89w">
                <YouTube />
              </a>
            </div>
          </div>
        </div>
        <div className="footerRight"></div>
      </div>
    </div>
  ) : null;
}
