import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import ProcessingPage from "@/pages/Processing";
import Processing from "@/pages/Processing";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/processing" element={<Processing/>} />
      </Routes>
    </Router>
  );
};



export default App;
