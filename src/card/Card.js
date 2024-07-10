import React, { useState, useEffect } from "react";
import { deleteCard } from "../utils/api";

function Card({card}){
    const handleConfirmAction = async (cardId) => {
        const confirmed = window.confirm(
          'Delete this Card?\n\n You will not be able to recover it.'
          );
        if (confirmed){
          //CallDeleteCard
          console.log(`Deleting card with ID: ${cardId}`);
          const abortController = new AbortController();
          try{
              const response = await deleteCard(cardId, abortController.signal);
              window.location.reload();
          } catch (error) {
              console.error(`Deleting deck was unsuccessful: ${cardId}` );
          }
          
        }
      }
    return(
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-5">
                <div className="card-body">
                    <p className="card-text">{card.front}</p>
                </div>
                </div>
                <div className="col-md-5">
                <div className="card-body">
                    <p className="card-text">{card.back}</p>
                    <div className="d-flex mb-3" >
                        <div className="p-2">
                            <button type="button" className="btn btn-secondary" onClick={() =>    <alert>view</alert>}><i className="bi bi-pencil-fill"></i> Edit</button>
                        </div>
                        <div className="ms-auto p-2">
                            <button type="button" className="btn btn-danger" onClick={() => handleConfirmAction(card.id)}><i className="bi bi-trash3"></i></button>
                        </div>
                   </div>

                    </div>
                </div>
            </div>
            </div>
    );
}

export default Card;