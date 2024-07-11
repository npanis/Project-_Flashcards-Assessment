import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

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
        <form onSubmit={handleSubmit} >
                {deckTitle && (
                <h2>{deckTitle.name}: Add Card</h2>
                )}
              <div className="form-floating mb-3">
                 <label htmlFor="front" className="form-label">Front</label>
                 <textarea 
                    className="form-control"
                    type="textarea" 
                    id="front"
                    name="front" 
                    placeholder="Front side of the card"
                    value={cardData.front}
                    onChange={handleChange}
                 />
                <label htmlFor="back" className="form-label">Back</label>
                 <textarea 
                    className="form-control"
                    type="textarea" 
                    id="back"
                    name="back" 
                    placeholder="Back side of the card"
                    value={cardData.back}
                    onChange={handleChange}
                 />
            </div>
            <div className="d-flex mb-3">
               <div className="me-auto p-2">
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Done</Link>
                </div> 
                <div className="p-2">
                    <button type="submit" className="btn btn-primary">Save</button> 
                </div>
            </div>
    
        </form>
    );   

}
export default CreateCard;
