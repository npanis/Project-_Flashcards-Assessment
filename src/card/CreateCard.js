import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm  from "../common/CardForm";

function CreateCard() {
    // Get necessary data for Card
    const [cardData, setCardData] = useState({front: "", back:""});
    const [deckTitle, setDeckTitle] = useState();
    const navigate = useNavigate();
    // /decks/:deckId/cards/:cardId/edit
    const { deckId } = useParams();
    //load Dat
    const handleChange = ({ target }) => {
        setCardData({
            ...cardData,
            [target.name]: target.value
        })
    };
    const handleSubmit = async (event) => {
        //call api 
        event.preventDefault(); // Prevent default form submission
        const abortController = new AbortController();
        try{
            const response = await createCard(deckId, cardData, abortController.signal);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeckData() {
            try {
                const deckDataFromAPI = await readDeck(deckId, abortController.signal);
                setDeckTitle(deckDataFromAPI);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted: failed to load deckData");
                } else {
                    console.error("Error loading deckData:", error);
                }
            }
        }

        loadDeckData();
        return () => {
            abortController.abort(); // Cleanup function
        };
    }, [deckId]); 

    return (
        <div>
         {deckTitle && (
            <div>
                <h2>{deckTitle.name}</h2>
                <p>Add Card</p>
            </div>
                )}
            <CardForm 
              deckId = {deckId}
              cardData={cardData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cancelButtonText="Done"
              submitButtonText="Save"
            /> 
        </div>  
    );   

}
export default CreateCard;
