import { typeColors } from "../../api/pokemon";
import { IPokemon } from "../../types/pokemon";
type Props = {
  pokemon: IPokemon;
};

const PokemonImage = ({ pokemon }: Props) => {
  return (
    <div
      className="w-full flex flex-col items-center relative overflow-auto px-12 rounded-md bg-white shadow-md pb-4 border-2 -z-20"
      style={{ borderColor: pokemon.color }}
    >
      <div
        className="absolute w-full h-4/6  p-4 flex justify-end -z-10"
        style={{ backgroundColor: pokemon.color }}
      >
        <img src="/pokeball.svg" alt="pokeball" />
      </div>
      <img src={pokemon.sprite} alt={pokemon.name} className="w-full mt-16" />
      <div className="flex gap-4">
        {pokemon.types.map((type) => (
          <div
            key={type.slot}
            style={{ backgroundColor: typeColors[type.type.name] }}
            className="text-white rounded-full px-4 py-1 font-medium"
          >
            {type.type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonImage;
