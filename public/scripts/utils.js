/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.

*/

/* ======   FUNCION PARA CARGAR LAS IMAGENES Y DATOS    ===== */

import { stays } from "./stays.js";

let tipoStays = document.querySelector("#cargarStays");

export function cargarStays(nuevaLista) {
    tipoStays.innerHTML = "";
    for (let i = 0; i < nuevaLista.length; i++) {
        const superHostElemento = nuevaLista[i].superHost
            ? `<div class="border border-dark rounded-full px-1 py-1 text-[8px] font-bold text-darkGray uppercase">Super Host</div>`
            : "";
        tipoStays.innerHTML += `
        <div class="w-12/12">
                    <img
                        class="w-12/12 h-46 rounded-3xl object-cover"
                        src="${nuevaLista[i].photo}"
                        alt="" />
                    <div class="flex justify-between items-center px-3 lg:pt-2">
                        ${superHostElemento}
                        <p class="text-darkGray text-[12px] py-1">
                            ${nuevaLista[i].type}. ${nuevaLista[i].beds} beds
                        </p>
                        <div class="flex justify-end items-center gap-1">
                            <img
                                class="w-4 h-4"
                                src="/img/icons/star.svg"
                                alt="star" />
                            <p class="text-dark text-[12px] py-1">${nuevaLista[i].rating}</p>
                        </div>
                    </div>
                    <p class="text-dark text-sm font-semibold px-3 pb-5 md:pb-0">
                        ${nuevaLista[i].title}
                    </p>
                </div>
        `;
    }
}
cargarStays(stays);

/* ======   FUNCION PARA ABRIR Y CERRRAR EL MODAL DEL BUSCADOR    ===== */

let llamarModal = document.querySelector("#llamarModal");
let modal = document.querySelector("#modal");
let cerrarModal = document.querySelector("#cerrarModal");

function activarModal() {
    llamarModal.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    cerrarModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

activarModal();

/* ======   FUNCION PARA BOTON DE SEARCH    ===== */

let btnSearch = document.querySelector("#btnSearch");

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("hidden");

    const ciudadInput = buscadorPorCiudad.value.toLocaleLowerCase().trim();
    const personasInput = parseInt(resTotal) || 0;
    const busquedaFinal = stays.filter((dato) => {
        const igualCiudad = ciudadInput === "" || ciudadInput.includes(dato.city.toLocaleLowerCase());
        const igualPersonas = dato.maxGuests >= personasInput;
        return igualCiudad && igualPersonas;
    });
    cargarStays(busquedaFinal);
});

/* ======   FUNCION PARA DESPLEGAR LOCATION    ===== */

let inputLocation = document.querySelector("#buscarLocation");
let menuLocation = document.querySelector("#menuLocation");

function despliegueLocation() {
    inputLocation.addEventListener("click", () => {
        menuLocation.classList.toggle("hidden");
        menuGuest.classList.add("hidden");
    });
}
despliegueLocation();

/* ======   FUNCION PARA DESPLEGAR GUEST    ===== */

let inputGuest = document.querySelector("#buscarGuests");
let menuGuest = document.querySelector("#menuGuests");

function despliegueGuest() {
    inputGuest.addEventListener("click", () => {
        menuGuest.classList.toggle("hidden");
        menuLocation.classList.add("hidden");
    });
}

despliegueGuest();

/* =====     FUNCION BUSCARDOR POR CIUDAD      ===== */
let buscadorPorCiudad = document.querySelector("#buscarLocation");
let opcCiudades = document.querySelector("#opcCiudades");

function resultadoCiudad(ciudades) {
    const texto = ciudades.toLowerCase().trim();
    const resultado = stays.filter((ciudad) => {
        return texto.includes(ciudad.city.toLocaleLowerCase());
    });
    cargarStays(resultado);
}

buscadorPorCiudad.addEventListener("input", (e) => {
    resultadoCiudad(e.target.value);
});

/* =====     FUNCIONES PARA SELECCIONAR POR CIUDAD     ===== */

opcCiudades.addEventListener("click", (e) => {
    const itemLista = e.target.closest(".listaCiudad");
    if (itemLista) {
        const nuevaListaCiudad = itemLista.innerText.trim();
        buscadorPorCiudad.value = nuevaListaCiudad;
        resultadoCiudad(nuevaListaCiudad);
    }
});

/* =====     FUNCION BUSCARDOR POR PERSONAS     ===== */

let buscadorPorPersonas = document.querySelector("#buscarGuests");

function datosFiltroGuests(dato) {
    const numero = parseInt(dato) || 0;
    const resPersonas = stays.filter((persona) => {
        return numero === 0 ? true : persona.maxGuests >= numero;
    });
    cargarStays(resPersonas);
}

function resultadoGuests() {
    buscadorPorPersonas.addEventListener("input", (e) => {
        datosFiltroGuests(e.target.value);
    });
}

resultadoGuests();

/* ======   FUNCION PARA SUMAR LAS PERSONAS    ===== */

let btnMasAdultos = document.querySelector("#btnMasAdultos");
let btnMenosAdultos = document.querySelector("#btnMenosAdultos");
let btnMasNinios = document.querySelector("#btnMasNinios");
let btnMenosNinios = document.querySelector("#btnMenosNinios");
let resAdultos = document.querySelector("#resAdulto");
let resNinios = document.querySelector("#resNinios");
let inicioAdultos = 0;
let inicioNinios = 0;
let resTotal = 0;

btnMasAdultos.addEventListener("click", (e) => {
    e.stopPropagation();
    inicioAdultos++;
    sumaPersonas();
});

btnMenosAdultos.addEventListener("click", (e) => {
    e.stopPropagation();
    if (inicioAdultos > 0) {
        inicioAdultos--;
        sumaPersonas();
    }
});

btnMasNinios.addEventListener("click", (e) => {
    e.stopPropagation();
    inicioNinios++;
    sumaPersonas();
});

btnMenosNinios.addEventListener("click", (e) => {
    e.stopPropagation();
    if (inicioNinios > 0) {
        inicioNinios--;
        sumaPersonas();
    }
});

function sumaPersonas() {
    resAdultos.innerHTML = inicioAdultos;
    resNinios.innerHTML = inicioNinios;

    resTotal = inicioAdultos + inicioNinios;
    const valorDelInput = resTotal > 0 ? resTotal.toString() : "";
    buscadorPorPersonas.value = valorDelInput;
    datosFiltroGuests(valorDelInput);
}
