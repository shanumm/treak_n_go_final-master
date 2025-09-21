import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddBlog from "./Components/Add Blog/AddBlog";
import Allblog from "./Components/AllBlog/Allblog";
import Blog from "./Components/BlogPage/Blog";
import IndividualPeacefulStays from "./Components/Individual Peaceful Stays/IndividualPeacefulStays";
import IndividualBlog from "./Components/IndividualBlog/IndividualBlog";
import AddTrek from "./Containers/AdminAddTrek/AddTrek";
import EditTreksPackages from "./Containers/AdminAddTrek/EditTreksPackages";
import Custom from "./Containers/CustomTrek/Custom";
import Edit from "./Containers/Edit/Edit";
import Footer from "./Containers/Footer/Footer";
import IndividualTrek from "./Containers/IndividualTrek/IndividualTrek";
import LoginPage from "./Containers/Login/LoginPage";
import Nav from "./Containers/Navbar/Nav";
import Orders from "./Containers/Orders/Orders";
import PeacefulStays from "./Containers/Peaceful Stays/PeacefulStays";
import PerfectEscape from "./Containers/Perfect Escape/PerfectEscape";
import Treks from "./Containers/Treks/Treks";
import { auth, db } from "./firebase";
import MainPage from "./MainPage";
import ScrollToTop from "./ScrollToTop";
import { useStateValue } from "./StateProvider";
import { FilterProvider } from "./FilterContext";
import Privacy from "./Containers/PrivacyPolicy/Privacy";
import AboutUs from "./Containers/PrivacyPolicy/AboutUs";
import TermsOfUse from "./Containers/PrivacyPolicy/T&C";
import EditCamps from "./Containers/Edit Camps/EditCamps";
import EditIndividualCamps from "./Containers/Edit Camps/EditIndividualCamps";
import { useNavigate } from "react-router-dom";

const treksData = [
  { old: "/tour/kheerganga-trek", new: "/treks/KHEERGANGA%20TREK=trek" },
  { old: "/tour/kareri-lake-trek", new: "/treks/Kareri%20Lake%20Trek=trek" },
  { old: "/tour/triund-camping-1n2d", new: "/treks/Triund%20Top%20Trek=trek" },
  {
    old: "/tour/kailashmanimaheshparikramatrek",
    new: "/treks/kailash%20Manimahesh=trek",
  },
  { old: "/tour/kugtipass", new: "/treks/Kugti%20Pass%20Trek=trek" },
  {
    old: "/tour/chopta-tungnath-trek",
    new: "/treks/Tungnath%20Chandrashilla%20&%20Deoriatal%20Trek=multiday",
  },
  { old: "/tour/kedarkantha-trek", new: "/treks/Kedarkantha%20Trek=trek" },
  // ... add more mappings as needed ...
];

function RedirectToNewUrl({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return null;
}

function generateRedirectRoutes() {
  return treksData.map((trek, index) => (
    <Route
      key={index}
      exact
      path={trek.old}
      element={<RedirectToNewUrl to={trek.new} />}
    />
  ));
}
export default function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [searchQueryData, setSearchQueryData] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  useEffect(() => {
    const data = db
      .collection("All Trek")
      .get()
      .then((snapshot) => {
        let searchData = [];
        snapshot.docs.forEach((doc) => {
          searchData.push({
            query: doc.data(),
          });
        });
        setSearchQueryData(searchData);
      });
  }, []);

  // const checking = () => {
  //   const trekData = db
  //     .collection("All Trek")
  //     .doc("Leh Ladakh")
  //     .get()
  //     .then((snapshot) => {
  //       db.collection("All MultiDay")
  //         .doc("Leh Ladakh")
  //         .set({ ...snapshot.data() })
  //         .then(() => {
  //           console.log("done");
  //         })
  //         .catch((err) => console.log(err));
  //     });
  // };

  return (
    <FilterProvider>
      <Router>
        <ScrollToTop />
          <Nav />
        <div className="App">
          {/* <button onClick={checking}>testing</button> */}
          <Routes>
            <Route
              exact
              path="/"
              element={<MainPage data={searchQueryData} />}
            />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/treks" element={<Treks />} />
            <Route exact path="/treks/:id" element={<IndividualTrek />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:id" element={<IndividualBlog />} />
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/aboutUs" element={<AboutUs />} />
            <Route exact path="/t&c" element={<TermsOfUse />} />
            <Route
              exact
              path="/peacefulStays/:id"
              element={<PeacefulStays />}
            />
            <Route
              exact
              path="stays/:id"
              element={<IndividualPeacefulStays />}
            />
            <Route
              exact
              path="/perfectEscape/:id"
              element={<PerfectEscape />}
            />
            <Route exact path="/custom" element={<Custom />} />
            {user && (
              <>
                <Route exact path="/blog/addBlog" element={<AddBlog />} />
                <Route exact path="/orders" element={<Orders />} />
                <Route
                  exact
                  path="/addTrek"
                  element={<AddTrek searchQueryData={searchQueryData} />}
                />
                <Route exact path="/edit/:id" element={<Edit />} />
                <Route exact path="/editCamps" element={<EditCamps />} />
                <Route
                  exact
                  path="/editCamps/:id"
                  element={<EditIndividualCamps />}
                />
              </>
            )}
            {generateRedirectRoutes()}
            <Route element={<MainPage data={searchQueryData} />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </FilterProvider>
  );
}
