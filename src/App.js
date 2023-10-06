import { useEffect, useRef, useState } from "react";
import "./App.css";
import { SearchForm } from "./components/SearchForm";
import { DisplayShows } from "./components/DisplayShows";

function App() {
  const [showList, setShowList] = useState([]);
  const [displaybBtns, setDisplayBtns] = useState([]);

  // adding new data
  const addToDisplayList = (card) => {
    console.log("card: " + card.show.id);
    // btns in display list to show according to their genres
    if (displaybBtns.length === 0) {
      // if there is nothing in the array list
      // set the btns
      setDisplayBtns([...card.show.genres]);
    } else {
      // if there is some value in the array list
      const btnArr = [];
      card.show.genres.map((item, index) => {
        if (displaybBtns.filter((itm) => itm === item).length === 0) {
          btnArr.push(item);
        }
      });

      // set the btns
      setDisplayBtns([...displaybBtns, ...btnArr]);
    }

    // set the show list with new data
    // do not add if the card is already present in the display list
    const uniqueCardList = showList.filter(
      (item) => item.show.id !== card.show.id
    );

    setShowList([...uniqueCardList, card]);

    return;
  };

  // update the show list after deleting from display
  const updateShowList = (filteredList) => {
    //set the show list with filtered list after delete
    setShowList(filteredList);
  };

  return (
    <div className="wrapper bg-dark text-warning min-vh-100">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="mt-5 text-center">Search Shows Below</h1>
          </div>
        </div>

        <hr />

        {/* Search form */}
        <SearchForm addToDisplayList={addToDisplayList} />

        {/* Display shows */}
        <DisplayShows
          showList={showList}
          displaybBtns={displaybBtns}
          updateShowList={updateShowList}
        />
      </div>
    </div>
  );
}

export default App;
