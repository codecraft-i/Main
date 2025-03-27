import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "@components/Header/Header/Header";

const University = () => {
  const { university_name } = useParams();
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/universities/")
      .then(response => {
        const foundUniversity = response.data.data.find(uni => uni.name === university_name);
        setUniversity(foundUniversity);
      })
      .catch(error => console.error("Error fetching university details:", error));
  }, [university_name]);

  if (!university) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{university.name}</h1>
        <img src={university.image} alt={university.name} className="w-full h-60 object-cover rounded" />
        
        {/* YouTube video */}
        {university.yt_video_link && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Campus Tour</h2>
            <iframe
              width="100%"
              height="315"
              src={university.yt_video_link.replace("youtu.be/", "www.youtube.com/embed/")}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <p className="text-lg mt-4"><strong>Country:</strong> {university.country.name}</p>
        <p className="text-lg"><strong>Ranking:</strong> {university.ranking}</p>
        <p className="mt-2">{university.description}</p>

        {/* Short Info */}
        {university.short_info.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Short Info</h2>
            <ul className="list-disc ml-6">
              {university.short_info.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Why Choose This University? */}
        {university.why_choose.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Why Choose {university.name}?</h2>
            <ol className="list-decimal ml-6">
              {university.why_choose.map((reason, index) => (
                <li key={index} className="mb-2">
                  <strong>{reason.title}:</strong> br {reason.text}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Extra Paragraphs */}
        {university.extra_paragraphs && university.extra_paragraphs.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Additional Information</h2>
            {university.extra_paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-2">{paragraph.text}</p>
            ))}
          </div>
        )}

        <div className="mt-4">
          <a href={university.details_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            More Details
          </a>
        </div>
      </div>
    </>
  );
};

export default University;