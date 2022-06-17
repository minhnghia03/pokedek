import axios from "axios";

export const fetchPokemonGraphQL = async (
  query: string,
  variables: any,
  operationName: string
) => {
  const {
    data: { data }
  } = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
    query,
    variables,
    operationName
  });

  return data;
};