import { fetchPokemons } from "../src/api/pokemon";
import { IPokemon } from "../src/types/pokemon";
import { useEffect, useRef, useState } from "react";
import PokemonList from "../src/components/pokemon/PokemonList";
import { AiOutlineSearch } from "react-icons/ai";
import { Select } from "../src/components/select/Select";
import {
  AiOutlineSortDescending,
  AiOutlineSortAscending,
} from "react-icons/ai";

const Home = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    page: 0,
    term: "",
    sort: "id",
    order: "asc",
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

  const toggleOrder = () => {
    setFilter({
      ...filter,
      order: filter.order === "asc" ? "desc" : "asc",
    });
  };

  const renderPokemon = () => {
    if (!loading && !pokemons.length) {
      return <div>No Pokemon &#128557;</div>;
    }

    return <PokemonList pokemons={pokemons} />;
  };

  return (
    <div className="flex flex-col items-center py-4 border-none gap-8">
      <div className="flex flex-col sm:flex-row sm:items-end gap-6">
        <div className="relative">
          <input
            type="text"
            className="peer outline outline-1 outline-slate-500 focus:outline-blue-500 shadow-sm rounded-md px-4 py-2"
            placeholder="Search..."
            onChange={(event) => search(event.target.value)}
          />
          <div className="text-2xl peer-focus:text-blue-500 text-gray-500 absolute right-0 top-0 h-full flex items-center pr-2">
            <AiOutlineSearch />
          </div>
        </div>

        <div>
          <label className="text-sm">Sort By</label>
          <div className="flex items-center gap-1">
            <Select
              defaultValue="id"
              options={[
                { value: "id", label: "Id" },
                { value: "name", label: "Name" },
              ]}
              onValueChange={(value) => sort(value)}
            />

            <button className="text-2xl" onClick={toggleOrder}>
              {filter.order === "asc" ? (
                <AiOutlineSortAscending />
              ) : (
                <AiOutlineSortDescending />
              )}
            </button>
          </div>
        </div>
      </div>

      {renderPokemon()}

      <button
        onClick={loadMore}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
      >
        {loading ? "Loading..." : "More"}
      </button>
    </div>
  );
};

export default Home;
