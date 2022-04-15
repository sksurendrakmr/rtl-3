import React from "react";
import { Card, CatProps } from "../Card/Card";
import "./Cards.css";

export type CardsProps = {
  cats: CatProps[];
  setCats: (cats: CatProps[]) => void;
};
export const Cards = ({ cats, setCats }: CardsProps) => {
  const updateFavourite = (index: number, isFavoured: boolean) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = isFavoured;
    setCats(updatedCats);
  };
  return (
    <div className="pet-cards-container">
      {cats.map(({ name, email, image, phone, favoured, gender }, index) => (
        <Card
          key={name + phone}
          email={email}
          phone={phone}
          image={image}
          favoured={favoured}
          name={name}
          gender={gender}
          updateFavourite={updateFavourite}
          index={index}
        />
      ))}
    </div>
  );
};
