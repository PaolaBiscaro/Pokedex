const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 1025
const limit = 205
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<a href="/templates/description.html?pokemon=${pokemon.number}" class="description-link"><li class="pokemon ${pokemon.type}">
                <span class="number"><strong>#${pokemon.number}</strong></span>
                <span class="name">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ">${type}</li>`).join(' ')}
                    </ol>
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
            </li></a>`).join('')
        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)
descriptionPokemonPage(descriptionPokemon)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qntRecordNextPage = offset + limit

    if (qntRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }
})





console.log('Sucesso!')

