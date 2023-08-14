import { useEffect, useState } from "react";
const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

function usePokemonList() {
  const [listOfPokemon, setListOfPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [showNextPage, setShowNextPage] = useState(true);

  //Recoge los datos de la API de un Pokémon y lo devuelve como objeto
  const getPokemon = async (url) => {
    const pokemonComplete = await fetch(url).then(response => { return response.json() }).catch(err => {
      console.log('Something went wrong searching for Pokémon. \n'
        + 'URL -> ' + url + '\n'
        + 'ERROR -> ' + err)
    })
    if (typeof pokemonComplete === 'undefined') return {}

    const abilities = pokemonComplete.abilities.map(a => a.ability.name)
    const stats = pokemonComplete.stats.map(s => { return { name: s.stat.name, base: s.base_stat } })
    const types = pokemonComplete.types.map(t => t.type.name)

    const pokemonSpecies = await fetch(pokemonComplete.species.url).then(response => { return response.json() }).catch(err => {
      console.log('Something went wrong searching for Pokémon Specie. \n'
        + 'URL -> ' + pokemonComplete.species.url + '\n'
        + 'ERROR -> ' + err)
    })
    let pokedexEntry = ''
    try {
      pokedexEntry = pokemonSpecies.flavor_text_entries.filter(
        (element) => element.language.name === 'en'
      )[0].flavor_text.toString().replace('\f', '\n').replace('\u00ad\n', '').replace('\u00ad', '').replace(' -\n', ' - ').replace('-\n', '-').replace('\n', ' ')

    } catch (err) {
      console.log('Something went wrong replacing strange characters into pokedex entry')
    }

    return {
      id: pokemonComplete.id,
      name: pokemonComplete.name,
      image: pokemonComplete.sprites.other["official-artwork"].front_default,
      imageShiny: pokemonComplete.sprites.other["official-artwork"].front_shiny,
      height: pokemonComplete.height / 10,
      weight: pokemonComplete.weight / 10,
      abilities,
      stats,
      types,
      pokedexEntry: pokedexEntry
    }
  }

  //Devuelve una lista de objetos con los Pokémon y la siguiente url a buscar para el scroll infinito
  const getListOfPokemon = async (url = DEFAULT_URL) => {
    const response = await fetch(url)
    const listOfPokemonIncomplete = await response.json()
    const { next, results } = listOfPokemonIncomplete

    const listOfPokemonComplete = await Promise.all(
      results.map(async (pokemon) => getPokemon(pokemon.url))
    )

    return { next, listOfPokemonComplete }
  }

  //Llama a la función anterior y establece los valores
  const getPokemonList = async () => {
    const { next, listOfPokemonComplete } = await getListOfPokemon()
    setListOfPokemon(listOfPokemonComplete)
    setNextUrl(next)
  }

  //Añade los nuevos Pokémon buscado a la lista 
  const getMorePokemonFromPokemonList = async () => {
    const { next, listOfPokemonComplete } = await getListOfPokemon(nextUrl)
    setListOfPokemon(prev => [...prev, ...listOfPokemonComplete])
    next === null && setShowNextPage(false)
    setNextUrl(next)
  }

  //Llama a la busqueda de pokémon por nombre o id
  const searchPokemon = async (query) => {
    const url = `${URL_ENDPOINT}${query.toLocaleLowerCase()}`
    return await getPokemon(url)
  }

  useEffect(() => {
    getPokemonList()
  }, [])

  return { listOfPokemon, getMorePokemonFromPokemonList, showNextPage, searchPokemon }
}

export default usePokemonList