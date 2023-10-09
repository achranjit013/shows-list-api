import React, { useState } from "react";
import { fetchShows } from "../utils/axiosHelper";
import { CastDetails } from "./CastDetails";
import { Button, Modal } from "react-bootstrap";

export const CustomCard = ({ shows, handleOnClick }) => {
  const [cast, setCast] = useState([]);
  // for modal
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const handleShow = async (showID) => {
    const data = await fetchShows(showID);
    setCast(data);
    setModal(true);
  };

  return (
    <div className="d-flex flex-wrap justify-content-center align-item-center">
      {shows.map((item, i) => (
        <div className="card mb-3" style={{ maxWidth: "20rem" }} key={i}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={item.show.image && item.show.image.original}
                alt="img"
                className="img-fluid img-thumbnail"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {/* Button trigger modal */}
                  <Button
                    variant="warning"
                    onClick={() => handleShow(item.show.id)}
                  >
                    {item.show.name}
                  </Button>
                  (
                  {item.show.premiered ? item.show.premiered.split("-")[0] : ""}
                  -{item.show.ended ? item.show.ended.split("-")[0] : "Running"}
                  )
                </h5>
                <p className="card-text">
                  {item.show.summary
                    ? item.show.summary
                        .replace(/<\/?p>/g, "")
                        .replace(/<\/?b>/g, "")
                    : ""}
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    <span className="text-primary fw-bold">
                      Average run time:
                    </span>{" "}
                    {item.show.averageRuntime}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    <span className="text-primary fw-bold">Language:</span>{" "}
                    {item.show.language}
                    {item.show.network
                      ? " (" + item.show.network.country.name + ")"
                      : ""}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    <span className="text-primary fw-bold">Ratings:</span>{" "}
                    {item.show.rating.average ? item.show.rating.average : "-"}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    <span className="text-primary fw-bold">Type:</span>{" "}
                    {item.show.type}
                  </small>
                </p>
                <p className="card-text">
                  <span className="text-primary fw-bold">Genre(s):</span>
                  <br />
                  {item.show.genres.map((genre, index) => (
                    <small className="text-body-secondary m-5" key={index}>
                      {genre}
                      <br />
                    </small>
                  ))}
                </p>
                <p className="card-text">
                  <small className="text-body-secondary d-flex justify-content-between">
                    {!item.attr && (
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          handleOnClick({
                            showId: item.show.id,
                            attr: "favorite",
                          })
                        }
                      >
                        Add to your favorite
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleOnClick({ showId: item.show.id, attr: "delete" })
                      }
                    >
                      Delete
                    </button>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* modal */}
      <CastDetails handleClose={handleClose} modal={modal} cast={cast} />
    </div>
  );
};
