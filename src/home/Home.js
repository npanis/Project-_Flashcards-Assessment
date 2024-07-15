import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";


function Home() {
    const [deckList, setDeckList] = useState([]);
    const [currentDeck, setCurrentDeck] = useState([]);
    useEffect(() =>{
        const abortController = new AbortController();
        async function loadDeckList(){
        try {
            const deckListFromAPI = await listDecks(abortController.signal);
            setDeckList(deckListFromAPI);
        } catch(error){
            if(error.name === "AbortError"){
                console.log("Aborted failed to load deckList", deckList);
            }else { throw(error) }
        }
    }
        loadDeckList();
        return () => {
            abortController.abort();
        }
    }, []);
return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col text-center">
         <Link to={'/decks/new'} className="btn btn-secondary btn-lg">
            <i className="bi bi-plus-circle-fill"></i> Create Deck
         </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DeckList deckList={deckList} setCurrentDeck={setCurrentDeck} />
        </div>
      </div>
    </div>
  );
}

export default Home;