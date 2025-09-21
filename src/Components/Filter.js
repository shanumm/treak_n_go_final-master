import React, { useContext, useEffect, useState } from "react";
import "./filter.css";
import FilterContext from "../FilterContext";
import SearchIcon from "@mui/icons-material/Search";

export default function Filter({
  dayFilterTrek,
  isPeaceful,
  handleNameFilter,
  nameFilter,
}) {
  const { updateDayFilter, categoryUpdate, updateSort } =
    useContext(FilterContext);

  useEffect(() => {
    const dayFilterSelect = document.querySelector(".dayFilterSelect");
    const sortFilterSelect = document.querySelector(".sortFilterSelect");

    dayFilterSelect.selectedIndex = "0";
    sortFilterSelect.selectedIndex = "0";
  }, [categoryUpdate]);

  return (
    <div
      className="filter customFilterHeight"
      style={isPeaceful ? { width: "100%" } : {}}
    >
      <div>
        <select
          className="dayFilterSelect"
          onChange={(e) => updateDayFilter(e.target.value)}
          name="days"
          id=""
        >
          <option value="day" selected disabled>
            {isPeaceful ? "Location" : "Days"}
          </option>
          {dayFilterTrek &&
            dayFilterTrek.map((d) => <option value={d}>{d}</option>)}
        </select>
        <select
          style={{ marginLeft: "1rem" }}
          className="sortFilterSelect"
          onChange={(e) => updateSort(e.target.value)}
          name="sorting"
          id=""
        >
          <option value="sort" selected disabled>
            Sort
          </option>
          <option value="asc">Low to High</option>
          <option value="desc">High To Low</option>
        </select>
      </div>
      {isPeaceful && (
        <div
          style={{ position: "relative", margin: "1rem 0", flex: "0 0 15rem" }}
        >
          <input
            style={{
              width: "80%",
              borderRadius: "4px",
              background: "white",
              paddingLeft: "35px", // Add padding to make space for the icon
            }}
            type="text"
            onChange={handleNameFilter}
            placeholder="Search By Destination"
          />
          <SearchIcon
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "gray",
            }}
          />
        </div>
      )}
    </div>
  );
}
