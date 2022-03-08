import React from "react";

type Props = {
    id: number;
    image: string;
    name: string;
    type: string;
    isExpanded: boolean;
    toggleDetailsId: (id: number) => void;
}

const PokemonThumb = ({
  id,
  image,
  name,
  type,
  isExpanded,
  toggleDetailsId,
}: Props) => {
  const style = type + " thumb-container";
  return (
    <div className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <small>Type: {type}</small>
        <button onClick={() => toggleDetailsId(id)}>
          {!isExpanded ? "Show stats" : "Hide stats"}
        </button>
      </div>
    </div>
  );
};

export default PokemonThumb;
