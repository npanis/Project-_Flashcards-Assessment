// Create a DeckView
import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck } from "../utils/api";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import BreadCrumbs from "../common/BreadCrumbs"

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
    const breadcrumbPathArray = [
      { link: "/", text: "Home"},
      {
        link:`/decks/${deckId}`,
        text: deckData? deckData.name : "DeckData is empty"
      }
    ];
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
    return deckData ? (
      <div>
          <div className="card" style={{ width: '40rem' }}>
          <div className="card-body">
            <h5 className="card-title">{deckData.name}</h5>
            <p className="card-text">{deckData.description}</p>
            <div className="d-flex mb-3" >
              <div className="p-2">
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
                    <i className="bi bi-pencil-fill"></i> Edit
                </Link>
              </div>
              <div className="p-2">
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary"><i className="bi bi-journal-bookmark"></i> Study</Link>
              </div>
              <div className="p-2">
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary"><i className="bi bi-plus"></i> Add Cards</Link>
              </div>
              <div className="ms-auto p-2">
                <button type="button" className="btn btn-danger" onClick={() => handleConfirmAction(deckData.id)}><i className="bi bi-trash3"></i></button>
              </div>
            </div>
          </div>
        </div>
        <h3>Cards</h3>
        <div>
          <ul className="list-group" style={{ listStyleType: 'none', padding: 0 }}>
            {cardList.map((card) => (
              <li key={card.id}>
              <Card card={card} />
              </li>
            ))}
          </ul> 
        </div>
    </div>   
    ) : ( <h1>Loading...</h1>);
};
export default DeckView;