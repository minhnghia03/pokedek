import { IPokemon } from '../../types/pokemon';
import { statAcronym } from '../../api/pokemon';

type Props = {
  pokemon: IPokemon;
};

const PokemonStat = ({ pokemon }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-semibold" style={{ color: pokemon.color }}>
        Base Stats
      </h1>
      <table className="w-full">
        <tbody>
          {pokemon.stats.map(({ baseStat, stat }) => (
            <tr key={stat.id} className="w-full">
              <td
                className="text-right pr-4 uppercase font-medium"
                style={{ color: pokemon.color }}
              >
                {statAcronym[stat.name]}
              </td>
              <td className="pr-4">{baseStat}</td>
              <td className="w-full">
                <div className="rounded-full h-3 w-full relative">
                  <div
                    className="rounded-full h-full w-full absolute left-0 top-0"
                    style={{
                      backgroundColor: pokemon.color,
                      opacity: '25%'
                    }}
                  ></div>
                  <div
                    className="rounded-full h-full absolute left-0 top-0"
                    style={{
                      backgroundColor: pokemon.color,
                      width: `${(baseStat / 255) * 100}%`
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td
              className="text-right pr-4 uppercase font-medium"
              style={{ color: pokemon.color }}
            >
              Tot
            </td>
            <td>
              {pokemon.stats.reduce((acc, { baseStat }) => acc + baseStat, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonStat;
