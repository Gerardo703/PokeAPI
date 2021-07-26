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
    const{ abilities, id, weight, types, name, sprites} = datos;

    const datosPokemon = document.createElement('div');
    datosPokemon.classList.add('card', 'rounded-3', 'border', 'border-5');
    datosPokemon.innerHTML = `
        <div class="bg-dark text-white card-header">
           POKEMÓN -  #${id} <h6 class="card-subtitle mt-2 text-uppercase">${name}</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <img  class="img-fluid " width="150" height="150" src="${sprites.other.dream_world.front_default}"></img>
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <h5 class=" card-subtitle mt-2 text-uppercase text-dark">Weight: ${weight}</h5>
                    <h5 class=" card-subtitle mt-2 text-uppercase text-dark">Abilitie #1 : ${abilities[0].ability.name}</h5>
                    <h5 class=" card-subtitle mt-2 text-uppercase text-dark">Abilitie #2 : ${abilities[1].ability.name}</h5>
                    <h5 class=" card-subtitle mt-2 text-uppercase text-white bg-dark">Type: ${types[0].type.name}</h5>
                    
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