import { crearTabla, actualizarTabla } from "./tabla.js";
import { agregarSpinner, eliminarSpinner } from "./spinner.js";
import Anuncio_Auto from "./anuncio_auto.js";

const $frmAnuncio = document.forms[0];
const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
crearTabla(anuncios);

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    let id = e.target.parentElement.dataset.id;
    cargarForm(anuncios.find((anuncio) => anuncio.id == id));
  } else if (e.target.matches("#btnEliminar")) {
    eliminarAnuncio($frmAnuncio.anuncioID.value);
    mostrarEditarEliminar(false);
    $frmAnuncio.anuncioID.value = "";
    $frmAnuncio.reset();
  } else if (e.target.matches("#btnCancelar")) {
    $frmAnuncio.anuncioID.value = "";
    mostrarEditarEliminar(false);
  }
});

$frmAnuncio.addEventListener("submit", (e) => {
    e.preventDefault();

    const { titulo, precio, puertas, potencia, kms, descripcion, transaccion, asientos_cuero, polarizado, aire, anuncioID } = $frmAnuncio;
    if(validarString(titulo.value, descripcion.value) && validarNumericos(precio.value, puertas.value, potencia.value))
    {
      const anuncioAux = new Anuncio_Auto(
        anuncioID.value,
        titulo.value.trim(),
        transaccion.value,
        descripcion.value.trim(),
        parseFloat(precio.value),
        parseInt(puertas.value),
        kms.value,
        parseInt(potencia.value),
        asientos_cuero.checked,
        aire.checked,
        polarizado.checked
      );

      if (anuncioAux.id === "") {
        anuncioAux.id = Date.now();
        crearAnuncio(anuncioAux);
      } else {
        modificarAnuncio(anuncioAux);
        mostrarEditarEliminar(false);
        anuncioID.value = "";
      }
    }

    $frmAnuncio.reset();
});

function validarNumericos(precio, puertas, potencia)
{
    return (parseFloat(precio) && parseInt(puertas) && parseInt(potencia)? true : false);
}

function validarString(titulo, descripcion)
{
    return (titulo.trim().length > 0 && descripcion.trim().length > 0? true : false);
}

function cargarForm(anuncio) {
    const { titulo, precio, puertas, potencia, kms, descripcion, transaccion, asientos_cuero, polarizado, aire, anuncioID } = $frmAnuncio;

    titulo.value = anuncio.titulo;
    transaccion.value = anuncio.transaccion;
    descripcion.value = anuncio.descripcion;
    precio.value = anuncio.precio;
    puertas.value = anuncio.num_puertas;
    kms.value = anuncio.num_kms;
    potencia.value = anuncio.potencia;
    asientos_cuero.checked = anuncio.asientos_cuero;
    aire.checked = anuncio.aire_acondicionado;
    polarizado.checked = anuncio.polarizado;
    anuncioID.value = anuncio.id;

    mostrarEditarEliminar(true);
}

function mostrarEditarEliminar(condicion) {
  if (condicion) {
    document.getElementById("btnGuardar").classList.add("ocultar");
    document.getElementById("btnEliminar").classList.remove("ocultar");
    document.getElementById("btnModificar").classList.remove("ocultar");
  } else {
    document.getElementById("btnGuardar").classList.remove("ocultar");
    document.getElementById("btnEliminar").classList.add("ocultar");
    document.getElementById("btnModificar").classList.add("ocultar");
  }
}

const crearAnuncio = (nuevoAnuncio) => {
  anuncios.push(nuevoAnuncio);
  guardarDatos(anuncios);
  alertaCustom("¡Anuncio creado exitosamente!", "agregar");
  agregarSpinner();
  document.getElementById("tabla_anuncios").classList.add("ocultar");
  setTimeout(() => {
    actualizarTabla(anuncios);
    eliminarSpinner();
    document.getElementById("tabla_anuncios").classList.remove("ocultar");
  }, 3000);
};

const modificarAnuncio = (anuncioEditado) => {
  let indice = anuncios.findIndex((e) => e.id == anuncioEditado.id);
  anuncios.splice(indice, 1);
  anuncios.push(anuncioEditado);
  guardarDatos(anuncios);
  alertaCustom("¡Anuncio modificado exitosamente!", "modificar");
  agregarSpinner();
  document.getElementById("tabla_anuncios").classList.add("ocultar");
  setTimeout(() => {
    actualizarTabla(anuncios);
    eliminarSpinner();
    document.getElementById("tabla_anuncios").classList.remove("ocultar");
  }, 3000);
};

const eliminarAnuncio = (id) => {
  let indice = anuncios.findIndex((e) => e.id == id);
  anuncios.splice(indice, 1);
  guardarDatos(anuncios);
  alertaCustom("¡Anuncio eliminado exitosamente!", "eliminar");
  agregarSpinner();
  document.getElementById("tabla_anuncios").classList.add("ocultar");
  setTimeout(() => {
    actualizarTabla(anuncios);
    eliminarSpinner();
    document.getElementById("tabla_anuncios").classList.remove("ocultar");
  }, 3000);
};

const guardarDatos = (datos) => {
  localStorage.setItem("anuncios", JSON.stringify(datos));
};

const alertaCustom = (texto, estilo) => {
    const contenedor_alerta = document.createElement("div");
    contenedor_alerta.setAttribute("id", "contenedor-alerta");
    contenedor_alerta.appendChild(document.createTextNode(texto));
    contenedor_alerta.classList.add(estilo);
    document.getElementById("contenedor-spinner").appendChild(contenedor_alerta);
}