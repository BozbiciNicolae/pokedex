import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import './pokemon-details.scss'

function PokemonDetails() {
  const [pokemon, setPokemon] =  useState(null)
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(async (res) => await res.json())
      .then(async (r) => {
        setPokemon(r)
      })
      .catch((e) => console.log('error fetching pokemon: ', e))
  }, [])

  return (
    <>
      <Button colorScheme='blue' mb="5" variant='outline' leftIcon={<ArrowLeftIcon />}  onClick={() => navigate('/')}>
        All pokemons
      </Button>
      <div className="pokemon-wrapper">
        <div className="top">
          <div className="pokemon-image">
            <img src={pokemon?.sprites.other.dream_world.front_default} />
          </div>
        </div>

        <div className="poke-card">
          <div className="name">
            <h1>{pokemon?.name}</h1>
            <div className="hp">
              HP {pokemon?.stats[0].base_stat}
            </div>
          </div>

          <ul className="stats">
            <li>
              {pokemon?.types.map((slot, index) => {
                return (
                  index == 0 ? slot.type.name : ' | ' + slot.type.name
                )
              })}
              <br /><span>Type</span>
            </li>
            <li>{pokemon?.weight / 10}kg<br /><span>Weight</span></li>
            <li>{pokemon?.height/10}m<br /><span>Height</span></li>
          </ul>

          <div className="info">
            <div className="experience">
              <div className="dust">
                <i></i> {pokemon?.base_experience}<br />
                <span>Experience</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
