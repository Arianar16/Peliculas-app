const API_KEY = "98d560bcc91cceed30e446a8da9b0a06";



const URL_POPULARES =`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;

export async function obtenerPeliculas() {

    try{

        const respuesta = await fetch(URL_POPULARES);

        if(!respuesta.ok){
            throw new Error("Error al obtener películas");
        }

        const datos = await respuesta.json();
        return datos.results;
    }
    catch(error){

        console.log(error);

        alert("No se pudieron cargar las películas.");

        return [];
    }
}

export async function obtenerDetalle(id){

    try{

        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES` );

        if(!respuesta.ok){
            throw new Error("Error al obtener detalle");
        }

        return await respuesta.json();

    }
    catch(error){

        console.log(error);

        alert("No se pudo cargar el detalle.");

        return null;
    }
}

export async function obtenerCreditos(id){

    try{

        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=es-ES`);

        if(!respuesta.ok){
            throw new Error("Error créditos");
        }

        return await respuesta.json();
    }
    catch(error){

        console.log(error);

        return { cast: [], crew: [] };
    }
}

export async function obtenerVideos(id){

    try{

        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`);

        if(!respuesta.ok){
            throw new Error("Error videos");
        }

        return await respuesta.json();
    }
    catch(error){

        console.log(error);

        return { results: [] };
    }
}

export async function obtenerSimilares(id){

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=es-ES`);

        if(!respuesta.ok){
            throw new Error("Error similares");
        }

        const datos = await respuesta.json();

        return datos.results;
    }
    catch(error){

        console.log(error);

        return [];
    }
}

export async function obtenerPorGenero(idGenero){

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${idGenero}`);

        if(!respuesta.ok){
            throw new Error("Error género");
        }

        const datos = await respuesta.json();

        return datos.results;
    }
    catch(error){

        console.log(error);

        alert("No se pudieron filtrar las películas.");

        return [];
    }
}

export async function buscarPeliculas(nombre){

    try{

        const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${nombre}`);

        if(!respuesta.ok){
            throw new Error("Error búsqueda");
        }

        const datos = await respuesta.json();

        return datos.results;
    }
    catch(error){

        console.log(error);

        alert("Error en la búsqueda.");

        return [];
    }
}