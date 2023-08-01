const pokemonNome = document.querySelector('.pokemon_nome');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImagem = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const prev = document.querySelector('.button_prev');
const next = document.querySelector('.button_next');
const random = document.querySelector('.button_random');

let searchPokemon = 1;

//função que busca o pokemon na API
const buscaPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

//função responsavel pelos elementos da tela
const renderPokemon = async (pokemon) => {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Carregando...';
    pokemonNumero.innerHTML = ('');

    const data = await buscaPokemon(pokemon);

    if (data) {
        searchPokemon = data.id;
        pokemonImagem.style.display = 'block';
        pokemonNome.innerHTML = data.name;
        pokemonNumero.innerHTML = (data.id + ' - ');

        
        if (shinyTest() == 1){
            pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
            if (pokemonImagem.src.includes('/null')){
                pokemonImagem.src = data['sprites']['front_shiny'];
            }
        }else{
            pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            if (pokemonImagem.src.includes('/null')){
                pokemonImagem.src = data['sprites']['front_default'];
            }
        }
    }else{
        pokemonNome.innerHTML = 'Não encontrado';
    }
    input.value = '';
}


//função responsavel pelo formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

//funções dos botões
prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

random.addEventListener('click', () => {
    searchPokemon = pokemonAleatorio();
    renderPokemon(searchPokemon);
})

function pokemonAleatorio() {
    return Math.floor(Math.random() * 1010) + 1;
  }

function shinyTest() {
    return Math.floor(Math.random() * 10) + 1;
  }

renderPokemon(searchPokemon);
