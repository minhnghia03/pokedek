import React from "react";
import { IPokemon } from "../../types/pokemon";
import {
  typeColors,
  allTypes,
  calculateEffectiveness,
} from "../../api/pokemon";
import Link from "next/link";

type Props = {
  pokemon: IPokemon;
};

const TypeChart = ({ pokemon }: Props) => {
  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 flex flex-col gap-2">
      <h1 className="font-semibold" style={{ color: pokemon.color }}>
        Type Defenses
      </h1>
      <p>
        The effectiveness of each type on{" "}
        <span className="capitalize">{pokemon.name}</span>{" "}
      </p>
      <div className="flex gap-2 flex-wrap">
        {allTypes.map((type) => (
          <Link href={`/type/${type}`} key={type} passHref>
            <a className="flex flex-col items-center">
              <div
                className="w-8 p-1"
                style={{
                  backgroundColor: typeColors[type],
                }}
              >
                <img
                  src={`/type-icons/${type}.svg`}
                  alt={type}
                  className="w-full"
                />
              </div>

              <h1 className="text-sm font-medium">
                {calculateEffectiveness(
                  type,
                  pokemon.types.map((type) => type.type.name)
                )}
              </h1>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TypeChart;
