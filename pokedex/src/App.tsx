import React, { useEffect, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";

export type Pokemon = {
  id: number;
  sprites: { other: { dream_world: { front_default: string } } };
  name: string;
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
};

const App = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data: { next: string; results: Pokemon[] } = await res.json();

    setLoadMore(data.next);

    setAllPokemons(old => [...old, ...data.results])
  };
  const changeTheme = () => {
    let element = document.body;
    element.classList.toggle("dark-mode");
  };
  useEffect(() => {
    getAllPokemons();
  }, []);
  return (
    <div className="container">
      <button className="themeButton" onClick={() => changeTheme()}>
        Dark Mode
      </button>
      <img
        className="logo"
        src="https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png"
      />
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => {
            
            return <PokemonCard pokemonName={pokemonStats.name} />
          })}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default App;
