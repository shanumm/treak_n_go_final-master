import { LocationCity, LocationOn } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import "./EachTrek.css";
export default function EachTrek({
  data,
  trek,
  escape,
  id,
  trekType,
  editSearch,
  extra,
}) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isCloneActive, setIsCloneActive] = useState(false);
  const [cloneName, setCloneName] = useState("");
  const navigate = useNavigate();

  console.log(data);

  const handleRemove = () => {
    const check = window.confirm("Do you want to delete?");
    if (check) {
      const deleteData = db
        .collection(`All ${data?.category}`)
        .doc(data?.name)
        .delete()
        .then(() => {
          alert("deleted successfully");
        });
    }
  };
  const edit = () => {
    navigate(`/edit/${trekType}-${data?.name}`);
  };

  const handleClone = () => {
    if (cloneName != "") {
      if (data?.allSelectedCategory.length > 0) {
        data?.allSelectedCategory.forEach((e) => {
          if (e === "Short" || e === "Long" || e === "Isolated") {
            const d = db
              .collection(`All Short-Long-Isolated Trek`)
              .doc(data?.name)
              .get()
              .then((response) => {
                const dd = db
                  .collection(`All Short-Long-Isolated Trek`)
                  .doc(cloneName)
                  .set({
                    ...response.data(),
                    Details: { ...response.data().Details, name: cloneName },
                    price: parseInt(response.data().Details.price),
                  });
              })
              .then(() => {
                window.alert("Cloned Successfully");
                setCloneName("");
                setIsCloneActive(false);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            const d = db
              .collection(`All ${e}`)
              .doc(data?.name)
              .get()
              .then((response) => {
                const dd = db
                  .collection(`All ${e}`)
                  .doc(cloneName)
                  .set({
                    ...response.data(),
                    Details: { ...response.data().Details, name: cloneName },
                    price: parseInt(response.data().Details.price),
                  });
              })
              .then(() => {
                window.alert("Cloned Successfully");
                setCloneName("");
                setIsCloneActive(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      } else {
        const d = db
          .collection(`All ${data?.category}`)
          .doc(data?.name)
          .get()
          .then((response) => {
            const dd = db
              .collection(`All ${data?.category}`)
              .doc(cloneName)
              .set({
                ...response.data(),
                Details: { ...response.data().Details, name: cloneName },
                price: parseInt(response.data().Details.price),
              });
          })
          .then(() => {
            window.alert("Cloned Successfully");
            setCloneName("");
            setIsCloneActive(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const style = {};
  if (escape != "undefined") {
    style.flex = "0 0 14 !important";
  }
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg|JPEG)$/.test(url);
  };
  const backFallImage =
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80";
  const img =
    "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png";

  if (editSearch === "") {
    return (
      <div
        className="eachTrekContainer"
        style={
          user?.email === "test@example.com"
            ? { height: "25rem", ...style }
            : { ...style }
        }
      >
        <div
          className="eachTrekImg"
          style={isCloneActive ? { minHeight: "100%" } : null}
        >
          {user?.email === "test@example.com" && (
            <>
              <div className="clone">
                <div
                  className="cloneMenu"
                  onClick={() => setIsCloneActive(!isCloneActive)}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div
                className={
                  isCloneActive
                    ? "cloneContainer cloneContainerActive"
                    : "cloneContainer"
                }
              >
                <div className="cloneDetailsContainer">
                  <input
                    onChange={(e) => setCloneName(e.target.value)}
                    type="text"
                    placeholder="Enter A Name"
                  />
                  <div>
                    <button onClick={() => setIsCloneActive(false)}>
                      Cancel
                    </button>
                    <button onClick={handleClone}>Clone</button>
                  </div>
                </div>
              </div>
            </>
          )}
          <img src={data?.images[0]} alt="" />
          <div className="eachTrekTag">{data?.duration}</div>
        </div>
        <div className="eachTrekDetails">
          <div className="eachTrekDetailsName">
            <h3>{data?.name.toLowerCase()}</h3>
          </div>
          <div className="eachTrekDetailsDuration">
            <div>
              {" "}
              <LocationOn /> {data?.area ? data?.area : "lorem"}
            </div>
          </div>
          <div className="eachTrekDetailsPrice">
            <div>Price -</div>
            <div> {data?.price} ₹</div>
          </div>
          <div className="eachTrekDetailsButton">
            <Link
              to={
                id
                  ? `/treks/${data?.name}=${id}`
                  : `/treks/${data?.name}${
                      trekType && `=${trekType}`
                    }?scrollTo=enquiry`
              }
            >
              <button>Send Enquiry</button>
            </Link>
            <Link
              to={
                id
                  ? `/treks/${data?.name}=${id}`
                  : `/treks/${data?.name}${trekType && `=${trekType}`}`
              }
            >
              <button>Know Now</button>
            </Link>
            {user?.email === "test@example.com" && (
              <>
                <button onClick={handleRemove} style={{ marginLeft: ".2rem" }}>
                  Remove Trek
                </button>
                <button onClick={edit} style={{ marginLeft: ".2rem" }}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {data?.name.toLowerCase().includes(editSearch) ? (
          <div
            className="eachTrekContainer"
            style={
              user?.email === "test@example.com"
                ? { height: "25rem", ...style }
                : { ...style }
            }
          >
            <div
              className="eachTrekImg"
              style={isCloneActive ? { minHeight: "100%" } : null}
            >
              {user?.email === "test@example.com" && (
                <>
                  <div className="clone">
                    <div
                      className="cloneMenu"
                      onClick={() => setIsCloneActive(!isCloneActive)}
                    >
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <div
                    className={
                      isCloneActive
                        ? "cloneContainer cloneContainerActive"
                        : "cloneContainer"
                    }
                  >
                    <div className="cloneDetailsContainer">
                      <input
                        onChange={(e) => setCloneName(e.target.value)}
                        type="text"
                        placeholder="Enter A Name"
                      />
                      <div>
                        <button onClick={() => setIsCloneActive(false)}>
                          Cancel
                        </button>
                        <button onClick={handleClone}>Clone</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <img src={data?.images[0]} alt="" />
              <div className="eachTrekTag">{data?.duration}</div>
            </div>
            <div className="eachTrekDetails">
              <div className="eachTrekDetailsName">
                <h3>{data?.name.toLowerCase()}</h3>
              </div>
              <div className="eachTrekDetailsDuration">
                <div>
                  {" "}
                  <LocationOn /> {data?.area ? data?.area : "lorem"}
                </div>
              </div>
              <div className="eachTrekDetailsPrice">
                <div>Price - </div>
                <div> {data?.price} ₹</div>
              </div>
              <div className="eachTrekDetailsButton">
                <Link
                  to={
                    id
                      ? `/treks/${data?.name}=${id}`
                      : `/treks/${data?.name}${
                          trekType && `=${trekType}`
                        }?scrollTo=enquiry`
                  }
                >
                  <button>Send Enquiry</button>
                </Link>
                <Link
                  to={
                    id
                      ? `/treks/${data?.name}=${id}`
                      : `/treks/${data?.name}${trekType && `=${trekType}`}`
                  }
                >
                  <button>Know Now</button>
                </Link>
                {user?.email === "test@example.com" && (
                  <>
                    <button
                      onClick={handleRemove}
                      style={{ marginLeft: ".2rem" }}
                    >
                      Remove Trek
                    </button>
                    <button onClick={edit} style={{ marginLeft: ".2rem" }}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
