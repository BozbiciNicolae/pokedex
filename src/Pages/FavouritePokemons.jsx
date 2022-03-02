import React from 'react';
import useLocalStorage from '../helpers/useLocalStorage';
import PokeCard from './../Components/Cards/PokeCard';
import { Container, Flex, Divider, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

function FavouritePokemons() {
  const [favourites] = useLocalStorage('favourites');

  return (
    <div className="card-list">
      {favourites.length ? favourites.map((pokemon) => {
        return (
          <PokeCard hideStar key={pokemon.id} pokemon={pokemon} />
        )
      }) : (
        <Container maxW='container.xl'>
          <Flex flexDirection="column" alignItems="center">
            <Divider mb="20"/>
            <Text color="white" fontSize="5xl">You do not have any favorite pokemons?</Text>
            <Text color="white" fontSize="xl">go 
              <Link to="/"> back </Link>
              and add some!</Text>
            <Divider mt="20" />
          </Flex>
        </Container>
      )}
    </div>
  );
}

export default FavouritePokemons;
