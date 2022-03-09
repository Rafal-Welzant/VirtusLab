import React, { useState, useEffect } from "react";
import PokemonThumb from "./PokemonThumb";
import type { Pokemon } from "../App";

type Props = {
  pokemonName: string;
};

const loadPokemon = async (name: string): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return await res.json();
};

export const PokemonCard = ({ pokemonName }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    loadPokemon(pokemonName).then(setPokemon);
  }, [pokemonName]);

  if (pokemon === null) {
    return <div className="thumb-container">Loading....</div>;
  }

  return (
    <>
      <PokemonThumb
        id={pokemon.id}
        image={pokemon.sprites.other.dream_world.front_default}
        name={pokemon.name}
        type={pokemon.types[0].type.name}
        isExpanded={isExpanded}
        toggleDetailsId={() => setIsExpanded(true)}
      />

      {isExpanded && (
        <div
          className="details"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsExpanded(false);
            }
          }}
        >
          <dialog open className="dialog">
            <img
              className="img"
              src={pokemon.sprites.other.dream_world.front_default}
              alt="pokemon avatar"
            ></img>
            <br></br>
            Weight: {pokemon.weight}
            <hr></hr>
            Height: {pokemon.height}
            <br></br>
          </dialog>
        </div>
      )}
    </>
  );
};
