import { Pokemon } from './pokemon-model.js'
const pokeapi = {}


function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types // é a mesma coisa que: pokeDetail.types.get(0)

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default

    pokemon.shiny = pokeDetail.sprites.other["official-artwork"].front_shiny

    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

    return pokemon
    
}


pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) =>  response.json())
            .then(convertPokeApiDetailToPokemon)

}

pokeapi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //busca a lista de pokemon
        .then((response) => response.json())//converte o resultado para json
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


pokeapi.getPokemonDetailByNumber = async function (id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return convertPokeApiDetailToPokemon(data)
}

console.log(pokeapi)


export {pokeapi}
