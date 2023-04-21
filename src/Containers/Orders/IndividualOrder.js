import React from "react";
import "./IndividualOrder.css";
export default function IndividualOrder({ data }) {
  let normalDate = new Date(data?.date.seconds * 1000).toLocaleString("en-GB", {
    timeZone: "IST",
  });

  return (
    <div className="order">
      <div>
        <div>
          Name :<h4>{data?.email}</h4>
        </div>
        <div>
          Price :<h4>{data?.data?.price} INR</h4>
        </div>
        <div>
          Trek :<h4>{data?.data?.name}</h4>
        </div>
        <div>
          Date :<h4>{data?.travelDate}</h4>
        </div>
        <div>
          Mobile :<h4>{data?.number}</h4>
        </div>
      </div>
      <div>
        <div>
          Payment Id :<h4>{data?.PaymentId}</h4>
        </div>
        <div>
          Order Id :<h4>{data?.OrderId}</h4>
        </div>
      </div>
    </div>
  );
}
