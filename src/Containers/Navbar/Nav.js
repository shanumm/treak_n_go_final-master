import React, { useEffect, useState } from "react";
import "./nav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";
import Logo from "../../Images/logo.png";
import { IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function Nav() {
  const [{ basket, user, isPaymentModalOpen }, dispatch] = useStateValue();
  const [clickedNav, setClickedNav] = useState(null);
  const [isSticky, setIsSticky] = useState(true);
  const [search, setSearch] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/treks/")) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  }, [location]);

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
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
    } else if (location.pathname.split("/")[1] === "custom") {
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

  document.body.addEventListener("click", (event) => {
    const burgerLinks = document.querySelector(".burgerLinks");
    const navBurgerMenu = document.querySelector(".navBurgerMenu");

    // Check if the click target is not within the .burgerLinks container
    if (
      burgerLinks &&
      navBurgerMenu &&
      burgerLinks.classList.contains("burgerLinksActive") &&
      !burgerLinks.contains(event.target) &&
      !navBurgerMenu.contains(event.target)
    ) {
      burgerLinks.classList.remove("burgerLinksActive");
    }
  });

  const handleNav = () => {
    const navBurgerMenu = document.querySelector(".navBurgerMenu");
    const burgerLinks = document.querySelector(".burgerLinks");
    burgerLinks.classList.toggle("burgerLinksActive");
  };

  const navigate = useNavigate();

  const goToStays = async () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToPeacefulStay: true } });
      await new Promise((resolve) => setTimeout(() => resolve(), 100));
    }

    const peacefulStayElement = document.getElementById("peacefulStay");
    const offset = 100;

    if (peacefulStayElement) {
      const elementPosition =
        peacefulStayElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const goToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
    });
  };
  return !isPaymentModalOpen ? (
    <div className={`nav${isSticky ? " sticky" : ""}`}>
      {showSearch && (
        <div className="searchOverlay">
          <div className="searchBar">
            <InputBase
              autoFocus
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search “TrekNgo”"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowSearch(false);
                  setSearch("");
                  e.preventDefault();
                  navigate(`/treks?search=${search}&adults=${0}`);
                }
              }}
            />
            {/* Display the search results here */}
          </div>
        </div>
      )}

      <div className={showSearch ? "hideWhenSearchOpen" : ""}>
        <div className="navTop"></div>
      </div>
      <nav
        className={`navBar${showSearch ? " hideWhenSearchOpen" : ""}`}
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
        <IconButton className="searchIcon" onClick={toggleSearch}>
          <SearchIcon />
        </IconButton>
        <div className="burgerLinks">
          <ul className="burgerNavLinks">
            <Link to="/treks">
              <li>Treks</li>
            </Link>
            <Link to="/custom">
              <li>Customize</li>
            </Link>
            <Link to="/blog">
              <li>Blogs</li>
            </Link>
            <a onClick={goToBottom}>
              <li>Contact</li>
            </a>
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
          <Link to="/custom">
            <li className={clickedNav === "custom" ? "clickedActiveNav" : null}>
              Customize
            </li>
          </Link>

          <a>
            <li onClick={goToStays}>Stays</li>
          </a>

          {user?.email === "test@example.com" && (
            <Link to="/blog/addBlog">
              <li
                className={clickedNav === "addBlog" ? "clickedActiveNav" : null}
              >
                Add Blog
              </li>
            </Link>
          )}
          <a>
            <li onClick={goToBottom}>Contact</li>
          </a>
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
  ) : null;
}
