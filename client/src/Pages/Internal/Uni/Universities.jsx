import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "@components/Header/Header/Header";

import './universities.css'

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // `Home` sahifasidan kelayotgan davlat (agar mavjud bo‘lsa)
  const initialCountry = location.state?.selectedCountry || null;

  useEffect(() => {
    axios.get("http://localhost:8000/api/countries/")
      .then(response => {
        setCountries(response.data);

        if (initialCountry) {
          // Agar Home sahifasidan davlat tanlangan bo‘lsa
          setSelectedCountries([initialCountry]);
        } else if (response.data.length > 0) {
          // Agar `/universities` dagi URL bo‘sh bo‘lsa, birinchi davlatni tanlash
          setSelectedCountries([response.data[0].name]);
        }
      })
      .catch(error => console.error("Error fetching countries:", error));

    axios.get("http://localhost:8000/api/universities/")
      .then(response => setUniversities(response.data.data))
      .catch(error => console.error("Error fetching universities:", error));
  }, []);

  const handleCheckboxChange = (countryName) => {
    setSelectedCountries(prev =>
      prev.includes(countryName)
        ? prev.filter(c => c !== countryName)
        : [...prev, countryName]
    );
  };

  // const filteredUniversities = universities
  //   .filter(uni => selectedCountries.includes(uni.country.name))
  //   .sort((a, b) => b.ranking - a.ranking);

    const filteredUniversities = (universities || [])
    .filter(uni => selectedCountries.includes(uni.country.name))
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <>
      <Header />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Filter by Country</h2>
        <div className="mb-4">
          {countries.map(country => (
            <label key={country.id} className="mr-4">
              <input
                type="checkbox"
                checked={selectedCountries.includes(country.name)}
                onChange={() => handleCheckboxChange(country.name)}
              /> {country.name}
            </label>
          ))}
        </div>

        {filteredUniversities.length === 0 ? (
          <p>No universities found for selected country.</p>
        ) : (
          <div className="uniBox">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 uniBox">
            {filteredUniversities.map(uni => (
              <div key={uni.id} className="border p-4 rounded shadow">
                <img src={uni.image} alt={uni.name} style={{width: "150px", height: "auto", "backgroundSize": "cover"}} className="w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-bold mt-2">{uni.name}</h3>
                <p className="text-sm text-gray-600">Ranking: {uni.ranking}</p>
                <a href={`/universities/university/${encodeURIComponent(uni.name)}`} className="text-blue-500 hover:underline">
                  More Info
                </a>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Universities;