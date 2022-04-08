import React from "react";
import { Card, CatProps } from "../Card/Card";
import "./Cards.css";

type CardsProps = {
  cats: CatProps[];
};
export const Cards = ({ cats }: CardsProps) => {
  return (
    <div className="pet-cards-container">
      {cats.map(({ name, email, image, phone, favoured, gender }) => (
        <Card
          key={name + phone}
          email={email}
          phone={phone}
          image={image}
          favoured={favoured}
          name={name}
          gender={gender}
        />
      ))}
    </div>
  );
};
