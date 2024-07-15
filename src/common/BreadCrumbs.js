
import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { readDeck} from "../utils/api";

/* Make sure the right path is converted
    "/" - homeIcon Home
    "/decks/:deckId/study" - homeIcon Home/deckTitle/Study
    "/decks/new" - homeIcon Home/Create Deck
    "/decks/:deckId" - homeIcon Home/deckTitle
    "/decks/:deckId/edit" - homeIcon Home/deckTitle/ Edit Deck
    "/decks/:deckId/cards/new" - homeIcon Home/deckTitle/Add Card
    "/decks/:deckId/cards/:cardId/edit" - homeIcon Home/deckTitle/Edit Card CardId
*/

function BreadCrumbs () {
  const location = useLocation();
  // Cannot get deckId and cardId from useParams. 
  const deckId = location.pathname.match(/\/decks\/(\d+)/)?.[1] ?? 0;
  const cardId = location.pathname.match(/\/decks\/\d+\/cards\/(\d+)/)?.[1] ?? 0;
  const [deckData, setDeckData ] = useState([]);
  
  // Get deckData if deckId is present
  useEffect(() =>{
    const abortController = new AbortController();
    if (!deckId) { return};
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
    loadDeckData();
    
    return () => {
      abortController.abort();
    }

  },[deckId]);

  const renderBreadCrumbs = () => {
    const pathNameArray = (location.pathname).split('/').filter((x) => x);
    const pathList = [];

    // Add inital Home link on the list
    pathList.push(
      <li key="home" className="breadcrumb-item">
        <Link to="/">
          <i className="bi bi-house-door-fill"></i> Home
        </Link>
      </li>
    );
    if (pathNameArray.includes('decks')) {
      if (pathNameArray.includes('new') && !pathNameArray.includes('cards')) {
        pathList.push(<li key="create-deck" className="breadcrumb-item active">Create Deck</li>);
      } else if (pathNameArray.includes('edit') && !cardId > 0 ) {
        pathList.push(
          <li key="deck" className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckData.name} </Link>
          </li>
        );
        pathList.push(<li key="edit-deck" className="breadcrumb-item active">Edit Deck</li>);
      } else if (pathNameArray.includes('study')) {
        pathList.push(
          <li key="deck" className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckData.name} </Link>
          </li>
        );
        pathList.push(<li key="study" className="breadcrumb-item active">Study</li>);
      } else if (pathNameArray.includes('cards')) {
        pathList.push(
          <li key="deck" className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckData.name} </Link>
          </li>
        );
        if (pathNameArray.includes('new')) {
          pathList.push(<li key="add-card" className="breadcrumb-item active">Add Card</li>);
        } else if (pathNameArray.includes('cards') && pathNameArray.includes('cards') && pathNameArray.includes(cardId)) {
          pathList.push(<li key="edit-card" className="breadcrumb-item active">Edit Card {cardId}</li>);
        }
      } else {
        pathList.push(<li key="deck" className="breadcrumb-item active">{deckData.name}</li>);
      }
    }
      return pathList;
};

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {renderBreadCrumbs()}
      </ol>
    </nav>
  );
}

export default BreadCrumbs;
