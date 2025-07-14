import { pokeapi } from './poke-api.js'


function getpokemonIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return params.get('pokemon')
}

function renderPokemonDetails(pokemon) {
    const container = document.getElementById('pokemon-details')
    container.innerHTML = `
    <section class="pokemon-description ${pokemon.type}">
        <h1>${pokemon.name} (#${pokemon.number})</h1>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <ul class="types">
            ${pokemon.types.map(type => `<li>${type}</li>`).join('')}
        </ul>
        <p>Altura ${((pokemon.height)/10).toFixed(2)} m</p>
        <p>Peso: ${((pokemon.weight)/10).toFixed(2)} kg</p>
        <img src="${pokemon.shiny}" alt="${pokemon.name} shiny">

        <ul class="types">
    </section>
    `
}

async function loadPokemonDescription(){
    const id = getpokemonIdFromUrl()
    const pokemon = await pokeapi.getPokemonDetailByNumber(id)
    renderPokemonDetails(pokemon)
}

loadPokemonDescription()