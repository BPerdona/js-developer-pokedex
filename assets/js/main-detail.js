const pokemonDetailScreen = document.getElementById("pokemon-screen")
const pokemonDetailInfo = document.getElementById("pokemon-info")
const htmlBody = document.getElementById("body")
const statusBarScale = 0.75

loadPokemonFromLocalStorage()

function loadPokemonFromLocalStorage(){

    function populateHtmlWithPokemon(pokemon){
        htmlBody.classList.add(pokemon.type)

        const pokemonScreenHtml = `
            <h1 class="name">${pokemon.name}</h1>
            <span class="number">#${pokemon.number}</span>
            <ol class="types">
                ${pokemon.types.map((type) => 
                    `<li class="type ${type}">${type}</li>`).join('')
                }
            </ol>
            <img 
                class="image"
                src="${pokemon.photo}" 
                alt="${pokemon.name}">
        `
        
        pokemonDetailScreen.innerHTML += pokemonScreenHtml

        const pokemonInfoHtml = `
            <h1>Status</h1>
            <div class="pokemon-status">
                <p class="status-item"><strong>HP:</strong> ${pokemon.hp}</p>
                <div class="status-bar ${pokemon.type}" style="--bar-progress: ${pokemon.hp*statusBarScale}%;"></div>

                <p class="status-item"><strong>Attack:</strong> ${pokemon.attack}</p>
                <div class="status-bar ${pokemon.type}" style="--bar-progress: ${pokemon.attack*statusBarScale}%;"></div>

                <p class="status-item"><strong>Defense:</strong> ${pokemon.defense}</p>
                <div class="status-bar ${pokemon.type}" style="--bar-progress: ${pokemon.defense*statusBarScale}%;"></div>

                <p class="status-item"><strong>Special Attack:</strong> ${pokemon.special_attack}</p>
                <div class="status-bar ${pokemon.type}" style="--bar-progress: ${pokemon.special_attack*statusBarScale}%;"></div>

                <p class="status-item"><strong>Special Defense:</strong> ${pokemon.special_defense}</p>
                <div class="status-bar ${pokemon.type}" style="--bar-progress: ${pokemon.special_defense*statusBarScale}%;"></div>

                <p class="status-item"><strong>Speed:</strong> ${pokemon.speed}</p>
                <div class="status-bar ${pokemon.type}" style="--bar-progress: ${pokemon.speed*statusBarScale}%;"></div>

            </div>
            <h2>Size</h2>
            <div class="pokemon-status">
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
            </div>
            <h2>Abilities</h2>
            <div class="pokemon-status">
                ${pokemon.abilities.map((ability) => `<p class="ability">${ability}</p>`).join('')}
                
            </div>
        `
        pokemonDetailInfo.innerHTML += pokemonInfoHtml
    }

    const pokemonNumber = localStorage.getItem("pokemonNumber")

    pokeApi.getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`, allInfo = true)
        .then((json) => {
            console.log(json)
            return json
        })
        .then((json) => convertPokeApiDetailToPokemonDetail(json))
        .then(populateHtmlWithPokemon)
        .catch((error) => {
            pokemonDetailScreen.innerHTML += (`<h1>An error occurred: ${error}</h1>`)
        })
}


