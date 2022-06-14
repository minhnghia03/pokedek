import { fetchPokemons } from "../src/api/pokemon";
import { IPokemon } from "../src/types/pokemon";
import { useEffect, useRef, useState } from "react";
import PokemonList from "../src/components/pokemon/PokemonList";
import { AiOutlineSearch } from "react-icons/ai";
import useClickOutside from "../src/utils/useClickOutside";
import { Select } from "../src/components/select/Select";

const Home = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    page: 0,
    term: "",
    sort: "id",
  });

  const dropdownRef = useRef<HTMLSelectElement>(null);

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

  useClickOutside(dropdownRef, () => {
    console.log("Clicked!");
  });

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
    <div className="flex flex-col items-center py-4 border-none gap-8">
      <div className="flex items-center flex-col sm:flex-row sm:items-end gap-4">
        <div className="relative">
          <input
            type="text"
            className="outline outline-1 outline-slate-500 focus:outline-blue-500 shadow-sm rounded-md px-4 py-2"
            placeholder="Search..."
            onChange={(event) => search(event.target.value)}
          />
          <div className="text-2xl text-blue-500 absolute right-0 top-0 h-full flex items-center pr-2">
            <AiOutlineSearch />
          </div>
        </div>

        <div>
          <label className="text-sm">Sort By</label>
          <Select
            defaultValue="id"
            options={[
              { value: "id", label: "Id" },
              { value: "name", label: "Name" },
            ]}
            onValueChange={(value) => sort(value)}
          />
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
