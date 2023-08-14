export interface PokemonData {
    id: number;
    name: string;
    types: PokemonType[];
    stats: PokemonStats[];
    abilities: PokemonAbility[];
    weight: number;
    height: number;
    species: species;
  }

export const statsShortName = {
  'hp': 'HP',
  'attack' : 'ATK',
  'defense' : 'DEF',
  'special-attack' : 'SpA',
  'special-defense' : 'SpD',
  'speed': 'SPD'
}