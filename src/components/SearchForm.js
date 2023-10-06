import React, { useRef, useState } from "react";
import { CustomCard } from "./CustomCard";
import { fetchShows } from "../utils/axiosHelper";

export const SearchForm = ({ addToDisplayList }) => {
  const strRef = useRef("");
  const [shows, setShows] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  // handle on submit
  const handleOnSubmit = async (e) => {
    // to prevent the loading of the page on form submit
    e.preventDefault();

    // start with empty list
    setShows([]);
    setErrMessage("");

    // current text
    const str = strRef.current.value;

    // fetch shows api
    const data = await fetchShows(str);

    // if returned data is not empty
    if (data.length !== 0) {
      setShows(data);
    } else {
      // set error message if the search returns empty list
      setErrMessage(
        "Sorry, but it seems like we couldn't find any results matching your search query. Please double-check your spelling or try using different keywords to refine your search. If you still can't find what you're looking for, feel free to contact our support team for assistance. We're here to help!"
      );
    }

    strRef.current.value = "";
  };

  // handle on click: getting from custom card
  const handleOnClick = ({ showId, attr }) => {
    const filteredShows = shows.filter((item) => item.show.id !== showId);
    if (attr === "favorite") {
      // add to new list to show in the display
      const favFilteredShows = shows.filter((item) => item.show.id === showId);

      // add new data to display
      addToDisplayList({ ...favFilteredShows[0], attr });
    }

    setShows(filteredShows);
  };

  return (
    <div>
      <div className="bg-black p-5 rounded shadow-lg">
        <div className="row g-2">
          <div className="col-md">
            <form onSubmit={handleOnSubmit}>
              <div className="mb-2">
                <input
                  ref={strRef}
                  type="text"
                  className="form-control"
                  id="inputtext"
                  placeholder="Search Shows..."
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-warning">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-black p-5 mt-5 rounded shadow-lg">
        <h4 className="mb-4">Shows List</h4>
        <div className="row">
          {errMessage && <div>{errMessage}</div>}
          {!errMessage && (
            <div>
              {shows.length} <span>show(s) found!</span>
            </div>
          )}
          <hr />
        </div>
        <div className="row">
          <CustomCard shows={shows} handleOnClick={handleOnClick} />
        </div>
      </div>
    </div>
  );
};
