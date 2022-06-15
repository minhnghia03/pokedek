import Image from "next/image";
import { typeColors } from "../../api/pokemon";
import { IPokemon } from "../../types/pokemon";
type Props = {
  pokemon: IPokemon;
};

const PokemonImage = ({ pokemon }: Props) => {
  return (
    <div
      className="w-full flex flex-col items-center relative overflow-auto rounded-md bg-white shadow-md pb-4 border-2 -z-20"
      style={{ borderColor: pokemon.color }}
    >
      <div
        className="absolute w-full h-4/6 p-2 flex justify-end -z-10"
        style={{ backgroundColor: pokemon.color }}
      >
        <svg
          className="h-full"
          viewBox="0 0 206 208"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1">
            <path
              d="M127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M103 208C155.393 208 198.738 169.257 205.947 118.857H145.035C138.917 136.169 122.407 148.571 103 148.571C83.5933 148.571 67.0835 136.169 60.9648 118.857H0.0532056C7.26233 169.257 50.6067 208 103 208ZM60.9648 89.1429H0.0532056C7.26233 38.7431 50.6067 0 103 0C155.393 0 198.738 38.7431 205.947 89.1429H145.035C138.917 71.8314 122.407 59.4286 103 59.4286C83.5933 59.4286 67.0835 71.8314 60.9648 89.1429ZM127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z"
              fill="white"
            />
          </g>
        </svg>
      </div>
      <div className="w-[90%] aspect-square mt-16  relative">
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
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
