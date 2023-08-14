import './pokemonDetail.css'
import { statsShortName } from '../types.d.ts'

function PokemonDetail({ showDetail, pokemon, close }) {
    return (
        <>
            <div className='modal-container' onClick={close} style={{ display: showDetail ? 'grid' : 'none' }}>
                <section className='modal-body'>
                    <div className='detail-container' style={{ display: 'flex' }}>
                        <div>
                            <img src={pokemon.image} className='pokemon-image' />
                        </div>

                        <div className='pokemon-info' style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
                            <div>
                                <div className='header-detail'>
                                    <h2>{pokemon.name}</h2>
                                    <span>#{pokemon.id?.toString().padStart(4, '0')}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {pokemon.types?.map(type => {
                                        return (
                                            <>
                                                <div className={`type ${type}-type`}>
                                                    {type}
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
                                <p>{pokemon.pokedexEntry}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '15px' }}>
                                    <div className='flex-direction-column' style={{ width: '100%' }}>
                                        <h3>Height</h3>
                                        <span className='pill'>{pokemon.height} m</span>
                                    </div>

                                    <div className='flex-direction-column' style={{ width: '100%' }}>
                                        <h3>Weight</h3>
                                        <span className='pill'>{pokemon.weight} Kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='stats' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {pokemon.stats?.map(stat => {
                            return (
                                <>
                                    <span className='flex-direction-column stat-pill'>
                                        <span className={`stat-round stat-${stat.name}`}>
                                            {statsShortName[stat.name]}
                                        </span>
                                        {stat.base}
                                    </span>
                                </>
                            )
                        })}
                    </div>
                </section >
            </div >

        </>
    )
}

export default PokemonDetail