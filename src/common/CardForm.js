import React from "react";
import Card from "../card/Card";
import { Link } from "react-router-dom";

function CardForm({ deckId, cardData, handleChange, handleSubmit, cancelButtonText, submitButtonText}){
    return(
        <form onSubmit={handleSubmit} >
            <div className="form-floating mb-3">
            <label htmlFor="front" className="form-label">Front</label>
            <textarea 
                className="form-control"
                type="textarea" 
                id="front"
                name="front" 
                value={cardData.front}
                onChange={handleChange}
            />
            <label htmlFor="back" className="form-label">Back</label>
            <textarea 
                className="form-control"
                type="textarea" 
                id="back"
                name="back" 
                value={cardData.back}
                onChange={handleChange}
            />
        </div>
        <div className="d-flex mb-3">
            <div className="me-auto p-2">
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">{cancelButtonText}</Link>
            </div> 
            <div className="p-2">
                <button type="submit" className="btn btn-primary">{submitButtonText}</button> 
            </div>
        </div>
    </form>
    )
}

export default CardForm;