import { Search } from './Icons.jsx'
import'./searcher.css'

function Searcher({query, setQuery, search}) {
    return (
        <>
            <form className='container' onSubmit={search}>
                <input type="text" placeholder="Search your favorite Pokémon!" className='input' value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button className='btn-search'>
                    <Search />
                </button>
            </form>
        </>
    )
}

export default Searcher