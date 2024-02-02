const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 8;
let offset = 0;

const maxRecords = 151




    function loadPokemonItens(offset, limit){
        pokeApi.getpokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `
            <li class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
                        <span class="name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
        
                        
                        <div class="detail">
                            
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</li>`).join('')}
                            </ol>
        
                                <img src="${pokemon.photo}" alt="${pokemon.name}" height="100%">
        
                        </div>
                    
                    </li>
            `
        ).join('')
        pokemonList.innerHTML += newHtml
    })
    }

    loadPokemonItens(offset, limit)

    loadMoreButton.addEventListener('click', () => {
        offset += limit

        const qtdRecordNextPage = offset + limit;

        if (qtdRecordNextPage >= maxRecords){
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit) 

            loadMoreButton.parentElement.removeChild(loadMoreButton)
            return
        } else{
            loadPokemonItens(offset, limit)
        }


    })