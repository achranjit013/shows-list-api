import React, { useEffect, useState } from "react";
import { CustomCard } from "./CustomCard";

export const DisplayShows = ({ showList, displaybBtns, updateShowList }) => {
  const [filteredShowList, setFilteredShowList] = useState([]);

  // It will run after the initial render and after every re-render unless you specify dependencies.
  // It allows you to specify dependencies for the effect. If any of the dependencies change between renders, the effect function will run again. If you omit the dependency array, the effect runs after every render.
  useEffect(() => {
    setFilteredShowList(showList);
  }, [showList]);

  // handle on click
  const handleOnClick = (str) => {
    const filterArr = [];

    if (str === "all") {
      filterArr.push(...showList);
    } else {
      showList.map((item, i) => {
        item.show.genres.map((itm, index) => {
          if (itm === str) {
            filterArr.push(item);
          }
        });
      });
    }

    // set the display list according to button clicked
    setFilteredShowList(filterArr);

    return;
  };

  // handle on delete in display
  const handleOnDelete = ({ showId }) => {
    // gives the filtered list after deleting
    const filteredList = showList.filter((item) => item.show.id !== showId);
    // set filtered list in display
    setFilteredShowList(filteredList);

    // need to update the main show list aswell
    // passing function as props to App.js with filtered show list as args
    updateShowList(filteredList);
  };

  return (
    <div className="bg-black p-5 mt-5 rounded shadow-lg">
      <h4 className="mb-4">Favorite Shows</h4>
      <div className="row">
        <div className="col">
          <div className="btn-group" role="group" aria-label="Basic example">
            <div className="row g-2">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleOnClick("all")}
                >
                  All Favorites
                </button>
              </div>

              {displaybBtns.map((item, i) => (
                <div className="col" key={i}>
                  <button
                    key={i}
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleOnClick(item)}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3">{filteredShowList.length} show (s) found</div>
          <hr />
        </div>
      </div>

      {filteredShowList.map((item, i) => (
        <div className="row" key={i}>
          <CustomCard shows={[item]} handleOnClick={handleOnDelete} />
        </div>
      ))}
    </div>
  );
};
