import { fetchPokemons } from "../src/api/pokemon";
import { IPokemon } from "../src/types/pokemon";
import { useEffect, useRef, useState } from "react";
import PokemonList from "../src/components/pokemon/PokemonList";

const Home = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    page: 0,
    term: "",
    sort: "id",
  });

  useEffect(() => {
    setLoading(true);
    fetchPokemons(filter)
      .then((newPokemons) => {
        setPokemons((pokemons) =>
          filter.page === 0 ? newPokemons : [...pokemons, ...newPokemons]
        );
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [filter]);

  const loadMore = () => setFilter({ ...filter, page: filter.page + 1 });

  const search = (term: string) => {
    setFilter({
      ...filter,
      page: 0,
      term: term,
    });
  };

  const sort = (sort: string) => {
    setFilter({
      ...filter,
      sort,
      page: 0,
    });
  };

  const renderPokemon = () => {
    if (!loading && !pokemons.length) {
      return <div>No Pokemon &#128557;</div>;
    }

    return <PokemonList pokemons={pokemons} />;
  };

  return (
    <div className="flex flex-col items-center py-4 border-none">
      <input
        type="text"
        className="outline outline-1 outline-blue-500 shadow-md"
        placeholder="Search..."
        onChange={(event) => search(event.target.value)}
      />
      <select
        className="appearance-none px-2 py-1 text-center outline outline-1 outline-blue-500 border-none"
        onChange={(event) => sort(event.target.value)}
        defaultValue="id"
      >
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>
      {renderPokemon()}

      <button
        onClick={loadMore}
        className="bg-blue-500 text-white rounded-md px-4 py-2"
      >
        {loading ? "Loading..." : "More"}
      </button>
    </div>
  );
};

export default Home;
