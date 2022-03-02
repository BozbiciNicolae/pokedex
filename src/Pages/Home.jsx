import React, { useEffect } from 'react';
import { useStore } from '../store'
import PokeCard from '../Components/Cards/PokeCard';
import Filters from '../Components/Filters/Filters';

import './home.scss';

const Home = () =>  {
  const { pokemonList, addPokemons, setPokemonTypes, loading } = useStore();

  useEffect(() => {
    loadPokemons()
  }, [])

  const loadPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${10}`)
      .then(async (res) => await res.json())
      .then(async (r) => {
        const all = r.results.map(async (item) => {
          const r = await fetch(item.url)
          const pokemon = await r.json()
          return pokemon
        })

        Promise.all(all).then(r => {
          const types = [];
          r.forEach((pokemon) => {
            return pokemon.types.forEach(t => {
              if(!types.includes(t.type.name)) {
                types.push(t.type.name)
              }
            })
          })
          
          // set minimum loading time
          setTimeout(() => {
            addPokemons(r)
          }, 800)
          setPokemonTypes(types)
        })
      })
      .catch((e) => console.log('error fetching pokemons: ', e))
  }
  
  return (
    <>
      <Filters />
      <div className="card-list">
        {!loading 
        ? pokemonList.map((pokemon) => {
          return (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          )
        }) 
        : (
          <div className="loader-wrap">
            <div className="pokemon-ball">
              <span></span>
            </div>
          </div>
          )
        }
      </div>
    </>
  );
}

export default Home;
