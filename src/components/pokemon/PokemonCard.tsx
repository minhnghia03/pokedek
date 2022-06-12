import React from "react";
import { IPokemon } from "../../types/pokemon";
import { typeColors } from "../../api/pokemon";
import Link from "next/link";

type Props = {
  pokemon: IPokemon;
};

const PokemonCard = ({ pokemon }: Props) => {

  return (
    <Link href={`/pokemon/${pokemon.id}`} passHref>
      <a
        className="rounded-md bg-white shadow-md overflow-hidden border-2 hover:scale-105 cursor-pointer"
        style={{
          borderColor: pokemon.color,
        }}
      >
        <h1
          className="w-full text-right pr-2 pt-1"
          style={{ color: pokemon.color }}
        >
          #{pokemon.id.toString().padStart(3, "0")}
        </h1>
        <img src={pokemon.sprite} alt={pokemon.name} />
        <div
          style={{ backgroundColor: pokemon.color }}
          className="flex flex-col items-center py-2"
        >
          <h1 className="capitalize text-white text-2xl">{pokemon.name}</h1>
        </div>
      </a>
    </Link>
  );
};

export default PokemonCard;
