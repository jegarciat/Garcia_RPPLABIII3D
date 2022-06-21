const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
// console.log(anuncios);

if (anuncios.length > 0) {
    crearAnuncios(anuncios);
}

function crearAnuncios(datos){
    const $contenedor_anuncios = document.getElementById("seccion-anuncios");
    
    datos.forEach(element => {
        const $articulo = document.createElement("article");

        const $h3 = document.createElement("h3");
        $h3.textContent = element.titulo;

        $articulo.appendChild($h3);

        const $pDescripcion = document.createElement("p");
        $pDescripcion.textContent = element.descripcion;

        $articulo.appendChild($pDescripcion);

        const $pPrecio = document.createElement("p");
        $pPrecio.textContent = '$' + element.precio;
        $pPrecio.classList.add("verde");

        $articulo.appendChild($pPrecio);
        
        const $contenedor_datos = document.createElement("div");
        $contenedor_datos.classList.add("contenedor-camposChicos");
        
        const $imgPuertas = document.createElement("img");
        $imgPuertas.setAttribute("src", "./images/puertas.png");
        $imgPuertas.setAttribute("alt", "Imagen de Puertas");
        const $pPuertas = document.createElement("p");
        $pPuertas.textContent = element.num_puertas;
        $contenedor_datos.appendChild($imgPuertas);
        $contenedor_datos.appendChild($pPuertas);
        
        const $imgKms = document.createElement("img");
        $imgKms.setAttribute("src", "./images/kilometros.png");
        $imgKms.setAttribute("alt", "Imagen de Kilometros");
        const $pKms = document.createElement("p");
        $pKms.textContent = element.num_kms;
        $contenedor_datos.appendChild($imgKms);
        $contenedor_datos.appendChild($pKms);
        
        const $imgPotencia = document.createElement("img");
        $imgPotencia.setAttribute("src", "./images/potencia.png");
        $imgPotencia.setAttribute("alt", "Imagen de Potencia");
        const $pPotencia = document.createElement("p");
        $pPotencia.textContent = element.potencia;
        $contenedor_datos.appendChild($imgPotencia);
        $contenedor_datos.appendChild($pPotencia);

        $articulo.appendChild($contenedor_datos);
        
        const $boton = document.createElement("button");
        const $a = document.createElement("a");
        $a.setAttribute("href", "#");
        $a.textContent = "Ver Vehículo";
        $boton.appendChild($a);

        $articulo.appendChild($boton);
        $contenedor_anuncios.appendChild($articulo);
    });
}