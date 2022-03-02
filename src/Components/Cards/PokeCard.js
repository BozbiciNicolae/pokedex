import React from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { useStore } from '../../store'
import useLocalStorage from '../../helpers/useLocalStorage'
import { useNavigate } from "react-router-dom";
import { Tooltip } from '@chakra-ui/react'

import './pokecard.scss';

function PokeCard({ pokemon, hideStar }) {
  const {favouritePokemons, updateFavourite} = useStore();
  const [favourites, setFavourites] = useLocalStorage('favourites'); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const toggleFavourite = (pokemon) => {
    updateFavourite(pokemon)
    const favouriteExists = favouritePokemons && favouritePokemons.find((item) => item.id === pokemon.id)
    if(favouriteExists) {
      setFavourites(favouritePokemons.filter((item) => item.id !== pokemon.id))
    } else {
      setFavourites([...favouritePokemons, pokemon])
    }
  }

  return (
    <div className="card-container">
      <div className="pokemon-container">
        <div className="top">
          <div className="pokemon-image">
            <img src={pokemon.sprites.other.dream_world.front_default} />
          </div>
          <div className="half-circle"></div>
        </div>

        <div className="poke-card">
          {
          !hideStar && (<Tooltip label='Toggle favourite'>
            <StarIcon className={favouritePokemons && !!favouritePokemons.find((item) => item.id === pokemon.id) && 'active'} onClick={() => toggleFavourite(pokemon)} />
          </Tooltip>)
          }
          <div className="name">
            <h1>{pokemon.name}</h1>
            <div className="hp">
              HP {pokemon.stats[0].base_stat}
            </div>
          </div>

          <ul className="stats">
            <li>
              {pokemon.types.map((slot, index) => {
                return (
                  index == 0 ? slot.type.name : ' | ' + slot.type.name
                )
              })}
              <br /><span>Type</span>
            </li>
            <li>{pokemon.weight / 10}kg<br /><span>Weight</span></li>
            <li>{pokemon.height/10}m<br /><span>Height</span></li>
          </ul>

          <div className="info">
            <div className="experience">
              <div className="dust">
                <i></i> {pokemon.base_experience}<br />
                <span>Experience</span>
              </div>
            </div>
          </div>
          
          <div className="more-info">
            <button className="button" onClick={() => navigate(`../pokemon/${pokemon.id}`)}>More info</button>          
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
