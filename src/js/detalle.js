import "../css/detalle.css";
import {obtenerDetalle, obtenerCreditos, obtenerVideos, obtenerSimilares} from "./api";

const contenedor = document.querySelector(".detalle");

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

mostrarDetalle();

async function mostrarDetalle() {

    const pelicula = await obtenerDetalle(id);
    const creditos = await obtenerCreditos(id);
    const actores = creditos.cast.slice(0,5);
    const director = creditos.crew.find( persona => persona.job === "Director");
    const videos = await obtenerVideos(id);
    const trailer = videos.results.find( video => video.type === "Trailer" && video.site === "YouTube" );
    const similares = await obtenerSimilares(id);

    contenedor.innerHTML = `

<div class="fondo"></div>

<div class="poster">

    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}">

</div>

<div class="info">

    <h1>${pelicula.title} </h1>

    <p>${pelicula.overview} </p>

    <div class="reparto">

    <p>
        <strong> Reparto principal:</strong>
        ${actores.map(actor => actor.name).join(", ")}
    </p>

    <p>
        <strong> Director:</strong>
        ${director ? director.name : "Desconocido"}
    </p>

    </div>

    <div class="trailer">

        <h2> Trailer </h2>
        ${trailer ? ` <iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen> </iframe>
        ` : "<p>No hay trailer disponible</p>"}

    </div>

    <div class="similares">

    <h2> Películas similares </h2>

    <div class="contenedor-similares">

        ${ similares.slice(0,6).map(pelicula =>
            ` <div class="card-similar">

                <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" >

                <h3> ${pelicula.title}</h3>

                <button class="ver-similar" data-id="${pelicula.id}"> Ver más </button>

            </div>
            `
            ).join("")
        }

    </div>

</div>

</div>

<div class="panel">

    <h2>

        ⭐ ${pelicula.vote_average.toFixed(1)}

    </h2>

    <div class="dato">

        <p><strong>Año:</strong> ${pelicula.release_date}</p>

        <p><strong>Duración:</strong> ${pelicula.runtime} min</p>

        <p><strong>Géneros:</strong> ${pelicula.genres.map(g=>g.name).join(", ")} </p>

    </div>

    <div class="botones">

        <button class="volver"> Volver al inicio </button>
        <button class="favorito"> Agregar a favoritos </button>

    </div>

</div>

`;

document.querySelector(".fondo").style.backgroundImage =
`url(https://image.tmdb.org/t/p/original${pelicula.backdrop_path})`;

    document.querySelector(".volver") .addEventListener("click", () => { window.location.href = "index.html";});
    document.addEventListener("click", (e) => {
            if (e.target.classList.contains("ver-similar")) {
            const id = e.target.dataset.id;
            window.location.href = `detalle.html?id=${id}`; } });

const botonFavorito=document.querySelector(".favorito");

let favoritos= JSON.parse(localStorage.getItem("favoritos")) || [];

const existe=favoritos.find(peli=>peli.id===pelicula.id);

if(existe){
    botonFavorito.innerText=" Quitar de favoritos";
}

botonFavorito.addEventListener("click",()=>{

    favoritos= JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe=favoritos.find( peli=>peli.id===pelicula.id );

    if(existe){

        favoritos=favoritos.filter(peli=>peli.id!==pelicula.id);
        localStorage.setItem( "favoritos", JSON.stringify(favoritos));
        botonFavorito.innerText="Agregar a favoritos";
    }

    else{

        favoritos.push({
            id:pelicula.id,
            titulo:pelicula.title,
            poster:pelicula.poster_path});

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        botonFavorito.innerText=" Quitar de favoritos";
    }
});
}