import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import ImageList from "./components/ImageList";
import ImageView from "./components/ImageView";

function App() {
  const [searchWord, setSearchWord] = useState("clouds");
  const [onChangeText, setOnChangeText] = useState("");

  const updateOnChangeText = (e) => {
    setOnChangeText(e.target.value);
  };

  let navigate = useNavigate();

  const submitSearchWord = (e) => {
    e.preventDefault();
    setSearchWord(onChangeText);
    navigate("/", { replace: true });
  };

  return (
    <div className="App">
      <NavBar
        onChange={updateOnChangeText}
        onSubmit={submitSearchWord}
        onChangeText={onChangeText}
      />
      <Routes>
        <Route path="/" element={<ImageList searchWord={searchWord} />} />
        <Route path="/photos/:id" element={<ImageView />} />
      </Routes>
    </div>
  );
}

export default App;
