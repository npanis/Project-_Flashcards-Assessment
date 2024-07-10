import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import Home  from "../home/Home";
import CreateDeck from "../home/CreateDeck";
import DeckView from "../deck/DeckView";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/decks/:deckId/study" element={<p>Add new study page here</p>}/>
        <Route path="/decks/new" element={<CreateDeck />}/>
        <Route path="/decks/:deckId" element={<DeckView />}/>
        <Route path="/decks/:deckId/edit" element={<p>Edit deck</p>}/>
        <Route path="/decks/:deckId/cards/new" element={<p>Add new card</p>}/>
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<p>Edit Card</p>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  );
}

export default Layout;
