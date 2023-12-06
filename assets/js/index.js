const todos = document.getElementById("todos") //BOTON TODOS
const mujeres = document.getElementById("mujeres") //BOTON MUJERES
const hombres = document.getElementById("hombres") //BOTON HOMBRES
const actuales = document.getElementById("pActual") // PAGINA ACTUAL
const totales = document.getElementById("pTotal") // CUANTAS PAGINAS SON?

const primera = document.getElementById("aant") //Primera Pagina "1"
const atras = document.getElementById("ant") //Pagina Anterior
const siguiente = document.getElementById("pos") //Pagina Siguiente
const ultima = document.getElementById("ppos") //Salta 20 paginas
/* Por ahora lo siento incomodo que todos los const esten arriba y no buscarlos en las posiciones donde tambien se encuentran en el .html ... pero qsyo, quizas sea algo habitual. */

let url = "https://rickandmortyapi.com/api/character/"

function renderizado(genero, pActual){  //una FUNCTION "renderizado" que toma un parametro "genero" + Numero de Pagina Actual "pActual"
    fetch(url + "?page=" + pActual + genero) // Se concatena la variable url + parametro genero//
    .then((res)=> res.json())
    .then((data) =>{
        console.log(data)
        let element = document.querySelector("#tarjetas") 
        let html = ""

        for (const iterator of data.results) { // CONDICIONALES: En la pagina, tomo de "data", la seccion que dice "results"
            html += //Este DIV toma de Iterator, el Nombre y demas datos que tiene la pagina en si.//
            `
            <div class="card"> 
                <h2 class="nameEntry">Name: ${iterator.name}</h2>
                <img src= ${iterator.image} alt"image">

            <section class="datosPersonajes">
                <p>Gender:  ${iterator.gender}<p>
                <p>Species:  ${iterator.species}<p>
                <p>Origin:  ${iterator.origin.name}<p>
            </section>

            </div>
            `
        }
        element.innerHTML = html
        actuales.textContent = `Pagina Actual: ${pActual}` //pActual es el segundo parametro que tomó "renderizado"
        totales.textContent = `Total de Paginas: ${data.info.pages}`
    })

}
renderizado("", 1) 

let pActual = 1
let pTotal = 42
let genero = ""

const fetchTodos = () => { //FUNCION FLECHA: es mas o menos lo mismo que usar function normal (dije mas o menos)
    pActual = 1
    pTotal = 42
    genero = ""
     renderizado(genero, pActual) 
}

const fetchMujeres = () => {
    pActual = 1
    pTotal = 8
    genero = "&gender=female"
    renderizado(genero, pActual)
}

const fetchHombres = () => {
    pActual = 1
    pTotal = 31
    genero = "&gender=male"
    renderizado(genero, pActual)
}

todos.onclick = fetchTodos //cuando haga click, filtra a personajes de todos los generos
mujeres.onclick = fetchMujeres //cuando haga click, filtra a personajes Hembras
hombres.onclick = fetchHombres //cuando haga click, filtra a personajes Machos

aant.disabled = true; // Los botones, mientras esté la pagina actual predeteminada
ant.disabled = true;

function anteAnterior() {
    if(pActual === 1){
        aant.disabled = true;
        ant.disabled = true;
    }

    console.log("ante anterior")
    pActual = 1
    renderizado(genero, pActual)
}

function anterior() {
    if(pActual === 2){
        aant.disabled = true;
        ant.disabled = true;
    }
    if(pActual < pTotal + 1){
        ppos.disabled = false;
        pos.disabled = false;
    }

    console.log("anterior")
    pActual = pActual - 1
    renderizado(genero, pActual)
}

function posterior() {
    if(pActual < 2){
        aant.disabled = false;
        ant.disabled = false;
    }
    if(pActual === pTotal - 1){
        ppos.disabled = true;
        pos.disabled = true;
    }
    console.log("posterior")
    pActual = pActual + 1
    renderizado(genero, pActual)
}

function pPosterior() {
    ppos.disabled = true;
    pos.disabled = true;
    if(pActual < 2){
        aant.disabled = false;
        ant.disabled = false;
    }
    console.log("POS posterior")
    pActual = pTotal
    renderizado(genero, pActual)
}

aant.onclick = anteAnterior
ant.onclick = anterior
pos.onclick = posterior
ppos.onclick = pPosterior

document.addEventListener("keyup", e=>{
    e.target.matches("#buscadorBar")
    console.log(e.target.value)

    if(e.target.matches("#buscadorBar")){
        renderizado().forEach(tarjeta => {
            tarjeta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?tarjeta.classList.remove("filtro")
                :tarjeta.classList.add("filtro")
            
        });
    }

}
)

/* const colorChange = document.getElementById("themeChange") //BOTON PARA CAMBIAR TEMA */