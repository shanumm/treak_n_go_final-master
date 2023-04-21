import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";

import AllTreks from "../Treks/AllTreks";

export default function ({ editSearch }) {
  const [editTrek, setEditTrek] = useState([]);
  const [editPackage, setEditPackage] = useState([]);
  const [campsPackage, setCampsPackage] = useState([]);

  useEffect(() => {
    const trekData = db
      ?.collection("All Trek")
      .get()
      .then((snapshot) => {
        let allTrek = [];
        snapshot.docs.forEach((doc) => {
          allTrek.push(doc.data().Details);
          if (allTrek.length == snapshot.docs.length) {
            setEditTrek(allTrek);
          }
        });
      });
    const packageData = db
      ?.collection("All Winter Trek")
      .get()
      .then((snapshot) => {
        let allPackage = [];
        snapshot.docs.forEach((doc) => {
          allPackage.push(doc.data().Details);
          if (allPackage.length == snapshot.docs.length) {
            setEditPackage(allPackage);
          }
        });
      });
    const multidayPackage = db
      ?.collection("All MultiDay")
      .get()
      .then((snapshot) => {
        let allPackage = [];
        snapshot.docs.forEach((doc) => {
          allPackage.push(doc.data().Details);
          if (allPackage.length == snapshot.docs.length) {
            setCampsPackage(allPackage);
          }
        });
      });
  }, []);


  return (
    <div>
      <AllTreks
        editSearch={editSearch}
        isEditable={true}
        campsPackage={campsPackage}
        packageData={editPackage}
        data={editTrek}
      />
    </div>
  );
}
