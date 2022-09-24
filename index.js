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

function manejarInputUsuario(e) { //Esta funcion toma una parametro e (evento). El navegador cada vez que ejecuta un event handler le pasa un evento como parametro a la funcion
    const $cuadro = e.target; //e.target indica a que elemento(cuadro) le hicimos click . Lo guardamos en $cuadro
    resaltar($cuadro); //Resaltamos. Cada vez que el usuario presione un cuadro , tenemos que comparar con la secuencia de la maquina
    secuenciaUsuario.push($cuadro); //agrego 1 a la secuencia del usuario

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]; //Voy comparando el cuadro de la maquina con el que presiono el usuario

    if ($cuadro.id !== $cuadroMaquina.id){ //Comparo con la secuenciaMaquina(en la posicion o indice de la secuencia del usuario -1)
        perder(); //Si el id  del cuadro elegido por el usuario es distinto al de la secuenciaMaquina en la misma posicion ejecuto la funcion perder()
        return;
    }

    if ( secuenciaUsuario.length === secuenciaMaquina.length){ //Si la longitud de la secuencia del usuario es igual a la longitud de la secuencia de la maquina, el usuario le pego a toda la secuencia
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000); //Juega una nueva ronda
    }
}

function obtenerCuadroAleatorio(){
const $cuadros = document.querySelectorAll('.cuadro'); //$cuadros es todo los elementos de clase .cuadro
const indice = Math.floor(Math.random() * $cuadros.length); //Genero un numero aleatorio entre la cantidad de cuadros , para que se ilumine un cuadrado aleatorio. Con math floor redondeo el numerom para abajo
return $cuadros[indice]; //Devuelve el cuadro con un indice aleatorio (del 1 al 4), que me da el proximo color
}

function actualizarNumeroRonda(ronda){ //Agarra el elemento con ID #ronda y le cambia el texto y le pone el numero que le pasamos 
    document.querySelector('#ronda').textContent = ronda;
}

function actualizarEstado(estado,error = false){ //Actualiza el estado del juego y turnos. El segundo parametro por default es falso
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
    if(error){ //Si error es true 
        $estado.classList.remove('alert-primary');  //Estos estilos son de Bootstrap
        $estado.classList.add('alert-danger'); // Agrego esta clase
    } else { // Si no hay error
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
        }
}

function bloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro){ //Agarra cada class cuadro y se ejecuta la funcion, cuando le hagan click al cuadro se ejecuta una funcion vacia  
        $cuadro.onclick = function(){}; //Esta bloqueado el input del usuario cuando es el turno de la maquina, el evento onclick espera una funcion . Le pasamos una vacia para bloquear al usuario
    });
}

function desbloquearInputUsuario(){ //Permite jugar al usuario
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
      $cuadro.onclick = manejarInputUsuario; //Por cada elemento de clase cuadro, cuando le hagan click al cuadro se ejecuta la funcion Manejar input usuario 
    });    
}

function resaltar($cuadro){ //Toma como parametro un elemento $cuadro y le setea la opacidad y 500 ms despues le setea la opacidad a 0.5
    $cuadro.style.opacity = 1; //La opacidad por defecto es 0.5 en css y con una transicion de 0.5 seg
    setTimeout(function() {
        $cuadro.style.opacity = 0.5;
    }, 500); //Le doy 500 ms de transicion
    
}

function perder(){
    bloquearInputUsuario(); //Impido que siga jugando
    reiniciarEstado();
    actualizarEstado('Perdiste! Toca "Empezar" para jugar de nuevo!', true)
}