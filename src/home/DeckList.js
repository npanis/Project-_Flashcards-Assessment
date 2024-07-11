import React, {useState, useEffect} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteDeck, readDeck } from "../utils/api";
import { Link } from "react-router-dom";

function DeckList({ deckList }) {

  useEffect(() => {
    const abortController = new AbortController()
    async function countCards(deckId) {
      const cardListFromAPI = await readDeck(deckId, abortController.signal);
      if (cardListFromAPI){
        const deckSize = cardListFromAPI.length;
      }
  
    }

    deckList.forEach((deck) => {
      countCards(deck.id);
    });
  }, [deckList]);
  const handleConfirmAction = async (deckId) => {
    const confirmed = window.confirm(
      'Delete this deck?\n\n You will not be able to recover it.'
      );
    if (confirmed){
      //CallDeleteDeck
      console.log(`Deleting deck with ID: ${deckId}`);
      const abortController = new AbortController();
      try{
          const response = await deleteDeck(deckId, abortController.signal);
          window.location.reload();
      } catch (error) {
          console.error(`Deleting deck was unsuccessful: ${deckId}` );
      }
      
    }
  }
  // Make sure to add a fallback when no deck is available
  if (deckList.length === 0){
    return(
      <div className="card">
        <div className="card-body">
            No deck as of now. Create one today to start your flashcard experience!
        </div>
      </div>
    );
  }
  return (
    <>
     <ul className="deck-list" style={{ listStyleType: 'none', padding: 0 }}>
      {deckList.map((deck) => (
        <li key={deck.id}>
        <div className="card" style={{ width: '40rem' }}>
          <div className="card-body">
            <h3 className="card-title">{deck.name}</h3>
            <div>{deck.cards.length} cards</div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex mb-3" >
              <div className="p-2">
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                  <i className="bi bi-eye"></i>View
              </Link>
              </div>
              <div className="p-2">
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                <i className="bi bi-journal-bookmark"></i> Study
              </Link>
              </div>
              <div className="ms-auto p-2">
                <button type="button" className="btn btn-danger" onClick={() => handleConfirmAction(deck.id)}><i className="bi bi-trash3"></i></button>
              </div>
            </div>
          </div>
        </div>
        </li>
      ))}
    </ul>
    </>
  );
    }
    
export default DeckList;
    