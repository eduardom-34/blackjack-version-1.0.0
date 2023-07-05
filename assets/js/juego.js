

/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

//Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

let puntosJugador = 0,
    puntosComputadora = 0;

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//Como utilizamos el querySelectorAll, esto devuelve un array con todos los smalls
//en este caso devuelve un array de 2
const puntosHTML = document.querySelectorAll('small');


// Esta funcion crea un nuevo deck(baraja)
const crearDeck = () => {

    // Lo que hace este codigo,  es que por cada 2 se le agrega la C, es decir 2C, 
    // luego se tiene que hacer para cada tipo de cartas, por eso hace 2D, 2H...., cuando termina 
    // cada tipo de cartas el i vuelve arriba y se aument en 1, 
    // entonces va con 3C, 3D... y asi sucecivamente, hasta que i = 10, y ya haya pasado por cada tipo de carta
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    // que hace lo mismo, por cada tipo de cartas, se le agregara la letra de especiales, ya no los numeros,
    // entonces quedaroa AC, JC, QC, cuando 'C' pase por cada espcial, entonces seguira con el que sigue, es decir
    // con D, entonces va con DA, DJ... y asi sucesivamente, hasta que cada tipo pase por cada especial de los especiales
    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    //Aca mostramos el deck o la baraja, pero esta ordenada
    // Como se revuelve...
    // console.log( deck );, Esta linea esta comentada porque no nos interesa el deck ordenado
    // Instale un cdn de una libreria llamada underscore
    //Esta instalada en el index.html
    //esto con el fin de usar shuffle y revolver el array deck(baraja)
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;

}

//Aca mostramos el deck, es decir la baraja, pero esta ordenada, 
// tenemos que desordenarla para barajearla
crearDeck();


//Esta funcion me permite tomar una carta

const pedirCarta = () => {

    //Medida de seguridad, si el deck se queda vacio, ya no deberiamos seguir
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
        // despues del throw, ya no se ejecuta mas codigo
    }

    //Tenemos que sacar una carta del deck, y luego eliminarla y devolverla
    //El metodo .pop de arreglos, nos permite sacar el ultimo elemento
    // y nos devuelve el arreglo sin el elemento eliminado
    const carta = deck.pop(); //aca se elimina una carta, y la carta eliminada se guarda en 'carta'

    return carta;
}


// pedirCarta();

// Necesitamos saber cuanto vale la carta que pedimos



const valorCarta = (carta) => {

    //Necesitamos extraer el valor de la carta, como por nombre tienen el valor al inicio
    // ejemplo: 2D vale 2, podemos extraer el 2 facilmente, pero que tal si es 
    // 10D?, es mejor extraer la letra, es decir de la posicion 0, hasta donde llegue, omitiendo
    // el ultimo valor, que en este caso seria la letra D
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? //si valor es una letra
        (valor === 'A') ? 11 : 10 //entonces si es A vale 11, sino vale 10
        : valor * 1; //si es un numero, multiplicamos por 1, para que tena formato numero no de string
}


//Turno de la computadora y se despira en dos ocaciones, cuandoe el jugador pierdes >21, o cuando 
//presione el boton detener

const turnoComputadora = (puntoMinimos) => {

    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntoMinimos > 21) {
            break;
        }


    } while ((puntosComputadora < puntoMinimos) && (puntoMinimos <= 21));


    //Aca se muestra el mensaje de quien gano o perdio o si nadie gana

    setTimeout(() => {

        if (puntosComputadora === puntoMinimos) {
            alert('Nadie gana :( ')
        } else if (puntoMinimos > 21) {
            alert('Computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('Computadora gana');
        }

    }, 10);

}





//Eventos, tenemos que escuchar cuando se da click al boton "pedir carta"

//Aca se añade el evento listener, toma dos argumentos, el primero es la accion
// a la que escucha, en este caso es al click, la segunda es una funcion que es la 
//accion que se ejecutara al hacer el evento que asignamos, en este caso click
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta(); // Esti quiere decir que tomara un carta del deck

    //Aca se le asigna los puntos al jugador, comienza en 0, y luego
    //se le suma los puntos de acuerdo al valor de la cara que se saco
    puntosJugador = puntosJugador + valorCarta(carta);

    //Del array de los smalls, en la posicion 1 se agrega el texto, en este caso
    //cada vez que se haga click se agrega los puntos del jugador
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2C.png"></img>

    const imgCarta = document.createElement('img'); // se crea el tag img, pero aun sin imagen
    imgCarta.src = `assets/cartas/${carta}.png`; //aca se pone el path de la imagen, y al path se le da el valor de la carta para que triga la carta correcta
    //hemos creado la carta y se popula cada vez que damos click, pero sale grande
    //porque aun no asignamos una class, entonces hay que hacerlo
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) { //Tenemos que bloquear el bton si se pasa de 21
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true; //aca se bloquea
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) { // si sca 21 se bloquea tambien, pero aun no gana, tiene que esperar a ver cuanto sca la compu
        console.warn('21 Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});


//Boton detener
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true; //si presionamos detener, el boton pedir se tiene que deshabilitar para que no podamos seguir pedidiendo
    btnDetener.disabled = true; //se deshabilita porque sino la computadora siempre sacaria una carta mas si apretamos el boton detner

    turnoComputadora(puntosJugador);
});

//Boton nuevo Juevo

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});











