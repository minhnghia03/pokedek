import { IPokemon } from "../../types/pokemon";
import { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import styles from "./PokemonList.module.css";

type Props = {
  pokemons: IPokemon[];
};

const PokemonList = ({ pokemons }: Props) => {
  useEffect(() => console.log(pokemons), [pokemons]);
  return (
    <div className={`${styles.container} py-2`}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
