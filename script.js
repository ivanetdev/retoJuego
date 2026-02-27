//cargo la lista de imágenes dentro de un array
const sliderImages = ["arbol.svg", "arcoiris.svg", "avion.svg", "barco.svg", "bici.svg", "coche.svg", "conejo.svg", "flor.svg",
    "fresa.svg", "galleta.svg", "gato.svg", "hamburguesa.svg", "helado.svg", "manzana.svg", "naranja.svg", "nube.svg", "pajaro.svg",
    "pastel.svg", "perro.svg", "pez.svg", "pizza.svg", "platano.svg", "sandia.svg", "sol.svg", "tren.svg"];
// Ruta base para las imágenes del slider
const sliderPath = 'dibujos/';
//para m ostrar el slider
const sliderImg = document.getElementById('slider-img');
//para mostrar los puntos
const puntoDiv = document.getElementById('punto1');
//variables iniciales
let puntos = 0;
let sliderActual = "gato.svg";
let sliderInterval = null;
let tiempoRestante = 60;
const cardImgs = document.querySelectorAll('.card img');
//funcion que muestra una imagen aleatoria del slider guardandolas en la const idx y 
//asignandola a sliderActual para luego compararla con el nombre de la imagen clickeada por el usuario
function showRandomImage() {
    const idx = Math.floor(Math.random() * sliderImages.length);
    sliderActual = sliderImages[idx];
    sliderImg.src = sliderPath + sliderActual;
}

//contador regresivo de 1 min que inicia con click de boton
let intervalo = null;
const tiempoDiv = document.getElementById('tiempo1');
const btnIniciar = document.getElementById('btn-iniciar');
function iniciarContador() {
    //reinicia si ya estaba corriendo
    if (intervalo) clearInterval(intervalo);
    if (sliderInterval) clearInterval(sliderInterval);
    tiempoRestante = 60;
    tiempoDiv.textContent = `Tiempo: ${tiempoRestante}s`;
    puntos = 0;
    puntoDiv.textContent = puntos;
    //mostrar un dibujo nuevo al reiniciar
    showRandomImage();
    //inicia el slider automático cada 5seg
    sliderInterval = setInterval(showRandomImage, 5000);

//**CHATI**//
//evento click para cada imagen de las tarjetas dentro de 1 min, compara el nombre de la imagen con el sliderActual dentro de los 5seg y asigna puntos.
    cardImgs.forEach(img => {
        img.addEventListener('click', function () {
            if (tiempoRestante > 0) {
                const src = img.getAttribute('src');
                let nombre = src.substring(src.lastIndexOf('/') + 1).toLowerCase().trim();
                let actual = sliderActual.toLowerCase().trim();
                if (nombre === actual) {
                    puntos++;
                    puntoDiv.textContent = puntos;
                    img.style.filter = 'drop-shadow(0 0 10px #52c97d)';
                    setTimeout(() => { img.style.filter = ''; }, 400);
                } else {
                    img.style.filter = 'drop-shadow(0 0 10px #ff6b6b)';
                    setTimeout(() => { img.style.filter = ''; }, 400);
                }
            }
        });
    });
    intervalo = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante >= 0) {
            tiempoDiv.textContent = `Tiempo: ${tiempoRestante}s`;
        }
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            clearInterval(sliderInterval);
            tiempoDiv.textContent = "¡Tiempo terminado!";
        }
    }, 1000);
}
btnIniciar.addEventListener('click', iniciarContador);