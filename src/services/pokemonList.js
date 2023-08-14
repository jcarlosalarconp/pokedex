export const searchPokemonList = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20`)
    const json = await response.json()

    const pokemonList = json.results

    return pokemonList?.map((pokemon, index) => ({
      id: index,
      name: pokemon.name,
      image: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
    }))
  } catch (e) {
    throw new Error('Error searching pokemon')
  }
}