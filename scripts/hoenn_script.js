const poke_container = document.getElementById('poke-container');
const pokemon_start = 252;
const pokemon_count = 387;
const colors = {
fire: '#ea7a3c',
grass: '#71c558',
electric: '#e5c531',
water: '#539ae2',
ground: '#cc9f4f',
rock: '#b2a061',
fairy: '#e397d1',
poison: '#b468b7',
ghost: '#846ab6',
bug: '#94bc4a',
dragon: '#6a7baf',
psychic: '#e5709b',
flying: '#7da6de',
fighting: '#cb5f48',
normal: '#aab09f',
dark: '#736c75',
steel: '#89a1b0',
ice: '#70cbd4',
};
const main_types = Object.keys(colors);

async function fetchPokemons() {
    for(let i = pokemon_start; i < pokemon_count; i++)
    {
        await getPokemon(i);
        //console.log(i);
    }
}

async function getPokemon(id) {
    const url="http://pokeapi.co/api/v2/pokemon/" + id;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCard(data);
}

function createPokemonCard(pokemon){
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = poke_types[0];
    const sub_type = poke_types[1] ?? null;
    const color = colors[type];
    pokemonElement.style.backgroundColor = color;

    if (sub_type == null){
        pokemonInnerHTML = `<div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span></small>
            </div>`;
    }
    else{
        pokemonInnerHTML = `<div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Types: <span>${type}</span></small>
                <br>
                <small class="sub_type">/ <span>${sub_type}</span></small>
            </div>`;
    }

    pokemonElement.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonElement);
}

fetchPokemons();