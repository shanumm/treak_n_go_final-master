import { LocationCity, LocationOn } from "@mui/icons-material";
import React, { useEffect, useState, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import "./EachTrek.css";

// Lazy image component with loading state
const LazyImage = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={className} style={{ position: "relative" }}>
      {!imageLoaded && !imageError && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          Loading...
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

const EachTrek = memo(function EachTrek({
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

  const handleRemove = useCallback(() => {
    const check = window.confirm("Do you want to delete?");
    if (check) {
      const startTime = Date.now();
      console.log(
        `🚀 [EachTrek] Starting delete operation for ${
          data?.name
        } at ${new Date().toISOString()}`
      );

      const deleteData = db
        .collection(`All ${data?.category}`)
        .doc(data?.name)
        .delete()
        .then(() => {
          const totalTime = Date.now() - startTime;
          console.log(
            `🎉 [EachTrek] Delete operation completed in ${totalTime}ms`
          );
          alert("deleted successfully");
        })
        .catch((error) => {
          console.error(
            `❌ [EachTrek] Delete operation failed after ${
              Date.now() - startTime
            }ms:`,
            error
          );
        });
    }
  }, [data?.category, data?.name]);

  const edit = useCallback(() => {
    navigate(`/edit/${trekType}-${data?.name}`);
  }, [navigate, trekType, data?.name]);

  const handleClone = () => {
    if (cloneName != "") {
      const startTime = Date.now();
      console.log(
        `🚀 [EachTrek] Starting clone operation for ${
          data?.name
        } -> ${cloneName} at ${new Date().toISOString()}`
      );

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
                  .doc(cloneName.trim())
                  .set({
                    ...response.data(),
                    Details: {
                      ...response.data().Details,
                      name: cloneName.trim(),
                    },
                    price: parseInt(response.data().Details.price),
                  });
              })
              .then(() => {
                const totalTime = Date.now() - startTime;
                console.log(
                  `🎉 [EachTrek] Clone operation completed in ${totalTime}ms`
                );
                window.alert("Cloned Successfully");
                setCloneName("");
                setIsCloneActive(false);
              })
              .catch((err) => {
                console.error(
                  `❌ [EachTrek] Clone operation failed after ${
                    Date.now() - startTime
                  }ms:`,
                  err
                );
              });
          } else {
            const d = db
              .collection(`All ${e}`)
              .doc(data?.name)
              .get()
              .then((response) => {
                const dd = db
                  .collection(`All ${e}`)
                  .doc(cloneName.trim())
                  .set({
                    ...response.data(),
                    Details: {
                      ...response.data().Details,
                      name: cloneName.trim(),
                    },
                    price: parseInt(response.data().Details.price),
                  });
              })
              .then(() => {
                const totalTime = Date.now() - startTime;
                console.log(
                  `🎉 [EachTrek] Clone operation completed in ${totalTime}ms`
                );
                window.alert("Cloned Successfully");
                setCloneName("");
                setIsCloneActive(false);
              })
              .catch((err) => {
                console.error(
                  `❌ [EachTrek] Clone operation failed after ${
                    Date.now() - startTime
                  }ms:`,
                  err
                );
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
              .doc(cloneName.trim())
              .set({
                ...response.data(),
                Details: { ...response.data().Details, name: cloneName.trim() },
                price: parseInt(response.data().Details.price),
              });
          })
          .then(() => {
            const totalTime = Date.now() - startTime;
            console.log(
              `🎉 [EachTrek] Clone operation completed in ${totalTime}ms`
            );
            window.alert("Cloned Successfully");
            setCloneName("");
            setIsCloneActive(false);
          })
          .catch((err) => {
            console.error(
              `❌ [EachTrek] Clone operation failed after ${
                Date.now() - startTime
              }ms:`,
              err
            );
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
          <LazyImage src={data?.images[0]} alt={data?.name} className="" />
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
            <div></div>
            <div>
              {" "}
              {data?.discountValue
                ? Math.floor(
                    (data?.price * (100 - parseInt(data?.discountValue))) / 100
                  )
                : Math.floor(data?.price)}{" "}
              ₹
            </div>
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
              <button className="sendEnquiryButton">Send Enquiry</button>
            </Link>
            <Link
              to={
                id
                  ? `/treks/${data?.name}=${id}`
                  : `/treks/${data?.name}${trekType && `=${trekType}`}`
              }
            >
              <button>Book Now</button>
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
        {data?.name.toLowerCase().includes(editSearch.toLowerCase()) ? (
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
              <LazyImage src={data?.images[0]} alt={data?.name} className="" />
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
                <div></div>
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
                  <button className="sendEnquiryButton">Send Enquiry</button>
                </Link>
                <Link
                  to={
                    id
                      ? `/treks/${data?.name}=${id}`
                      : `/treks/${data?.name}${trekType && `=${trekType}`}`
                  }
                >
                  <button>Book Now</button>
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
});

export default EachTrek;
