import React, { Fragment, useEffect, useState } from "react";
import PokemonThumb from "./components/PokemonThumb";

type Pokemon = {
  id: number;
  sprites: { other: { dream_world: { front_default: string } } }
  name: string;
  types: Array<{ type: { name: string } } >
  weight: number;
  height: number;
}

const App = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<null | number>(null);
  const toggleDetailsId = (id: number) => {
    setSelectedPokemonId((oldId) => (oldId === id ? null : id));
  };
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data: { next: string; results: Pokemon[]} = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results: Pokemon[]) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
    // console.log(data);
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
            const isExpanded = selectedPokemonId === pokemonStats.id;
            return (
              <Fragment key={index}>
                <PokemonThumb
                  id={pokemonStats.id}
                  image={pokemonStats.sprites.other.dream_world.front_default}
                  name={pokemonStats.name}
                  type={pokemonStats.types[0].type.name}
                  isExpanded={isExpanded}
                  toggleDetailsId={toggleDetailsId}
                />

                {isExpanded && (
                  <div
                    className="details"
                    onClick={(event) => {
                      if (event.target === event.currentTarget) {
                        setSelectedPokemonId(null);
                      }
                    }}
                  >
                    <dialog open className="dialog">
                      <img
                        className="img"
                        src={
                          pokemonStats.sprites.other.dream_world.front_default
                        }
                      ></img>
                      <br></br>
                      Weight: {pokemonStats.weight}
                      <hr></hr>
                      Height: {pokemonStats.height}
                      <br></br>
                    </dialog>
                  </div>
                )}
              </Fragment>
            );
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
