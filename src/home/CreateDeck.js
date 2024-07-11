import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck () {
    const initialFormState = {
        name:"",
        description:""
    }
    // Add the required submit and change handlers
    const [formData, setFormData] = useState({...initialFormState});
    const navigate = useNavigate();
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    };
    // When the form is submitted, a new deck will be added, and the form contents cleared.
    const handleSubmit = async (event) => {
        //call api 
        event.preventDefault(); // Prevent default form submission
        const abortController = new AbortController();
        try{
            const response = await createDeck(formData, abortController.signal);
            console.log(response);
            setFormData({...initialFormState});
            navigate(`/decks/${response.id}`);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };

    return (
        <form onSubmit={handleSubmit} >
            <h2>Create Deck</h2>
              <div className="form-floating mb-3">
                 <label htmlFor="name" className="form-label">Deck Name</label>
                 <input 
                    className="form-control"
                    id = "name"
                    type="text" 
                    name="name"
                    placeholder="Deck Name"
                    value={formData.name}
                    onChange={handleChange}
                 />
                <label htmlFor="description" className="form-label">Description</label>
                 <textarea 
                    className="form-control"
                    type="textarea" 
                    id="description"
                    name="description" 
                    placeholder="Brief description of the deck"
                    value={formData.description}
                    onChange={handleChange}
                 />
            </div>
            <div className="d-flex mb-3">
               <div className="me-auto p-2">
                <Link to={'/'} className="btn btn-secondary">Cancel</Link>
                </div> 
                <div className="p-2">
                    <button type="submit" className="btn btn-primary">Submit</button> 
                </div>
            </div>

        </form>
    );
}

export default CreateDeck