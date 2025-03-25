// Components
import Header from "@components/Header/Header/Header";

// React State
import React, { useState, useEffect } from "react";

// API axios
import axios from "axios";

// Style files
import './universities.css';

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState(["Canada"]);
  const regions = ["Canada", "Europe", "UK", "Switzerland"];

  useEffect(() => {
    axios.get("http://localhost:8000/api/universities/")
      .then(response => {
        console.log(response.data);
        setUniversities(response.data.data);
      })
      .catch(error => console.error("Error fetching universities:", error));
  }, []);

  const handleCheckboxChange = (region) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };

  const filteredUniversities = universities
    .filter(uni => selectedRegions.includes(uni.country))
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <>
      <Header />
      <div className="p-6">
        {/* Regions Filter */}
        <div className="mb-6 flex gap-4 flex-wrap">
          {regions.map(region => (
            <label key={region} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectedRegions.includes(region)}
                onChange={() => handleCheckboxChange(region)}
              />
              <span className="text-gray-700">{region}</span>
            </label>
          ))}
        </div>

        {/* Universities List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUniversities.map(uni => (
            <div key={uni.id} className="border p-4 rounded-lg shadow-md bg-white">
              {/* Image URL Check */}
              {uni.image ? (
                <div className="img">
                  <img
                    src={uni.image.startsWith("http") ? uni.image : `http://localhost:8000${uni.image}`} 
                    alt={uni.name} 
                    className="w-full h-40 object-cover rounded-md"
                    onError={(e) => e.target.src = "https://via.placeholder.com/150"} // Agar xato bo‘lsa, default rasm
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-semibold mt-3">{uni.name}</h3>
              <p className="text-gray-600">Ranking: {uni.ranking}</p>
              <a href={`/universities/university/${uni.name}`} 
                className="text-blue-600 hover:underline mt-2 inline-block">
                More Info →
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Universities;