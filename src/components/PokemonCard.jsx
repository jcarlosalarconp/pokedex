export function PokemonCard({ pokemon, onPokemonClick }) {
    const handleClick = () => {
        onPokemonClick(pokemon)
    }
    return (
        <>
            <li className='pokemon' key={pokemon.id} onClick={handleClick}>
                <img src={pokemon.image} alt={pokemon.name} />
                <span>#{pokemon.id.toString().padStart(4, '0')}</span>
                <h3>{pokemon.name}</h3>
                <div style={{display: 'flex', gap: '10px'}}>
                    {pokemon.types.map(type => {
                        return (
                            <>
                                <div className={`type ${type}-type`}>
                                    {type}
                                </div>
                            </>
                        )
                    })}
                </div>
            </li >
        </>
    )
}
