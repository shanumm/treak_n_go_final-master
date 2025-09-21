import React from "react";
import "./IndividualOrder.css";

export default function IndividualOrder({ data }) {
  let normalDate = new Date(data?.date.seconds * 1000).toLocaleString("en-GB", {
    timeZone: "IST",
  });

  return (
    <div className="order">
      <table>
        <tbody>
          {data?.email && (
            <tr>
              <th>Name</th>
              <td>{data?.email}</td>
            </tr>
          )}
          {data?.data?.price && (
            <tr>
              <th>Price</th>
              <td>{data?.data?.price} INR</td>
            </tr>
          )}
          {data?.data?.name && (
            <tr>
              <th>Trek</th>
              <td>{data?.data?.name}</td>
            </tr>
          )}
          {data?.travelDate && (
            <tr>
              <th>Date</th>
              <td>{data?.travelDate}</td>
            </tr>
          )}
          {data?.number && (
            <tr>
              <th>Mobile</th>
              <td>{data?.number}</td>
            </tr>
          )}
          {data?.Adults && (
            <tr>
              <th>Adults</th>
              <td>{data?.Adults}</td>
            </tr>
          )}
          {data?.selectedAddOns && (
            <tr>
              <th>Selected Add-Ons</th>
              <td>
                <ul>
                  {data?.selectedAddOns.map((addOn, index) => (
                    <li key={index}>{addOn.name} (₹{addOn.price}) - {addOn.quantity}x</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
          {data?.packageSelectedData && (
            <tr>
              <th>Package Selected Data</th>
              <td>{data?.packageSelectedData.description} (₹{data?.packageSelectedData.price})</td>
            </tr>
          )}
          {data?.selectedAvailableBatch && (
            <tr>
              <th>Selected Available Batch</th>
              <td>{data?.selectedAvailableBatch.startDate} - {data?.selectedAvailableBatch.endDate}</td>
            </tr>
          )}
          {data?.PaymentId && (
            <tr>
              <th>Payment Id</th>
              <td>{data?.PaymentId}</td>
            </tr>
          )}
          {data?.OrderId && (
            <tr>
              <th>Order Id</th>
              <td>{data?.OrderId}</td>
            </tr>
          )}
          {data?.signature && (
            <tr>
              <th>Signature</th>
              <td>{data?.signature}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
