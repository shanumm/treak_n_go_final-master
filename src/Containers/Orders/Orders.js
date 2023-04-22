import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Nav from "../Navbar/Nav";
import IndividualOrder from "./IndividualOrder";
import "./Orders.css";

export default function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    if (user?.email != "test@example.com") {
      const data = db
        .collection("Orders")
        .doc(user?.email)
        .collection("All Orders")
        .orderBy("date", "desc")
        .get()
        .then((snapshot) => {
          const orders = [];
          snapshot.forEach((order) => {
            orders.push(order.data());
            if (orders.length === snapshot.size) {
              setAllOrders(orders);
            }
          });
        });
    } else {
      const data = db
        .collection("Orders")
        .get()
        .then((snapshot) => {
          const orders = [];
          snapshot.docs.forEach((doc) => {
            db.collection("Orders")
              .doc(doc.id)
              .collection("All Orders")
              .orderBy("date", "desc")
              .get()
              .then((s) => {
                s.forEach((ss) => {
                  orders.push(ss.data());
                  if (orders.length === s.size) {
                    setAllOrders(orders);
                  }
                });
              });
          });
        });
    }
  }, []);
  return (
    <div>
      <div className="ordersContainer">
        <h2> Your Orders</h2>
        <div className="allOrders">
          {allOrders.map((order) => (
            <IndividualOrder data={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
