import React, { MouseEvent, useState } from "react";
import "./Card.css";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";

type ImageTypes = {
  url: string;
  alt: string;
};
export type CatProps = {
  name: string;
  phone: string;
  email: string;
  favoured: boolean;
  image: ImageTypes;
  gender: string;
};

export type CardProps = CatProps & {
  updateFavourite: (index: number, favoured: boolean) => void;
  index: number;
};
export const Card = ({
  name,
  phone,
  email,
  image,
  favoured,
  updateFavourite,
  index,
}: CardProps) => {
  const [isFavoured, setIsFavoured] = useState(favoured);

  const toggleFavoured = (e: MouseEvent<HTMLButtonElement>) => {
    updateFavourite(index, !isFavoured);
    setIsFavoured((prevState) => !prevState);
  };
  return (
    <div className="card" role="article">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={toggleFavoured}>
          {isFavoured ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heartOutlined} alt="outlined heart" />
          )}
        </button>
        <div className="card-content">
          <h3>{name}</h3>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};
