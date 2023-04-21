import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import EachTrek from "./EachTrek";
import FilterContext from "../../FilterContext";
export default function AllTreks({
  data,
  packageData,
  isEditable,
  escape,
  id,
  campsPackage,
  trekType,
  editSearch,
}) {
  useEffect(() => {
    console.log(data, ":::::::");
  }, [data]);
  const { DayFilter } = useContext(FilterContext);

  return (
    <div className="allTreks">
      {data?.length > 0 &&
        id &&
        data
          ?.filter((d) => {
            if (id.includes(d.SLI)) {
              console.log("true");
              return d;
            }
          })
          .map((trekData) => (
            <EachTrek
              editSearch={editSearch}
              data={trekData}
              isEditable={isEditable}
              trek="trek"
              trekType="trek"
              escape={escape}
              id={id}
            />
          ))}
      {data?.length > 0 &&
        !id &&
        data
          ?.filter((f) => {
            console.log("first");
            if (f.itinerary.length == DayFilter) {
              return f;
            }
            if (DayFilter == "Days") return data;
          })
          ?.map((trekData) => (
            <EachTrek
              editSearch={editSearch}
              data={trekData}
              isEditable={isEditable}
              trek="trek"
              trekType="trek"
              escape={escape}
            />
          ))}
      {packageData?.length > 0 &&
        !id &&
        packageData
          ?.filter((f) => {
            if (f.itinerary.length == DayFilter) {
              return f;
            }
            if (DayFilter == "Days") return packageData;
          })
          ?.map((trekData) => (
            <EachTrek
              editSearch={editSearch}
              data={trekData}
              isEditable={isEditable}
              trek="winter"
              escape={escape}
              trekType={trekType}
            />
          ))}
      {campsPackage?.length > 0 &&
        !id &&
        campsPackage?.map((trekData) => (
          <EachTrek
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
}
