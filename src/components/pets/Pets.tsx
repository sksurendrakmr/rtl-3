import React, { useEffect, useState } from "react";
import { Cards } from "../Cards/Cards";
import { Filter } from "../Filter/Filter";
import "./pets.css";
import axios from "axios";
import { CatProps } from "../Card/Card";

export type FilterState = {
  gender: string;
  favoured: boolean | string;
};
export const Pets = () => {
  const [cats, setCats] = useState<CatProps[]>([]);
  const [filteredCats, setFilteredCats] = useState<CatProps[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    gender: "any",
    favoured: "any",
  });
  const fetchCats = async () => {
    const data = await axios.get("http://localhost:4000/cats");
    setCats(data.data);
    setFilteredCats(data.data);
  };
  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];
    if (filters.gender !== "any") {
      catsFiltered = catsFiltered.filter(
        (cat) => cat.gender === filters.gender
      );
    }
    if (filters.favoured !== "any") {
      catsFiltered = catsFiltered.filter(
        (cat) =>
          cat.favoured === (filters.favoured === "favoured" ? true : false)
      );
    }
    setFilteredCats(catsFiltered);
  }, [filters, cats]);

  return (
    <div className="container">
      <div className="appContainer">
        <Filter filters={filters} setFilters={setFilters} />
        <Cards cats={filteredCats} setCats={setCats} />
      </div>
    </div>
  );
};
