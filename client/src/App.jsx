import 'react';

// Routers liblaries
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Style files
// Base App CSS
import './App.css'

// Pages
import Home from './Pages/Home/Home';
import Universities from './Pages/Internal/Uni/Universities';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universities" element={<Universities />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
