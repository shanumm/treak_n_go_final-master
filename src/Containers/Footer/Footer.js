import { Facebook, Instagram, YouTube } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
export default function Footer() {
  return (
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
              <h3>trekngotravels@gmail.com</h3>
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
                <li>FAQ</li>
                <li>Login</li>
                <li>Register</li>
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
                <li>Blog</li>
                <li>Tour Guide</li>
                <li>Wishlist</li>
                <li>Gallary</li>
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
  );
}
