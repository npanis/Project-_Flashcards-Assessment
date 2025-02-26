// Check location:
import React, { useEffect, useState, useLocation } from "react";
import { updateDeck, readDeck, updateCard, readCard} from "../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import CardForm  from "../common/CardForm";


// Reusing this common component to use for both deck or Card
//Get the deckId and cardId if cardId is null but deckId is present create a different page

function EditDeck({ deckId }){
    // Get data and fill in as current fills
    const [deckData, setDeckData] = useState({ name: "", description: "" });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

 //load Data
    const handleChange = ({ target }) => {
        setDeckData({
            ...deckData,
            [target.name]: target.value
        })
    };
    const handleSubmit = async (event) => {
        //call api 
        event.preventDefault(); // Prevent default form submission
        const abortController = new AbortController();
        try{
            const response = await updateDeck(deckData, abortController.signal);
            setDeckData(response);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeckData(){
            try {
                const deckDataFromAPI = await readDeck(deckId, abortController.signal);
                setDeckData(deckDataFromAPI);
                setIsLoading(false);
            }catch(error) {
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

 return (
    <form onSubmit={handleSubmit} >
          <h2>Edit Deck </h2>
          <div className="form-floating mb-3">
             <label htmlFor="name" className="form-label">Name</label>
             <input 
                className="form-control"
                id = "name"
                type="text" 
                name="name"
                value={deckData.name}
                onChange={handleChange}
             />
            <label htmlFor="description" className="form-label">Description</label>
             <textarea 
                className="form-control"
                type="textarea" 
                id="description"
                name="description" 
                value={deckData.description}
                onChange={handleChange}
             />
        </div>
        <div className="d-flex mb-3">
           <div className="me-auto p-2">
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
            </div> 
            <div className="p-2">
                <button type="submit" className="btn btn-primary">Submit</button> 
            </div>
        </div>

    </form>
);
}

function EditCard({deckId,cardId}) {
    // Get necessary data for Card
    const [cardData, setCardData] = useState({front: "", back:""});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    //load Data
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
            const response = await updateCard(cardData, abortController.signal);
            setCardData(cardData);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };
    useEffect(() => {
        const abortController = new AbortController();

        async function loadCardData() {
            try {
                const cardDataFromAPI = await readCard(cardId, abortController.signal);
                setCardData(cardDataFromAPI);
                setIsLoading(false);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted: failed to load cardData");
                } else {
                    console.error("Error loading cardData:", error);
                }
            }
        }

        loadCardData();
        return () => {
            abortController.abort(); // Cleanup function
        };
    }, [deckId, cardId]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
    <div>
      <h2>Edit Card </h2>  
      <CardForm 
        deckId = {deckId}
        cardData={cardData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelButtonText="Cancel"
        submitButtonText="Submit"
      />
    </div>

    );   

}

// Main function to call - Edit either a card or a deck
function Edit() {
    const { deckId, cardId } = useParams();
  
    return (
      <div>
        {cardId ? <EditCard cardId={cardId} deckId={deckId} /> : <EditDeck deckId={deckId} />}
      </div>
    );
  }

export default Edit;
  