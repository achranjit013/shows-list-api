import React from "react";

export const CustomCard = ({ shows, handleOnClick }) => {
  return shows.map((item, i) => (
    <div className="row g-3" key={i}>
      {console.log(item.show)}
      <div className="col-md">
        <ul className="list-group">
          <li className="list-group-item">
            <img
              src={item.show.image && item.show.image.original}
              alt="img"
              className="img-fluid img-thumbnail"
              width={250}
            />
          </li>
        </ul>
      </div>
      <div className="col-md">
        <ul className="list-group">
          <li className="list-group-item">
            <span className="text-primary fw-bold">Title:</span>{" "}
            <a href={item.show.url} target="_blank">
              {item.show.name + " "}
            </a>
            ({item.show.premiered.split("-")[0]}-
            {item.show.ended ? item.show.ended.split("-")[0] : ""})
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Summary:</span>{" "}
            {item.show.summary ? item.show.summary.replace(/<\/?p>/g, "") : ""}
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Status:</span>{" "}
            {item.show.status + " "}
            {item.show.ended ? "(" + item.show.ended + ")" : ""}
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Premiered on:</span>{" "}
            {item.show.premiered}
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Average run time:</span>{" "}
            {item.show.averageRuntime}
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Language:</span>{" "}
            {item.show.language}
            {item.show.network
              ? " (" + item.show.network.country.name + ")"
              : ""}
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Ratings:</span>{" "}
            {item.show.rating.average ? item.show.rating.average : "-"}
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Type:</span> {item.show.type}
          </li>
          <li className="list-group-item">
            <span className="text-primary fw-bold">Genre(s):</span>
            {item.show.genres.map((genre, index) => (
              <li className="list-group">{genre}</li>
            ))}
          </li>
          <li className="list-group-item d-flex justify-content-between">
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
          </li>
        </ul>
      </div>
    </div>
  ));
};
