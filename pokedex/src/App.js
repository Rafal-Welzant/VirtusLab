import React, { useEffect, useState } from "react";
import PokemonThumb from "./components/PokemonThumb";

const App = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const toggleDetailsId = (id) => {
    setSelectedPokemonId((oldId) => (oldId === id ? null : id));
  };
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
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
    console.log(data);
  };
  const changeTheme = () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
  };
  useEffect(() => {
    getAllPokemons();
  }, []);
  return (
    <div className="container">
      <button onClick={() => changeTheme()}>Dark Mode</button>
      <img
        className="logo"
        src="https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png"
      />
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats) => {
            const isExpanded = selectedPokemonId === pokemonStats.id;
            return (
              <>
                <PokemonThumb
                  key={pokemonStats.id}
                  id={pokemonStats.id}
                  image={pokemonStats.sprites.other.dream_world.front_default}
                  name={pokemonStats.name}
                  type={pokemonStats.types[0].type.name}
                  weight={pokemonStats.weight}
                  height={pokemonStats.height}
                  isExpended={isExpanded}
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
              </>
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
