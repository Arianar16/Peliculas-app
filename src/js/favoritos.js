import "../css/favoritos.css";

const contenedor = document.querySelector(".contenedor-favoritos");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

mostrarFavoritos();

function mostrarFavoritos(){

    if(favoritos.length===0){ contenedor.innerHTML=`

        <h2>No hay películas favoritas </h2> `;

        return;
    }

    contenedor.innerHTML=favoritos.map(pelicula=>`

    <div class="card">

        <img src="https://image.tmdb.org/t/p/w500${pelicula.poster}">

        <h2>${pelicula.titulo} </h2>

        <div class="botones">

            <button class="detalle" data-id="${pelicula.id}"> Ver detalle </button>

            <button class="eliminar" data-id="${pelicula.id}"> Quitar </button>

        </div>

    </div>

    `).join("");

}

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("detalle")){

        window.location.href= `detalle.html?id=${e.target.dataset.id}`;
    }

    if(e.target.classList.contains("eliminar")){

        favoritos=favoritos.filter(peli=>peli.id!=e.target.dataset.id );
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        mostrarFavoritos();
    }

});

document.querySelector(".volver").addEventListener("click",() => {window.location.href="index.html";});
