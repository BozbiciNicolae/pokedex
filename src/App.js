import React, { useEffect } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Button, Container } from '@chakra-ui/react';
import { useStore } from './store'
import useLocalStorage from './helpers/useLocalStorage'

import Home from './Pages/Home';
import PokemonDetails from './Pages/PokemonDetails';
import FavouritePokemons from './Pages/FavouritePokemons';
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.scss';

const App = () =>  {
  const { setFavouriteList } = useStore();
  const [favourites] = useLocalStorage('favourites', []);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadFavourites()
  }, [])

  // sets the favourites from LS to store
  const loadFavourites = () => {
    if(favourites) {
      setFavouriteList(favourites)
    }
  }

  const togglePage = () => {
    if(window.location.pathname.includes('favourites')) {
      navigate("/")
    } else {
      navigate("/favourites")
    }
  }

  return (
    <div className="App">
      <Container maxW='container.xl'>
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" className="App-logo" alt="logo" />
          <Button colorScheme='blue' variant='outline' leftIcon={<StarIcon />}  onClick={togglePage}>
            {window.location.pathname.includes('favourites') ? 'All pokemons' : 'My Favourites'}
          </Button>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<FavouritePokemons />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </main>
      </Container>
    </div>
  );
}

export default App;
