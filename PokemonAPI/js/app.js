// Consultas - Variables 

const container = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarPokemon);
});

function buscarPokemon(e){
    e.preventDefault();

    //Validar Formulario
    const pokemon = document.querySelector('#pokemon').value; //Obtengo el valor del Input
    
    if( pokemon === '' ){
        mostrarError('Todos los campos son obligatorios');
        return;
    }

    consultarApi(pokemon);
};

function mostrarError(mensaje){
    const alerta = document.querySelector('.alert alert-danger');

    if (!alerta) {
        const alerta = document.createElement('div');
        alerta.classList.add('alert', 'alert-danger', 'mt-3');

        alerta.innerHTML = `
            <strong class="fw-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);
        
        setTimeout(() => {
           alerta.remove() 
        }, 1500);
    };
};

// function consultarApi2(){
//     const url2 = 'https://pokeapi.co/api/v2/pokemon';

//     // Mostramos spinner
//     Spinner();

//     fetch(url2)
//         .then(response => response.json())
//         .then(json => {
//             console.log(json.results);

//              // Limpiar HTML previo
//             limpiarHtml();

//             mostrarListado(json.results);
//         });
// };

// Busca un pokémon por su nombre o numero

function consultarApi(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;


    //Muestra el spinner de carga
    Spinner();

    fetch(url)
        .then( resultado => resultado.json())
        .then( datos => {
            console.log(datos);

            // Limpiar HTML previo
            limpiarHtml();
            
            // Imprimimos la respuesta en el HTML
            mostrarDatos(datos);
        })
};

function mostrarDatos(datos){
    const{id, base_experience, types, name, sprites, stats} = datos;

    const datosPokemon = document.createElement('div');
    datosPokemon.classList.add('card', 'rounded-3', 'border', 'border-3', );

    datosPokemon.innerHTML = `
        <div class="bg-dark text-white card-header">
           POKEMÓN -  #${id} <h6 class="card-subtitle mt-2 text-uppercase">${name}</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <img  class="img-fluid logo mb-2"  src="${sprites.other.dream_world.front_default}"></img>
                    <h5 class=" card-subtitle rounded mt-2 text-uppercase text-white bg-dark">Type: ${types[0].type.name}</h5>  
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <h5 class=" card-subtitle rounded mt-1 text-uppercase text-white bg-dark">STATS</h5>
                    <div class="row my-3 justify-content-center">
                        <div class="col-5">
                            <h4 class=" card-subtitle mt-2 text-center text-uppercase text-dark">${stats[0].stat.name}: <span class="text-danger">${stats[0].base_stat}</span></h4>
                        </div>
                        <div class="col-5">
                            <h4 class=" card-subtitle mt-2 text-center text-uppercase text-dark">ATK: <span class="text-danger">${stats[2].base_stat}</span></h4>
                        </div>
                        <div class="col-5">
                            <h4 class=" card-subtitle mt-2  text-center text-uppercase text-dark">SATK: <span class="text-danger">${stats[3].base_stat}</span></h4>
                        </div>
                        <div class="col-5">
                            <h4 class=" card-subtitle mt-2 text-center text-uppercase text-dark">XP:  <span class="text-primary">${base_experience}</span></h4>
                        </div>
                        <div class="col-5">
                            <h4 class=" card-subtitle mt-2 text-center text-uppercase text-dark">DFS: <span class="text-primary">${stats[2].base_stat}</span></h4>
                        </div>
                        <div class="col-5">
                            <h4 class=" card-subtitle mt-2 text-center text-uppercase  text-dark">SDFS: <span class="text-primary">${stats[4].base_stat}</span></h4>
                        </div>
                        <div class="col-5">
                            <h4 class=" card-subtitle mt-2 text-center text-uppercase text-dark">SPD: ${stats[5].base_stat}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    resultado.appendChild(datosPokemon);
}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
};

function Spinner(){

    limpiarHtml();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-cube-grid');

    divSpinner.innerHTML = `
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(divSpinner);
}