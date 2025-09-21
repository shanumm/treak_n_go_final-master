import React, { useEffect, useContext, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import EachTrek from "./EachTrek";
import FilterContext from "../../FilterContext";

const AllTreks = memo(function AllTreks({
  data,
  packageData,
  isEditable,
  escape,
  id,
  campsPackage,
  trekType,
  editSearch,
}) {
  const { DayFilter } = useContext(FilterContext);

  // Memoize filtered data to prevent unnecessary re-renders
  const filteredData = useMemo(() => {
    if (!data?.length) return [];

    if (id) {
      return data.filter((d) => id.includes(d.SLI));
    }

    if (DayFilter === "Days") {
      return data;
    }

    return data.filter((f) => f.itinerary?.length === DayFilter);
  }, [data, DayFilter, id]);

  const filteredPackageData = useMemo(() => {
    if (!packageData?.length) return [];

    if (DayFilter === "Days") {
      return packageData;
    }

    return packageData.filter((f) => f.itinerary?.length === DayFilter);
  }, [packageData, DayFilter]);

  return (
    <div className="allTreks">
      {/* Render filtered data */}
      {filteredData.map((trekData, index) => (
        <EachTrek
          key={`trek-${trekData.name}-${index}`}
          editSearch={editSearch}
          data={trekData}
          isEditable={isEditable}
          trek="trek"
          trekType="trek"
          escape={escape}
          id={id}
        />
      ))}

      {/* Render filtered package data */}
      {filteredPackageData.map((trekData, index) => (
        <EachTrek
          key={`package-${trekData.name}-${index}`}
          editSearch={editSearch}
          data={trekData}
          isEditable={isEditable}
          trek="winter"
          escape={escape}
          trekType={trekType}
        />
      ))}

      {/* Render camps package data */}
      {campsPackage?.length > 0 &&
        !id &&
        campsPackage.map((trekData, index) => (
          <EachTrek
            key={`camps-${trekData.name}-${index}`}
            editSearch={editSearch}
            data={trekData}
            isEditable={isEditable}
            trek="multiday"
            escape={escape}
            trekType="multiday"
          />
        ))}
    </div>
  );
});

export default AllTreks;
