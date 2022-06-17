import type { IPokemon } from '../types/pokemon';
import { typeColors } from './pokemon_type';
import { fetchPokemonGraphQL } from './pokemon_graphql';

const parsePokemonData = (data: any): IPokemon => {
  return {
    id: data.id,
    name: data.pokemon_v2_pokemonspecy.name.replace('-', ' '),
    height: data.height / 10,
    weight: data.weight / 10,
    types: data.pokemon_v2_pokemontypes.map((type: any) => ({
      slot: type.slot,
      type: type.pokemon_v2_type
    })),
    stats: data.pokemon_v2_pokemonstats.map((stat: any) => ({
      baseStat: stat.base_stat,
      stat: {
        name: stat.pokemon_v2_stat.name.replace('-', ' '),
        id: stat.pokemon_v2_stat.id
      }
    })),
    sprite: `/pokemons/${data.id}.png`,
    description:
      data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0]
        .flavor_text,
    abilities: data.pokemon_v2_pokemonabilities.map((ability: any) => ({
      slot: ability.slot,
      isHidden: ability.is_hidden,
      ability: {
        id: ability.pokemon_v2_ability.id,
        name: ability.pokemon_v2_ability.name.replace('-', ' ')
      }
    })),
    color: typeColors[data.pokemon_v2_pokemontypes[0].pokemon_v2_type.name]
  };
};

const POKEMONS_PER_PAGE = 12;



export const fetchSinglePokemon = async (
  id: number
): Promise<IPokemon | null> => {
  const query = `
    query MyQuery {
      pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
        id
        height
        weight
        pokemon_v2_pokemontypes {
          slot
          pokemon_v2_type {
            name
            id
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
            id
          }
        }
        pokemon_v2_pokemonspecy {
          name
          pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1, order_by: {version_id: desc}) {
            flavor_text
          }
        }
        pokemon_v2_pokemonabilities {
          slot
          is_hidden
          pokemon_v2_ability {
            name
            id
          }
        }
      }
    }
  `;

  const { pokemon_v2_pokemon } = await fetchPokemonGraphQL(
    query,
    null,
    'MyQuery'
  );

  if (pokemon_v2_pokemon.length) {
    return parsePokemonData(pokemon_v2_pokemon[0]);
  }

  return null;
};

export const fetchPokemons = async ({
  page,
  term,
  sort,
  order
}: {
  page: number;
  term: string;
  sort: string;
  order: string;
}): Promise<IPokemon[]> => {
  const query = `
    query MyQuery {
      pokemon_v2_pokemon(limit: ${POKEMONS_PER_PAGE}, offset: ${
    page * POKEMONS_PER_PAGE
  }, where: {name: {_regex: "^${term.toLowerCase()}"}, id: {_lt: 1000}}, order_by: {${sort}: ${order}}) {
        id
        height
        weight
        pokemon_v2_pokemontypes {
          slot
          pokemon_v2_type {
            name
            id
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
            id
          }
        }
        pokemon_v2_pokemonspecy {
          name
          pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1, order_by: {version_id: desc}) {
            flavor_text
          }
        }
        pokemon_v2_pokemonabilities {
          slot
          is_hidden
          pokemon_v2_ability {
            name
            id
          }
        }
      }
    }
  `;
  const { pokemon_v2_pokemon } = await fetchPokemonGraphQL(
    query,
    null,
    'MyQuery'
  );

  return pokemon_v2_pokemon.map((pokemon: any) => parsePokemonData(pokemon));
};



export const statAcronym: { [key: string]: string } = {
  attack: 'atk',
  hp: 'hp',
  defense: 'def',
  speed: 'spd',
  'special attack': 'satk',
  'special defense': 'sdef'
};
