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
    const{ abilities, id, base_experience, types, name, sprites, stats} = datos;

    const datosPokemon = document.createElement('div');
    datosPokemon.classList.add('card', 'rounded-3', 'border', 'border-5', );

    datosPokemon.innerHTML = `
        <div class="bg-dark text-white card-header">
           POKEMÓN -  #${id} <h6 class="card-subtitle mt-2 text-uppercase">${name}</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <img  class="img-fluid logo" width="150" height="150" src="${sprites.other.dream_world.front_default}"></img>
                    <h5 class=" card-subtitle rounded mt-2 text-uppercase text-white bg-dark">Type: ${types[0].type.name}</h5>  
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div class="row my-4 justify-content-center">
                        <h5 class=" card-subtitle rounded mb-2 mt-1 text-uppercase text-white bg-dark">STATS</h5> 
                        <div class="col-4">
                            <h6 class=" card-subtitle mt-2 text-uppercase text-dark">XP: ${base_experience}</h6>
                        </div>
                        <div class="col-4">
                            <h6 class=" card-subtitle mt-2 text-uppercase text-dark">${stats[0].stat.name}: ${stats[0].base_stat}</h6>
                        </div>
                        <div class="col-4">
                            <h6 class=" card-subtitle mt-2 text-uppercase text-dark">ATK: ${stats[1].base_stat}</h6>
                        </div>
                        <div class="col-4">
                            <h6 class=" card-subtitle mt-2 text-uppercase text-dark">DFS: ${stats[2].base_stat}</h6>
                        </div>
                        <div class="col-4">
                            <h6 class=" card-subtitle mt-2 text-uppercase text-dark">SATK: ${stats[3].base_stat}</h6>
                        </div>
                        <div class="col-4">
                            <h6 class=" card-subtitle mt-2 text-uppercase text-dark">SDFS: ${stats[4].base_stat}</h6>
                        </div>
                        <div class="col-4">
                            <h6 class=" card-subtitle mt-2 text-uppercase text-dark">SPD: ${stats[5].base_stat}</h6>
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