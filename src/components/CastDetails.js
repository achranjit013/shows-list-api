import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const CastDetails = ({ handleClose, modal, cast }) => {
  return (
    // modal
    <Modal show={modal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{cast.length !== 0 && cast.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* displaying cast details */}
        <div className="row">
          {cast.length !== 0 &&
            cast._embedded.cast &&
            cast._embedded.cast.map((item, i) => (
              <div class="card mb-3" key={i}>
                <div class="row g-0">
                  <div class="col-md-4">
                    {item.character.image ? (
                      <img
                        src={
                          item.character.image.original
                            ? item.character.image.original
                            : item.character.image.medium
                        }
                        class="img-fluid rounded-start"
                      ></img>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        {item.person.name ? item.person.name : "-"}
                        {item.character.gender
                          ? ", " + item.character.gender
                          : ""}
                      </h5>
                      {item.person.country
                        ? "--from " + item.person.country.name
                        : ""}
                      <p class="card-text">Playing as {item.character.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* displaying list of seasons & episodes */}
        {cast.length !== 0 &&
          cast._embedded.seasons &&
          cast._embedded.seasons.map((item, i) => (
            <table className="table caption-top table-borderless" key={i}>
              <caption>Season {item.number}</caption>
              {cast.length !== 0 &&
                cast._embedded.episodes &&
                cast._embedded.episodes.map(
                  (eps, epsN) =>
                    item.number === eps.season && (
                      <tbody key={epsN}>
                        <tr>
                          <th scope="col">Ep. {epsN + 1}</th>
                          <td>{eps.name}</td>
                        </tr>
                      </tbody>
                    )
                )}
            </table>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
