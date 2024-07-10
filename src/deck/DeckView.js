// Create a DeckView
import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck } from "../utils/api";
import { useParams } from "react-router-dom";
import Card from "../card/Card"

function DeckView() {
  //API get response with deckId
  const [deckData, setDeckData] = useState([]);
  const [cardList, setCardList] = useState([]);
  const { deckId } = useParams();
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeckData(){
      try {
          const deckDataFromAPI = await readDeck(deckId, abortController.signal);
          setDeckData(deckDataFromAPI);
      } catch(error){
          if(error.name === "AbortError"){
              console.log("Aborted failed to load deckData", deckData);
          }else { throw(error) }
      }
    }
    async function loadCardList(){
      try {
        const response = await fetch(
          `http://localhost:8080/cards?deckId=${deckId}`
        );
          const cardList = await response.json();
          setCardList(cardList);
      } catch(error){
          if(error.name === "AbortError"){
              console.log("Aborted failed to load Cardlist", cardList);
          }else { throw(error) }
      }
    }
    loadDeckData();
    loadCardList();
    return () => {
        abortController.abort();
    }
  }, [deckId]);
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
    return(
      <>
          <div className="card" style={{ width: '40rem' }}>
          <div className="card-body">
            <h5 className="card-title">{deckData.name}</h5>
            <p className="card-text">{deckData.description}</p>
            <div className="d-flex mb-3" >
              <div className="p-2">
                <button type="button" className="btn btn-secondary" onClick={() =>    <alert>view</alert>}><i className="bi bi-pencil-fill"></i> Edit</button>
              </div>
              <div className="p-2">
                <button type="button" className="btn btn-primary" onClick={() => <alert>study</alert>}><i className="bi bi-journal-bookmark"></i> Study</button>
              </div>
              <div className="p-2">
                <button type="button" className="btn btn-primary" onClick={() => <alert>study</alert>}><i className="bi bi-plus"></i> Add Cards</button>
              </div>
              <div className="ms-auto p-2">
                <button type="button" className="btn btn-danger" onClick={() => handleConfirmAction(deckData.id)}><i className="bi bi-trash3"></i></button>
              </div>
            </div>
          </div>
        </div>
        <h3>Cards</h3>
        <ul className="card-list" style={{ listStyleType: 'none', padding: 0 }}>
      {cardList.map((card) => (
        <li key={card.id}>
          <Card card={card} />
        </li>
      ))}
    </ul>
      </>

        
    );
};
export default DeckView;