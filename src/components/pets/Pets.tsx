import React, { useEffect, useState } from "react";
import { Cards } from "../Cards/Cards";
import { Filter } from "../Filter/Filter";
import "./pets.css";
import axios from "axios";

export const Pets = () => {
  const [cats, setCats] = useState([]);
  const fetchCats = async () => {
    const data = await axios.get("http://localhost:4000/cats");
    setCats(data.data);
  };
  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="container">
      <div className="appContainer">
        <Filter />
        <Cards cats={cats} />
      </div>
    </div>
  );
};
