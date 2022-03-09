import React, { useEffect, useState, useCallback, useRef } from "react";
import { PokemonCard } from "./components/PokemonCard";

export type Pokemon = {
  id: number;
  sprites: { other: { dream_world: { front_default: string } } };
  name: string;
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
};

const firstPageUrl = "https://pokeapi.co/api/v2/pokemon?limit=20"

const App = () => {
  const [allPokemons, setAllPokemons] = useState<null | Pokemon[]>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<null | Error>(null)

  const isFetching = useRef(false);

  const getAllPokemons = useCallback(async (pageUrl = firstPageUrl) => {
    if (isFetching.current === true) {
      return;
    }
    isFetching.current = true;
    try {
      setError(null);
      const res = await fetch(pageUrl);
      const data: { next: string; results: Pokemon[] } = await res.json();
      setNextPageUrl(data.next);
      setAllPokemons(old => [...(old || []), ...data.results])
    } catch (error) {
      setError(error)
    } finally {
      isFetching.current = false;
    }  
  }, []);
  
  const changeTheme = () => {
    let element = document.body;
    element.classList.toggle("dark-mode");
  };

  useEffect(() => {
    getAllPokemons();
  }, [getAllPokemons]);

  return (
    <div className="container">
      <button className="themeButton" onClick={() => changeTheme()}>
        Dark Mode
      </button>
      <img
        className="logo"
        src="https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png"
        alt=""
      />
      <div className="pokemon-container">
        <div className="all-container">
          {error && <p>Loading error :(</p>}
          {!error && allPokemons === null ? <p>Loading...</p> : allPokemons?.map((pokemonStats, index) => {
            
            return <PokemonCard key={index} pokemonName={pokemonStats.name} />
          })}
        </div>
        <button className="load-more" onClick={() => getAllPokemons(nextPageUrl)}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default App;
