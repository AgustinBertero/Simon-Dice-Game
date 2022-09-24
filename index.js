let secuenciaMaquina = []; //Para guardar la secuencia de la maquina
let secuenciaUsuario = []; //Para guardar la secuencia del usuario
let ronda = 0; //Empezamos en la ronda 0

document.querySelector('button[type=button]').onclick = comenzarJuego; //Selecciono un boton que tenga un type = button cuando le hago click ejecutra la funcion ComenzarJuego

actualizarEstado('Toca "Empezar" para jugar!'); //Primer estado
actualizarNumeroRonda('-'); //Ronda tiene un guion = Ronda 0
bloquearInputUsuario(); //No dejo a presionar al usuario


function comenzarJuego() {
    reiniciarEstado();
    manejarRonda();
}

function reiniciarEstado(){
    secuenciaMaquina = []; //Reinicia la secuencia de la maquina
    secuenciaUsuario = []; //Reinicio la secuencia del usuario
    ronda = 0; //Vuelvo la ronda a 0
}

function manejarRonda(){
    actualizarEstado('Turno de la Maquina');
    bloquearInputUsuario(); //Evita que el usuario pueda seguir tocando

    const $nuevoCuadro = obtenerCuadroAleatorio(); //Ilumino cuadro aleatorio
    secuenciaMaquina.push($nuevoCuadro);//Agrego el nuevo cuadro a la secuencia de la maquina 

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000; //Tiempo de espera para que juegue el jugador
    //Se multiplica por 1000 porque lo toma setTimeout como segundo parametro son milisegundos

    secuenciaMaquina.forEach(function($cuadro, index) { 
        const RETRASO_MS = (index + 1 ) * 1000; //Retrasa cada cuadro para darle tiempo al jugador de ver el cuadro resaltado
        setTimeout(function() {
            resaltar($cuadro); 
        } , RETRASO_MS);
    });

    setTimeout(function() { 
        actualizarEstado('Turno del jugador');//Aviso al jugador que le toca jugar
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR );

    secuenciaUsuario = []; //En cada ronda resetea la secuencia del usuario para que pueda hacer toda la secuencia de vuelta
    ronda++; //Aumento en 1 la ronda
    actualizarNumeroRonda(ronda); //Actualiza el numero
}
