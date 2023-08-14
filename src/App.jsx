import './App.css'
import { PokemonList } from './components/PokemonList.jsx'

function App() {


  return (
    <div className='page'>
      <header style={{ display: 'contents' }}>
        <span style={{ backgroundColor: '#e03535', width: '-webkit-fill-available', position: 'absolute', top: '0', right: '0', height: '45px' }} />
        <img src='../src/assets/pokedex-header.png' style={{ width: '280px', position: 'absolute', top: '0', left: '0' }} />
      </header>

      <main>
        {
          <>
            <PokemonList />
          </>
        }
      </main>
    </div>)
}

export default App