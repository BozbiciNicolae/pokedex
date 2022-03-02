import create from 'zustand'

export const useStore = create(set => ({
  pokemonListRaw: [],
  pokemonList: [],
  favouritePokemons: [],
  loading: true,
  
  addPokemons: (list) => set(state => {
    return {
      ...state,
      pokemonList: [...list],
      pokemonListRaw: [...list],
      loading: false
    }
  }),

  updateFavourite: (pokemon) => set(state => {
    const favouriteExists = state.favouritePokemons && state.favouritePokemons.find((item) => item.id === pokemon.id)
    if(favouriteExists) {
      return {
        ...state,
        favouritePokemons: state.favouritePokemons.filter((item) => item.id !== pokemon.id)
      }
    } else {
      return {
        ...state,
        favouritePokemons: [
          ...state.favouritePokemons,
          pokemon
        ]
      }
    }
  }),
  setFavouriteList: (list) => set(state => {
    return {
      ...state,
      favouritePokemons: list
    }
  }),

  pokemonTypes: [],
  setPokemonTypes: (list) => set(state => {
    return {
      ...state,
      pokemonTypes: list
    }
  }),

  filterPokemons: (type) => set(state => {
    const filtered = [];
    
    state.pokemonListRaw.forEach((pk) => {
      pk.types.forEach((poketype) => {
        if(poketype.type.name === type) {
          filtered.push(pk)
        }
      })
    })

    return {
      ...state,
      pokemonList: type ? [...filtered] : [...state.pokemonListRaw]
    }
  }),

  searchPokemons: (text) => set(state => {
    const searchResult = state.pokemonListRaw.filter((pk) => {
      return pk.name.includes(text)
    })

    return {
      ...state,
      pokemonList: text ? [...searchResult] : [...state.pokemonListRaw]
    }
  }),

  sortPokemons: (property) => set(state => {
    let sortResult = state.pokemonListRaw.sort((a, b) => (a[property] > b[property]) ? 1 : -1)

    return {
      ...state,
      pokemonList: property ? [...sortResult] : [...state.pokemonListRaw]
    }
  }),
}))
