import React from "react";
import "./reset.css";
import "./App.css";

import Header from "./Components/Header/Header";
import Home from "./Containers/Home/Home";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
