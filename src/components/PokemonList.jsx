import { PokemonCard } from "./PokemonCard";
import usePokemonList from '../hooks/usePokemonList'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import PokemonDetail from "./PokemonDetail";
import { useState } from "react";
import Searcher from './Searcher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListOfPokemon({ listOfPokemon, onPokemonClick }) {
    return (
        <ul className='pokemonList'>
            {
                listOfPokemon.map(pokemon => {
                    return (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} onPokemonClick={onPokemonClick} />
                    )
                }
                )
            }
        </ul>
    )
}

function NoPokemonResults() {
    return (
        <p>No Pokémon Results</p>
    )
}

export function PokemonList() {
    // Llamada a la API para listar los resultados y solicitar más
    const { listOfPokemon, getMorePokemonFromPokemonList, showNextPage, searchPokemon } = usePokemonList()
    //Comprobación de que la lista contenga datos a mostrar
    const hasPokemon = listOfPokemon?.length > 0

    //Funcionalidad para mostrar u ocultar los detalles del Pokémon seleccionado
    const [showDetail, setShowDetail] = useState({ showDetail: false, pokemon: {} })
    const showPokemonDetail = (pokemon) => setShowDetail({ showDetail: true, pokemon })
    const hidePokemonDetail = () => {
        setShowDetail({ showDetail: false, pokemon: {} })
        setQuery('')
    }

    //Busqueda por texto
    const [query, setQuery] = useState('')
    const search = async (e) => {
        e.preventDefault()
        if (!query) return

        const pokemon = await searchPokemon(query)
        if (Object.keys(pokemon).length === 0) {
            toast.error('Not pokémon found for \'' + query + '\'', {
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        setShowDetail({ showDetail: true, pokemon })
    }
    return (
        <>
            <Searcher query={query} setQuery={setQuery} search={search} />
            <ToastContainer />
            {hasPokemon ?
                <div>
                    <PokemonDetail {...showDetail} close={hidePokemonDetail} />
                    <InfiniteScroll dataLength={listOfPokemon.length}
                        next={getMorePokemonFromPokemonList}
                        hasMore={showNextPage}
                        loader={<Loading />}
                        endMessage={<h1 style={{ color: 'azure' }}>No more Pokémon to show</h1>}
                        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <ListOfPokemon listOfPokemon={listOfPokemon} onPokemonClick={showPokemonDetail} />
                    </InfiniteScroll>

                </div>
                : <NoPokemonResults />}
        </>
    )
}