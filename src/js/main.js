import "../css/style.css";
import {
    obtenerPeliculas,
    obtenerPorGenero,
    buscarPeliculas
} from "./api";

const contenedor = document.querySelector(".peliculas");
const categoria = document.querySelector("#categoria");
const input = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#buscar");
const orden = document.querySelector("#orden");

let peliculasActuales = [];

mostrarPeliculas();

async function mostrarPeliculas(){

    peliculasActuales = await obtenerPeliculas();

    mostrarTarjetas(peliculasActuales);

}

function mostrarTarjetas(peliculas){

    contenedor.innerHTML = "";

    peliculas
    .filter(pelicula => pelicula.poster_path)
    .slice(0,15)
    .forEach(pelicula => {

        contenedor.innerHTML += `

        <div class="card">

            <img
            src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"
            alt="${pelicula.title}">

            <div class="info">

                <h2>${pelicula.title}</h2>

                <p>⭐ ${pelicula.vote_average.toFixed(1)}</p>

                <button
                class="ver"
                data-id="${pelicula.id}">

                    Ver más

                </button>

            </div>

        </div>

        `;

    });

}

categoria.addEventListener("change", async ()=>{

    const idGenero = categoria.value;

    if(idGenero === "0"){

        peliculasActuales = await obtenerPeliculas();

        mostrarTarjetas(peliculasActuales);

    }

    else{

        peliculasActuales = await obtenerPorGenero(idGenero);

        mostrarTarjetas(peliculasActuales);

    }

});

botonBuscar.addEventListener("click", async ()=>{

    const texto = input.value.trim();

    if(texto === ""){

        mostrarPeliculas();

    }

    else{

        peliculasActuales = await buscarPeliculas(texto);

        if(peliculasActuales.length === 0){

            contenedor.innerHTML =
            `<h2 class="mensaje">No se encontraron películas.</h2>`;

            return;
        }

        mostrarTarjetas(peliculasActuales);

    }

});

input.addEventListener("keyup", async (e)=>{

    if(e.key === "Enter"){

        const texto = input.value.trim();

        if(texto === ""){

            mostrarPeliculas();

        }

        else{

            peliculasActuales = await buscarPeliculas(texto);

            if(peliculasActuales.length === 0){

                contenedor.innerHTML =
                `<h2 class="mensaje">No se encontraron películas.</h2>`;

                return;
            }

            mostrarTarjetas(peliculasActuales);

        }

    }

});

orden.addEventListener("change", ()=>{

    let copia = [...peliculasActuales];

    if(orden.value === "recientes"){

        copia.sort((a,b)=>

            new Date(b.release_date) -
            new Date(a.release_date)

        );

    }

    if(orden.value === "antiguas"){

        copia.sort((a,b)=>

            new Date(a.release_date) -
            new Date(b.release_date)

        );

    }

    mostrarTarjetas(copia);

});

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("ver")){

        const id = e.target.dataset.id;

        window.location.href =
        `detalle.html?id=${id}`;

    }

});