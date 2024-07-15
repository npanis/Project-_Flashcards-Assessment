import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import Home  from "../home/Home";
import CreateDeck from "../home/CreateDeck";
import DeckView from "../deck/DeckView";
import Edit from "../common/Edit";
import CreateCard from "../card/CreateCard";
import Study from "../deck/Study";
import { useLocation  } from "react-router-dom";
import BreadCrumbs from "../common/BreadCrumbs";

function Layout() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Header />
      <div className="container">
        {pathname !== '/' && <BreadCrumbs />}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/decks/:deckId/study" element={<Study />}/>
        <Route path="/decks/new" element={<CreateDeck />}/>
        <Route path="/decks/:deckId" element={<DeckView />}/>
        <Route path="/decks/:deckId/edit" element={<Edit />} />
        <Route path="/decks/:deckId/cards/new" element={<CreateCard />}/>
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  );
}

export default Layout;
