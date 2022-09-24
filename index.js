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

