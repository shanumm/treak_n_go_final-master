import React, { useEffect, useState } from "react";
import "./nav.css";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";
import Logo from "../../Images/logo.png";
import { Facebook, Instagram, Person, YouTube } from "@material-ui/icons";

export default function Nav() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [clickedNav, setClickedNav] = useState(null);
  const location = useLocation();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  useEffect(() => {
    if (location.pathname.split("/")[1] === "") {
      setClickedNav(location.pathname.split("/")[1]);
    } else if (location.pathname.split("/")[1] === "treks") {
      setClickedNav(location.pathname.split("/")[1]);
    } else if (location.pathname.split("/")[1] === "blog") {
      setClickedNav(location.pathname.split("/")[1]);
    } else if (location.pathname.split("/")[1] === "orders") {
      setClickedNav(location.pathname.split("/")[1]);
    } else if (location.pathname.split("/")[1] === "addTrek") {
      setClickedNav(location.pathname.split("/")[1]);
    } else if (location.pathname.split("/")[1] === "addBlog") {
      setClickedNav(location.pathname.split("/")[1]);
    }
  }, [location]);

  useEffect(() => {
    const burgerLinks = document.querySelector(".burgerLinks");
    const burgerNavLinks = document.querySelectorAll(".burgerNavLinks");
    burgerNavLinks.forEach((b) => {
      b.addEventListener("click", () => {
        burgerLinks.classList.remove("burgerLinksActive");
      });
    });
  }, []);

  const handleNav = () => {
    const navBurgerMenu = document.querySelector(".navBurgerMenu");
    const burgerLinks = document.querySelector(".burgerLinks");
    burgerLinks.classList.toggle("burgerLinksActive");
  };

  const goToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
    });
  };
  return (
    <div className="nav">
      <div>
        <div className="navTop"></div>
      </div>
      <nav
        className="navBar"
        onScroll={(e) => {
          var c = e.getBoundingClientRect();
          console.log(c);
        }}
      >
        <Link to="/">
          <div id="logo">
            <img src={Logo} alt="" />
          </div>
        </Link>
        <div onClick={handleNav} className="navBurgerMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="burgerLinks">
          <ul className="burgerNavLinks">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/treks">
              <li>Treks</li>
            </Link>
            <Link to="/custom">
              <li>Customize</li>
            </Link>
            <Link to="/blog">
              <li>Blogs</li>
            </Link>
            <li onClick={goToBottom}>Contact</li>
            {user?.email === "test@example.com" && (
              <Link to="/addTrek">
                <li>Edit/Update Trek</li>
              </Link>
            )}
            {user?.email === "test@example.com" && (
              <Link to="/blog/addBlog">
                <li>Add Blog</li>
              </Link>
            )}
            {user && (
              <Link to="/orders">
                <li>Orders</li>
              </Link>
            )}
            <Link to={!user && "/login"}>
              <li onClick={handleAuth}>{user ? "Sign Out" : "Login"}</li>
            </Link>
          </ul>
        </div>
        <ul className="navLinks">
          <Link to="/">
            <li className={clickedNav === "" ? "clickedActiveNav" : null}>
              Home
            </li>
          </Link>
          <Link to="/treks">
            <li className={clickedNav === "treks" ? "clickedActiveNav" : null}>
              Treks
            </li>
          </Link>
          <Link to="/blog">
            <li className={clickedNav === "blog" ? "clickedActiveNav" : null}>
              Blogs
            </li>
          </Link>
          {user?.email === "test@example.com" && (
            <Link to="/blog/addBlog">
              <li
                className={clickedNav === "addBlog" ? "clickedActiveNav" : null}
              >
                Add Blog
              </li>
            </Link>
          )}
          <li onClick={goToBottom}>Contact</li>
          {user?.email === "test@example.com" && (
            <Link to="/addTrek">
              <li
                className={clickedNav === "addTrek" ? "clickedActiveNav" : null}
              >
                Edit/Update Trek
              </li>
            </Link>
          )}
          {user && (
            <Link to="/orders">
              <li
                className={clickedNav === "orders" ? "clickedActiveNav" : null}
              >
                Orders
              </li>
            </Link>
          )}
          <div className="personContainer">
            <div className="signInOut">
              <Link to={!user && "/login"}>
                <li onClick={handleAuth}>{user ? "Sign Out" : "Login"}</li>
              </Link>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}
