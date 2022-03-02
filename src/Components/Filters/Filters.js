import React, { useState } from 'react';
import { Box, Container, Flex, Input, Select } from '@chakra-ui/react';
import { useStore } from '../../store'

function Filters() {
  const { pokemonTypes, filterPokemons, searchPokemons, sortPokemons } = useStore();
  const [selectedFilter, setSelectedFilter] = useState('')
  const [selectedSort, setSelectedSort] = useState('')

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value)
    setSelectedSort('')
    filterPokemons(e.target.value)
  }

  const handleSearchTerm = (e) => {
    searchPokemons(e.target.value)
  }
  
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value)
    setSelectedFilter('')
    sortPokemons(e.target.value)
  }

  return (
    <Container maxW='2.xl' className="filters">
      <Flex>
        <Box padding='4' flex='1'>
          <Input onChange={(e) => handleSearchTerm(e)} variant='filled' bg='gray.200' placeholder='Search' _placeholder={{ color: 'gray.800' }} color="blue.500" />
        </Box>
        <Box padding='4' flex='1'>
          <Select value={selectedFilter} onChange={(e) => handleFilterChange(e)} variant='filled' bg='gray.400' placeholder='Filter By'>
            {pokemonTypes.map((type, index) => (<option key={index} value={type}>{type}</option>))}
          </Select>
        </Box>
        <Box padding='4' flex='1'>
          <Select value={selectedSort} onChange={(e) => handleSortChange(e)} variant='filled' bg='gray.400' placeholder='Sort by'>
            <option value='name'>Name</option>
            <option value='weight'>Weight</option>
            <option value='height'>Height</option>
            <option value='base_experience'>Experience</option>
          </Select>
        </Box>
      </Flex>
    </Container>
  );
}

export default Filters;
