// Components
import Header from '@components/Header/Header/Header';

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


const Home = () => {
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/countries/")
        .then(response => setCountries(response.data))
        .catch(error => console.error("Error fetching countries:", error));
    }, []);

    const handleCountryClick = (countryName) => {
        navigate("/universities", { state: { selectedCountry: countryName } });
    };
    
    return (
        <div className="p-4">
            <Header />
            <h1>Home Page</h1>
            
            <h1 className="text-2xl font-bold mb-4">Select a Country</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {countries.map(country => (
                <button 
                    key={country.id}
                    onClick={() => handleCountryClick(country.name)}
                    className="block p-4 border rounded bg-blue-500 text-white text-center w-full"
                >
                    {country.name}
                </button>
                ))}
            </div>
        </div>
    );
};
  
export default Home;