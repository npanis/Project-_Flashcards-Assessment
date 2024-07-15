//Study the flashcards list
import { useNavigate, useParams } from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {readDeck} from "../utils/api";
import { Link } from "react-router-dom";

function Study(){
    const navigate = useNavigate();
    const [deck, setDeck] = useState({});
    const [deckSize, setDeckSize] = useState();
    const [isFlip, setIsFlip] = useState(false);
    const [cardIndex, setCardIndex] = useState(0);
    const { deckId } = useParams();
    
 //Get deckData and Card Info
    useEffect(()=> {
        const abortController = new AbortController();
        async function loadDeckData () {
            try{
                const deckDataFromAPI = await readDeck(deckId, abortController.signal);
                if (deckDataFromAPI.cards) {
                    setDeck(deckDataFromAPI);
                    setDeckSize(deckDataFromAPI.cards.length);
                  }
            }catch(error){
                if(error.name === "AbortError"){
                    console.log("Aborted failed to load the Deck Data");
                }else { throw(error) }
            }
        }
        loadDeckData()
        return () => abortController.abort();   
    },[deckId]);

    const handleNextButtonClick = () => {
        if (cardIndex + 1 < deckSize ){
            setCardIndex(cardIndex + 1);
            setIsFlip(false);
        }else{
            if(window.confirm("Restart cards? \n\nClick cancel to return to the home page")){
                setCardIndex(0);
                setIsFlip(false);
            } else {
                navigate('/');
            }
        }
    };

    const currentCard = deck.cards ? deck.cards[cardIndex] : null;

    return (

    <div>
        <h1>{deck.name}: Study</h1>
        {deckSize <= 2 ? (
        <Fragment>
          <div className="card">
            <h2 className="card-header">Not enough cards.</h2>
            <div className="card-body">
              <h5 className="card-title">You need at least 3 cards to study. There are {deckSize} cards in this deck.</h5>
              <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary"><i className="bi bi-plus"></i> Add Cards</Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
        <div className="card">
          <h2 className="card-header">Card { cardIndex + 1} of {deckSize}</h2>
          <div className="card-body">
          {isFlip? ( 
          <h5 className="card-title">{currentCard ? currentCard.back : ""}</h5>
          )
            :( <h5 className="card-title">{currentCard ? currentCard.front : ""}</h5> )
          }
            <button
                className="btn btn-secondary"
                onClick={() => setIsFlip(!isFlip)}
            >
                Flip
            </button>
            {isFlip && (
                    <button
                        className="btn btn-primary"
                        onClick={handleNextButtonClick}
                    >
                        Next
                    </button>
            )}

          </div>
        </div>
      </Fragment>
      )}
    </div>
    );

}

export default Study;