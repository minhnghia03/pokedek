import axios from "axios";
import type { IPokemon } from "../types/pokemon";

const parsePokemonData = (data: any): IPokemon => {
  return {
    id: data.id,
    name: data.pokemon_v2_pokemonspecy.name.replace("-", " "),
    height: data.height / 10,
    weight: data.weight / 10,
    types: data.pokemon_v2_pokemontypes.map((type: any) => ({
      slot: type.slot,
      type: type.pokemon_v2_type,
    })),
    stats: data.pokemon_v2_pokemonstats.map((stat: any) => ({
      baseStat: stat.base_stat,
      stat: {
        name: stat.pokemon_v2_stat.name.replace("-", " "),
        id: stat.pokemon_v2_stat.id,
      },
    })),
    sprite: `/pokemons/${data.id}.png`,
    description:
      data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0]
        .flavor_text,
    abilities: data.pokemon_v2_pokemonabilities.map((ability: any) => ({
      slot: ability.slot,
      isHidden: ability.is_hidden,
      ability: ability.pokemon_v2_ability,
    })),
    color: typeColors[data.pokemon_v2_pokemontypes[0].pokemon_v2_type.name],
  };
};

const POKEMONS_PER_PAGE = 12;

const fetchPokemonGraphQL = async (
  query: string,
  variables: any,
  operationName: string
) => {
  const {
    data: { data },
  } = await axios.post("https://beta.pokeapi.co/graphql/v1beta", {
    query,
    variables,
    operationName,
  });

  return data;
};

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
    "MyQuery"
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
}: {
  page: number;
  term: string;
  sort: string;
}): Promise<IPokemon[]> => {
  const query = `
    query MyQuery {
      pokemon_v2_pokemon(limit: ${POKEMONS_PER_PAGE}, offset: ${
    page * POKEMONS_PER_PAGE
  }, where: {name: {_regex: "^${term.toLowerCase()}"}, id: {_lt: 1000}}, order_by: {${sort}: asc}) {
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
    "MyQuery"
  );

  return pokemon_v2_pokemon.map((pokemon: any) => parsePokemonData(pokemon));
};

export const typeColors: {
  [key: string]: string;
} = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const statAcronym: { [key: string]: string } = {
  attack: "atk",
  hp: "hp",
  defense: "def",
  speed: "spd",
  "special attack": "satk",
  "special defense": "sdef",
};
