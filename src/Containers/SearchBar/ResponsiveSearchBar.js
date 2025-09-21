import {
  BeachAccess,
  LocationOn,
  CalendarToday,
  RowingSharp,
  SearchTwoTone,
} from "@mui/icons-material";
import React from "react";
import "./SearchBar.css";

export default function ResponsiveSearchBar() {
  return (
    <div className="ResponsiveSearchBar">
      <div className="searchComponents">
        <div className="searchHeading">Where</div>
        <div>
          <input type="text" placeholder="Place to travel" />
          <LocationOn />
        </div>
      </div>
      <div className="searchComponents">
        <div className="searchHeading">Duration</div>
        <div>
          <input type="text" placeholder="Number of days" />
          <CalendarToday />
        </div>
      </div>
      <div className="searchComponents searchButton">
        <SearchTwoTone />
        <h3>Search</h3>
      </div>
    </div>
  );
}
