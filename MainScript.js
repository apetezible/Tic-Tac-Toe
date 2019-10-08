//First Line (((5/42)"Half of a Casilla")+((1/7)"Horizontal Canvas - Playground"))(5/42)

var Turno = false;
var Ct = 0;
var Casilla0 = {Status:"-", Activated:true};
var Casilla1 = {Status:"-", Activated:true};
var Casilla2 = {Status:"-", Activated:true};
var Casilla3 = {Status:"-", Activated:true};
var Casilla4 = {Status:"-", Activated:true};
var Casilla5 = {Status:"-", Activated:true};
var Casilla6 = {Status:"-", Activated:true};
var Casilla7 = {Status:"-", Activated:true};
var Casilla8 = {Status:"-", Activated:true};
var Boton = document.getElementById("DadoGO");
var Boton2 = document.getElementById("Empezar");
Boton2.disabled = false;
Boton.disabled = true;
var Selection = 0;
var GoodChosen = false;
var Retorno1 = "null";
var Stop = false;

var BigArray = new Array(0);

var MentalMap=new Array(0);
MentalMap.push(Casilla0);
MentalMap.push(Casilla1);
MentalMap.push(Casilla2);
MentalMap.push(Casilla3);
MentalMap.push(Casilla4);
MentalMap.push(Casilla5);
MentalMap.push(Casilla6);
MentalMap.push(Casilla7);
MentalMap.push(Casilla8);

var Primero = "No one";

var Click = new Array(2);

var Lienzo = document.getElementById("CanHTML");
var PapelPlano = Lienzo.getContext("2d");
var BackgoundSounds = new Array();
var AudioThing = document.getElementById("SoundEffects");
var BackgroundAlert = document.getElementById("BackgroundAlert");
BackgoundSounds.push(BackgroundAlert);
var JudgeScream = document.getElementById("JudgeScream");
BackgoundSounds.push(JudgeScream);
var Croix = document.getElementById("Croix");
BackgoundSounds.push(Croix);
var Circle = document.getElementById("Circle");
BackgoundSounds.push(Circle);
var Horizontal0 = document.getElementById("h0");
BackgoundSounds.push(Horizontal0);
var Horizontal1 = document.getElementById("h1");
BackgoundSounds.push(Horizontal1);
var Horizontal2 = document.getElementById("h2");
BackgoundSounds.push(Horizontal2);
var Diagonal1 = document.getElementById("d1");
BackgoundSounds.push(Diagonal1);
var Diagonal2 = document.getElementById("d2");
BackgoundSounds.push(Diagonal2);
var Tied = document.getElementById("tied");
BackgoundSounds.push(Tied);

Boton2.addEventListener("click",interface);

var Clicks = 0;

function interface (){
  if(Clicks == 0){
    playSound ();
    setTimeout(notification, 500);
    Clicks = 1;
    Boton2.disabled = true;
    Boton.disabled = false;
  }
}

function notification (){

  alert("///MENSAJE DEL ÁRBITRO///\nPara decidir los turnos, lancen los dados!!!");
}

function playSound (){
  BackgoundSounds[1].play();
}

dados();

function dados() {
  Boton.addEventListener("click", dadoAlAzar);
    class Objetod{
      constructor(Owner, Valor){
        this.Imagen= new Image();
        this.Dueno = Owner;

        this.Imagen.src=caida(Valor);
      }
    }

    function caida(Valor){
      var Diccionario = "Uno.png";
      switch (Valor) {
        case 1:
          Diccionario = "Dos.png";
          break;
        case 2:
          Diccionario = "Tres.png";
          break;
        case 3:
          Diccionario = "Cuatro.png";
          break;
        case 4:
          Diccionario = "Cinco.png";
          break;
        case 5:
          Diccionario = "Seis.png";
          break;
        default:
          alert("FATAL ERROR :(");
      }
      return Diccionario;
    }

    function dadoAlAzar() {

      AudioThing.play();

      Boton.disabled = true;


      var DadoPC = Math.floor(aleatorio(1, 6));
      var DadoUser = Math.floor(aleatorio(1, 6));
      while (DadoPC == DadoUser){
        DadoPC = Math.floor(aleatorio(1, 6));
        DadoUser = Math.floor(aleatorio(1, 6));
      }
      if(DadoPC>DadoUser){
        Primero = "PC";
        Start = true;
        Turno=true;
      }else{
        Primero = "User";
        Start=true;
        Turno=false;
      }
      var ResultadosDados = new Array(2);
      ResultadosDados[0] = DadoPC;
      ResultadosDados[1] = DadoUser;

      var DadosFinales = new Array(2);
      DadosFinales["PC"]= new Objetod("PC", ResultadosDados[0]);
      DadosFinales["Player"]= new Objetod("Player", ResultadosDados[1]);

      var hub = {url:"Yo, tu.png"};
      hub.objeto=new Image();
      hub.objeto.src=hub.url;

      DadosFinales["PC"].Imagen.addEventListener("load", alerta1);
      DadosFinales["Player"].Imagen.addEventListener("load", alerta2);
      hub.objeto.addEventListener("load", alerta3);

      var ImagenDado1Carga=false;
      var ImagenDado2Carga=false;
      var HubCarga = false;

      function alerta3 (){
        HubCarga = true;
        dibujarDados();
      }

      function alerta1 (){
        ImagenDado1Carga=true;
        dibujarDados();
      }

      function alerta2 (){
        ImagenDado2Carga=true;
        dibujarDados();
      }

      function dibujarDados(){
        if (ImagenDado1Carga){
          if(ImagenDado2Carga){
            if(HubCarga){
            PapelPlano.drawImage(DadosFinales["PC"].Imagen,120,30);
            PapelPlano.drawImage(DadosFinales["Player"].Imagen,500,30);
            PapelPlano.drawImage(hub.objeto,0,360);

            if (Primero == "PC") {
              hub.url = "WARNING WINNING.png";
            }else{
              hub.url = "WARNING LOSING.png";
            }
            hub.objeto=new Image();
            hub.objeto.src=hub.url;
            hub.objeto.addEventListener("load", alerta4);

            function alerta4(){
            Boton2.disabled = false;
            Lienzo.addEventListener("click",starter);
          }
            }
          }
        }
      }

      function starter (){
        PapelPlano.drawImage(hub.objeto,150, 120);
        BackgoundSounds[0].play();
        Boton2.addEventListener("click",clean);
        Lienzo.removeEventListener("click", starter);
      }

      function clean (){
        PapelPlano.clearRect(0, 0, Lienzo.width, Lienzo.height);
      playGround ();
      }

      function playGround(){
        drawLine("#f22310", ((5/21)*Lienzo.width)+((1/7)*Lienzo.width), 1, ((5/21)*Lienzo.width)+((1/7)*Lienzo.width), ((5/7)*Lienzo.width), 15, PapelPlano);
        drawLine("#f22310", ((10/21)*Lienzo.width)+((1/7)*Lienzo.width), 1, ((10/21)*Lienzo.width)+((1/7)*Lienzo.width), ((5/7)*Lienzo.width), 15, PapelPlano);
        drawLine("#f22310", ((1/7)*Lienzo.width), ((5/21)*Lienzo.width), ((6/7)*Lienzo.width), ((5/21)*Lienzo.width), 15, PapelPlano);
        drawLine("#f22310", ((1/7)*Lienzo.width), ((10/21)*Lienzo.width), ((6/7)*Lienzo.width), ((10/21)*Lienzo.width), 15, PapelPlano);
        game();
      }

    }

}

function dico (Click){
  var retorno = "null";
  if (((Click[0]>(1/7)*Lienzo.width))&&(Click[0]<((1/7)*Lienzo.width)+((15/21)*Lienzo.width))){
    if (Click[1]<((5/7)*Lienzo.width)){
      if (Click[0]<(((1/7)*Lienzo.width)+((5/21)*Lienzo.width))){
        if (Click[1]<((5/21)*Lienzo.width)){
          if (MentalMap[6].Status == "-"){
            retorno = 6;
          }else{
            retorno = "null";
          }
        }
        if (Click[1]<((10/21)*Lienzo.width)&&(Click[1]>((5/21)*Lienzo.width))){
          if (MentalMap[5].Status == "-"){
            retorno = 5;
          }else{
            retorno = "null";
          }
        }
        if (Click[1]<((15/21)*Lienzo.width)&&(Click[1]>((10/21)*Lienzo.width))){
          if (MentalMap[0].Status == "-"){
            retorno = 0;
          }else{
            retorno = "null";
          }
        }
      }
      if ((Click[0]<((1/7)*Lienzo.width)+((10/21)*Lienzo.width))&&(Click[0]>(((1/7)*Lienzo.width)+((5/21)*Lienzo.width)))){
        if (Click[1]<((5/21)*Lienzo.width)){
          if (MentalMap[7].Status == "-"){
            retorno = 7;
          }else{
            retorno = "null";
          }
        }
        if (Click[1]<((10/21)*Lienzo.width)&&(Click[1]>((5/21)*Lienzo.width))){
          if (MentalMap[4].Status == "-"){
            retorno = 4;
          }else{
            retorno = "null";
          }
        }
        if (Click[1]<((15/21)*Lienzo.width)&&(Click[1]>((10/21)*Lienzo.width))){
          if (MentalMap[1].Status == "-"){
            retorno = 1;
          }else{
            retorno = "null";
          }
        }
      }
      if ((Click[0]<((1/7)*Lienzo.width)+((15/21)*Lienzo.width))&&(Click[0]>((1/7)*Lienzo.width)+((10/21)*Lienzo.width))){
        if (Click[1]<((5/21)*Lienzo.width)){
          if (MentalMap[8].Status == "-"){
            retorno = 8;
          }else{
            retorno = "null";
          }
        }
        if (Click[1]<((10/21)*Lienzo.width)&&(Click[1]>((5/21)*Lienzo.width))){
          if (MentalMap[3].Status == "-"){
            retorno = 3;
          }else{
            retorno = "null";
          }
        }
        if (Click[1]<((15/21)*Lienzo.width)&&(Click[1]>((10/21)*Lienzo.width))){
          if (MentalMap[2].Status == "-"){
            retorno = 2;
          }else{
            retorno = "null";
          }
        }
      }
    }else{
      retorno = "null";
    }
  }else{
    retorno = "null";
  }
  return retorno;
}

function game () {

  while ((Start == true)&&(Stop == false)){

    if (Turno == true){
      if (Primero == "PC"){
          aLittleWatchForX();
          BigArray = aLittleWatchForX();
          bestSelectionForX();
          Stop = true;
          setTimeout(thinkingProcess, 3300);
          function thinkingProcess(){
            drawX(Selection)
            MentalMap[Selection].Activated = false;
            MentalMap[Selection].Status = "X";
            Turno = false;
            Stop = false;
            aLittleWatch();
            if(Start==false){
              gameOver();
            }
            game();
          }
      }else{
          aLittleWatchForO();
          BigArray = aLittleWatchForO();
          bestSelectionForO();
          Stop = true;
          setTimeout(thinkingProcesso, 3300);
          function thinkingProcesso (){
            drawO(Selection)
            MentalMap[Selection].Activated = false;
            MentalMap[Selection].Status = "O";
            Turno = false;
            Stop = false;
            aLittleWatch();
            if(Start==false){
              gameOver();
            }
            game();
          }
      }
    }else{
      if (Primero == "User"){
          Lienzo.addEventListener("click", continuar);
          Stop = true;
          function continuar (click){
            var Waiting = true;
            Click[0]=click.layerX;
            Click[1]=click.layerY;
            Retorno1 = dico (Click);
            if (Retorno1!="null"){
                drawX(Retorno1);
                MentalMap[Retorno1].Activated = false;
                MentalMap[Retorno1].Status = "X";
                Turno = true;
                aLittleWatch();
                Stop = false;
                if(Start==false){
                  gameOver();
                  Stop = true;
                }
                game ();
            }
          }
      }else{
        Lienzo.addEventListener("click", continues);
        Stop = true;
        function continues (click){
          var Waiting = true;
          Click[0] = click.layerX;
          Click[1] = click.layerY;
          Retorno1 = dico (Click);
          if (Retorno1!="null"){
              drawO(Retorno1);
              MentalMap[Retorno1].Activated = false;
              MentalMap[Retorno1].Status = "O";
              Turno = true;
              Stop = false;
              aLittleWatch();
              if(Start==false){
                gameOver();
                Stop = true;
              }
              game ();
          }
        }
      }
    }
  }
}

function gameOver(){
  alert ("Well done, quickly... get to an Upgrade Station");
}

function drawX (Selection){
  switch (Selection) {
    case 0:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width), ((4/105)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width), ((20/105)*Lienzo.width)+((10/21)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width), ((20/105)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width), ((4/105)*Lienzo.width)+((10/21)*Lienzo.width), 30, PapelPlano);
      break;
    case 1:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((4/105)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((10/21)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((4/105)*Lienzo.width)+((10/21)*Lienzo.width), 30, PapelPlano);
      break;
    case 2:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((4/105)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((10/21)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((4/105)*Lienzo.width)+((10/21)*Lienzo.width), 30, PapelPlano);
      break;
    case 3:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((4/105)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((5/21)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((4/105)*Lienzo.width)+((5/21)*Lienzo.width), 30, PapelPlano);
      break;
    case 4:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((4/105)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((5/21)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((4/105)*Lienzo.width)+((5/21)*Lienzo.width), 30, PapelPlano);
      break;
    case 5:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width), ((4/105)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width), ((20/105)*Lienzo.width)+((5/21)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width), ((20/105)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width), ((5/21)*Lienzo.width)+((4/105)*Lienzo.width), 30, PapelPlano);
      break;
    case 6:
      drawLine("#000000", ((5/105)*Lienzo.width)+((1/7)*Lienzo.width), ((5/105)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width), ((20/105)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((5/105)*Lienzo.width)+((1/7)*Lienzo.width), ((20/105)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width), ((5/105)*Lienzo.width), 30, PapelPlano);
      break;
    case 7:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((4/105)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((20/105)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((4/105)*Lienzo.width), 30, PapelPlano);
      break;
    case 8:
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((4/105)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width), 30, PapelPlano);
      drawLine("#000000", ((4/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((20/105)*Lienzo.width), ((20/105)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((4/105)*Lienzo.width), 30, PapelPlano);
      break;
  }
  BackgoundSounds[2].play();
}

function drawO (Selection){
  switch (Selection) {
    case 0:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width), ((5/42)*Lienzo.width)+((10/21)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 1:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((5/42)*Lienzo.width)+((10/21)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 2:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((5/42)*Lienzo.width)+((10/21)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 3:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((5/42)*Lienzo.width)+((5/21)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 4:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((5/42)*Lienzo.width)+((5/21)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 5:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width), ((5/42)*Lienzo.width)+((5/21)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 6:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width), ((5/42)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 7:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width)+((5/21)*Lienzo.width), ((5/42)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
    case 8:
      drawCircle("#ffffff", ((5/42)*Lienzo.width)+((1/7)*Lienzo.width)+((10/21)*Lienzo.width), ((5/42)*Lienzo.width), (((5/42)*Lienzo.width)-((5/105)*Lienzo.width)), PapelPlano);
      break;
  }
  BackgoundSounds[3].play();
}


function bestSelectionForX (){
  var Intermedio = 0;
  if(BigArray[0].length > 0){
    if(BigArray[1].length > 0){
      if(BigArray[2].length > 0){
        Intermedio = aleatorio(0, (BigArray[2].length - 1));
        Selection = BigArray[2][Intermedio];
      }else{
        Intermedio = aleatorio(0, (BigArray[1].length - 1));
        Selection = BigArray[1][Intermedio];
      }
    }else{
    Intermedio = aleatorio(0, (BigArray[0].length - 1));
    Selection = BigArray[0][Intermedio];
    }
  }else{
    alert("Error Fatal (O.o)");
  }
}

function bestSelectionForO (){
  var Intermedio = 0;
  if(BigArray[0].length > 0){
    if(BigArray[1].length > 0){
      if(BigArray[2].length > 0){
        Intermedio = aleatorio(0, (BigArray[2].length - 1));
        Selection = BigArray[2][Intermedio];
      }else{
        Intermedio = aleatorio(0, (BigArray[1].length - 1));
        Selection = BigArray[1][Intermedio];
      }
    }else{
    Intermedio = aleatorio(0, (BigArray[0].length - 1));
    Selection = BigArray[0][Intermedio];
    }
  }else{
    alert("Error Fatal (O.o)");
  }
}

function aLittleWatchForX () {

  var Tic = new Array(0);
  var Tac = new Array(0);
  var Toe = new Array(0);

  for (var i = 0; i < MentalMap.length; i++) {
    if (MentalMap[i].Status == "-"){
      Tic.push(i);
      }
  }
  for (var i = 0; i < MentalMap.length; i++) {
    if (MentalMap[i].Status == "X"){
      switch (i) {
        case 0:
          if (MentalMap[1].Status == "-"){
          	Tac.push(1);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }
           if (MentalMap[4].Status == "-"){
               Tac.push(4);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }
           if (MentalMap[5].Status == "-"){
          	Tac.push(5);
            if (MentalMap[6].Status == "-"){
              Tac.push(6);
            }
           }
          break;
        case 1:
          if (MentalMap[2].Status == "-"){
          	Tac.push(2);
            if (MentalMap[0].Status == "-"){
              Tac.push(0);
            }
          }
          if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[7].Status == "-"){
              Tac.push(7);
            }
           }
          break;
          case 2:
            if (MentalMap[1].Status == "-"){
          	   Tac.push(1);
            if (MentalMap[0].Status == "-"){
              Tac.push(0);
            }
          }
          if (MentalMap[4].Status == "-"){
             Tac.push(4);
             if (MentalMap[6].Status == "-"){
               Tac.push(6);
             }
          }
          if (MentalMap[3].Status == "-"){
            Tac.push(3);
            if (MentalMap[8].Status == "-"){
              Tac.push(8);
            }
          }
          break;
        case 3:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[5].Status == "-"){
              Tac.push(5);
            }
           }

           if (MentalMap[2].Status == "-"){
               Tac.push(2);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }
        break;

        case 4:
        if (MentalMap[1].Status == "-"){
          	Tac.push(1);
            if (MentalMap[7].Status == "-"){
              Tac.push(7);
            }
           }

           if (MentalMap[0].Status == "-"){
               Tac.push(0);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }

          if (MentalMap[2].Status == "-"){
          	Tac.push(2);
            if (MentalMap[6].Status == "-"){
              Tac.push(6);
            }
           }

           if (MentalMap[3].Status == "-"){
          	Tac.push(3);
            if (MentalMap[5].Status == "-"){
              Tac.push(5);
            }
           }

           if (MentalMap[8].Status == "-"){
          	Tac.push(8);
            if (MentalMap[0].Status == "-"){
              Tac.push(0);
            }
           }
           if (MentalMap[7].Status == "-"){
          	Tac.push(7);
            if (MentalMap[1].Status == "-"){
              Tac.push(1);
            }
           }
           if (MentalMap[6].Status == "-"){
          	Tac.push(6);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }
           if (MentalMap[5].Status == "-"){
          	Tac.push(5);
            if (MentalMap[3].Status == "-"){
              Tac.push(3);
            }
           }
        break;

        case 5:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[3].Status == "-"){
              Tac.push(3);
            }
           }

           if (MentalMap[0].Status == "-"){
               Tac.push(0);
               if (MentalMap[6].Status == "-"){
                 Tac.push(6
                 );
               }
           }
        break;

        case 6:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }

           if (MentalMap[7].Status == "-"){
               Tac.push(7);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }

          if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }
           if (MentalMap[5].Status == "-"){
             Tac.push(5);
             if (MentalMap[0].Status == "-"){
               Tac.push(0);
             }
           }
        break;

        case 7:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[1].Status == "-"){
              Tac.push(1);
            }
           }

           if (MentalMap[6].Status == "-"){
               Tac.push(6);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }
        break;

        case 8:
        if (MentalMap[3].Status == "-"){
          	Tac.push(3);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }

           if (MentalMap[4].Status == "-"){
               Tac.push(4);
               if (MentalMap[0].Status == "-"){
                 Tac.push(0);
               }
           }

          if (MentalMap[7].Status == "-"){
          	Tac.push(7);
            if (MentalMap[6].Status == "-"){
              Tac.push(6);
            }
           }
        break;
      }
      }
  }
  for (var i = 0;i<9;i++){
    if (MentalMap[i].Status == "X"){
      switch (i) {
        case 0:
            if((MentalMap[1].Status == "X")&&(MentalMap[2].Status == "-")){
              Toe.push(2);
            }
            if((MentalMap[1].Status == "-")&&(MentalMap[2].Status == "X")){
              Toe.push(1);
            }
            if((MentalMap[5].Status == "X")&&(MentalMap[6].Status == "-")){
              Toe.push(6);
            }
            if((MentalMap[5].Status == "-")&&(MentalMap[6].Status == "X")){
              Toe.push(5);
            }
            if((MentalMap[4].Status == "X")&&(MentalMap[8].Status == "-")){
              Toe.push(8);
            }
            if((MentalMap[4].Status == "-")&&(MentalMap[8].Status == "X")){
              Toe.push(4);
            }
          break;
      case 1:
      if((MentalMap[0].Status == "X")&&(MentalMap[2].Status == "-")){
        Toe.push(2);
      }
      if((MentalMap[0].Status == "-")&&(MentalMap[2].Status == "X")){
        Toe.push(0);
      }
      if((MentalMap[7].Status == "X")&&(MentalMap[4].Status == "-")){
        Toe.push(4);
      }
      if((MentalMap[7].Status == "-")&&(MentalMap[4].Status == "X")){
        Toe.push(7);
      }
      break;
      case 2:
          if((MentalMap[4].Status == "X")&&(MentalMap[6].Status == "-")){
            Toe.push(6);
          }
          if((MentalMap[4].Status == "-")&&(MentalMap[6].Status == "X")){
            Toe.push(6);
          }
          if((MentalMap[1].Status == "X")&&(MentalMap[0].Status == "-")){
            Toe.push(0);
          }
          if((MentalMap[1].Status == "-")&&(MentalMap[0].Status == "X")){
            Toe.push(1);
          }
          if((MentalMap[3].Status == "X")&&(MentalMap[8].Status == "-")){
            Toe.push(8);
          }
          if((MentalMap[3].Status == "-")&&(MentalMap[8].Status == "X")){
            Toe.push(3);
          }
        break;
        case 3:
            if((MentalMap[4].Status == "X")&&(MentalMap[5].Status == "-")){
              Toe.push(5);
            }
            if((MentalMap[4].Status == "-")&&(MentalMap[5].Status == "X")){
              Toe.push(4);
            }
            if((MentalMap[2].Status == "X")&&(MentalMap[8].Status == "-")){
              Toe.push(8);
            }
            if((MentalMap[2].Status == "-")&&(MentalMap[8].Status == "X")){
              Toe.push(2);
            }
          break;
          case 3:
              if((MentalMap[4].Status == "X")&&(MentalMap[5].Status == "-")){
                Toe.push(5);
              }
              if((MentalMap[4].Status == "-")&&(MentalMap[5].Status == "X")){
                Toe.push(4);
              }
              if((MentalMap[2].Status == "X")&&(MentalMap[8].Status == "-")){
                Toe.push(8);
              }
              if((MentalMap[2].Status == "-")&&(MentalMap[8].Status == "X")){
                Toe.push(2);
              }
            break;
          case 4:
                if((MentalMap[0].Status == "X")&&(MentalMap[8].Status == "-")){
                  Toe.push(8);
                }
                if((MentalMap[0].Status == "-")&&(MentalMap[8].Status == "X")){
                  Toe.push(0);
                }
                if((MentalMap[1].Status == "X")&&(MentalMap[7].Status == "-")){
                  Toe.push(7);
                }
                if((MentalMap[1].Status == "-")&&(MentalMap[7].Status == "X")){
                  Toe.push(1);
                }
                if((MentalMap[2].Status == "X")&&(MentalMap[6].Status == "-")){
                  Toe.push(6);
                }
                if((MentalMap[2].Status == "-")&&(MentalMap[6].Status == "X")){
                  Toe.push(2);
                }
                if((MentalMap[5].Status == "X")&&(MentalMap[3].Status == "-")){
                  Toe.push(3);
                }
                if((MentalMap[5].Status == "X")&&(MentalMap[3].Status == "-")){
                  Toe.push(5);
                }
              break;
            case 5:
                  if((MentalMap[0].Status == "X")&&(MentalMap[6].Status == "-")){
                    Toe.push(6);
                  }
                  if((MentalMap[0].Status == "-")&&(MentalMap[6].Status == "X")){
                    Toe.push(0);
                  }
                  if((MentalMap[4].Status == "X")&&(MentalMap[3].Status == "-")){
                    Toe.push(3);
                  }
                  if((MentalMap[4].Status == "-")&&(MentalMap[3].Status == "X")){
                    Toe.push(4);
                  }
                break;
              case 6:
                    if((MentalMap[7].Status == "X")&&(MentalMap[8].Status == "-")){
                        Toe.push(8);
                      }
                      if((MentalMap[7].Status == "-")&&(MentalMap[8].Status == "X")){
                        Toe.push(7);
                      }
                      if((MentalMap[5].Status == "X")&&(MentalMap[0].Status == "-")){
                        Toe.push(0);
                      }
                      if((MentalMap[5].Status == "-")&&(MentalMap[0].Status == "X")){
                        Toe.push(5);
                      }
                      if((MentalMap[4].Status == "X")&&(MentalMap[2].Status == "-")){
                        Toe.push(2);
                      }
                      if((MentalMap[4].Status == "-")&&(MentalMap[2].Status == "X")){
                        Toe.push(4);
                      }
                    break;
              case 7:
                    if((MentalMap[6].Status == "X")&&(MentalMap[8].Status == "-")){
                      Toe.push(8);
                    }
                    if((MentalMap[6].Status == "-")&&(MentalMap[8].Status == "X")){
                      Toe.push(6);
                    }
                    if((MentalMap[4].Status == "X")&&(MentalMap[1].Status == "-")){
                      Toe.push(1);
                    }
                    if((MentalMap[4].Status == "-")&&(MentalMap[1].Status == "X")){
                      Toe.push(4);
                    }
                  break;
                  case 8:
                        if((MentalMap[7].Status == "X")&&(MentalMap[6].Status == "-")){
                          Toe.push(6);
                        }
                        if((MentalMap[7].Status == "-")&&(MentalMap[6].Status == "X")){
                          Toe.push(7);
                        }
                        if((MentalMap[4].Status == "X")&&(MentalMap[0].Status == "-")){
                          Toe.push(0);
                        }
                        if((MentalMap[4].Status == "-")&&(MentalMap[0].Status == "X")){
                          Toe.push(4);
                        }
                        if((MentalMap[3].Status == "X")&&(MentalMap[2].Status == "-")){
                          Toe.push(2);
                        }
                        if((MentalMap[3].Status == "-")&&(MentalMap[2].Status == "X")){
                          Toe.push(3);
                        }
                      break;
      }
    }
  }
  return [Tic, Tac, Toe];
}

function aLittleWatchForO () {

  var Tic = new Array(0);
  var Tac = new Array(0);
  var Toe = new Array(0);

  for (var i = 0; i < MentalMap.length; i++) {
    if (MentalMap[i].Status == "-"){
      Tic.push(i);
      }
  }
  for (var i = 0; i < MentalMap.length; i++) {
    if (MentalMap[i].Status == "O"){
      switch (i) {
        case 0:
          if (MentalMap[1].Status == "-"){
          	Tac.push(1);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }
           if (MentalMap[4].Status == "-"){
               Tac.push(4);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }
           if (MentalMap[5].Status == "-"){
          	Tac.push(5);
            if (MentalMap[6].Status == "-"){
              Tac.push(6);
            }
           }
          break;
        case 1:
          if (MentalMap[2].Status == "-"){
          	Tac.push(2);
            if (MentalMap[0].Status == "-"){
              Tac.push(0);
            }
          }
          if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[7].Status == "-"){
              Tac.push(7);
            }
           }
          break;
          case 2:
            if (MentalMap[1].Status == "-"){
          	   Tac.push(1);
            if (MentalMap[0].Status == "-"){
              Tac.push(0);
            }
          }
          if (MentalMap[4].Status == "-"){
             Tac.push(4);
             if (MentalMap[6].Status == "-"){
               Tac.push(6);
             }
          }
          if (MentalMap[3].Status == "-"){
            Tac.push(3);
            if (MentalMap[8].Status == "-"){
              Tac.push(8);
            }
          }
          break;
        case 3:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[5].Status == "-"){
              Tac.push(5);
            }
           }

           if (MentalMap[2].Status == "-"){
               Tac.push(2);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }
        break;

        case 4:
        if (MentalMap[1].Status == "-"){
          	Tac.push(1);
            if (MentalMap[7].Status == "-"){
              Tac.push(7);
            }
           }

           if (MentalMap[0].Status == "-"){
               Tac.push(0);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }

          if (MentalMap[2].Status == "-"){
          	Tac.push(2);
            if (MentalMap[6].Status == "-"){
              Tac.push(6);
            }
           }

           if (MentalMap[3].Status == "-"){
          	Tac.push(3);
            if (MentalMap[5].Status == "-"){
              Tac.push(5);
            }
           }

           if (MentalMap[8].Status == "-"){
          	Tac.push(8);
            if (MentalMap[0].Status == "-"){
              Tac.push(0);
            }
           }
           if (MentalMap[7].Status == "-"){
          	Tac.push(7);
            if (MentalMap[1].Status == "-"){
              Tac.push(1);
            }
           }
           if (MentalMap[6].Status == "-"){
          	Tac.push(6);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }
           if (MentalMap[5].Status == "-"){
          	Tac.push(5);
            if (MentalMap[3].Status == "-"){
              Tac.push(3);
            }
           }
        break;

        case 5:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[3].Status == "-"){
              Tac.push(3);
            }
           }

           if (MentalMap[0].Status == "-"){
               Tac.push(0);
               if (MentalMap[6].Status == "-"){
                 Tac.push(6
                 );
               }
           }
        break;

        case 6:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }

           if (MentalMap[7].Status == "-"){
               Tac.push(7);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }

          if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }
           if (MentalMap[5].Status == "-"){
             Tac.push(5);
             if (MentalMap[0].Status == "-"){
               Tac.push(0);
             }
           }
        break;

        case 7:
        if (MentalMap[4].Status == "-"){
          	Tac.push(4);
            if (MentalMap[1].Status == "-"){
              Tac.push(1);
            }
           }

           if (MentalMap[6].Status == "-"){
               Tac.push(6);
               if (MentalMap[8].Status == "-"){
                 Tac.push(8);
               }
           }
        break;

        case 8:
        if (MentalMap[3].Status == "-"){
          	Tac.push(3);
            if (MentalMap[2].Status == "-"){
              Tac.push(2);
            }
           }

           if (MentalMap[4].Status == "-"){
               Tac.push(4);
               if (MentalMap[0].Status == "-"){
                 Tac.push(0);
               }
           }

          if (MentalMap[7].Status == "-"){
          	Tac.push(7);
            if (MentalMap[6].Status == "-"){
              Tac.push(6);
            }
           }
        break;
      }
      }
  }
  for (var i = 0;i<9;i++){
    if (MentalMap[i].Status == "O"){
      switch (i) {
        case 0:
            if((MentalMap[1].Status == "O")&&(MentalMap[2].Status == "-")){
              Toe.push(2);
            }
            if((MentalMap[1].Status == "-")&&(MentalMap[2].Status == "O")){
              Toe.push(1);
            }
            if((MentalMap[5].Status == "O")&&(MentalMap[6].Status == "-")){
              Toe.push(6);
            }
            if((MentalMap[5].Status == "-")&&(MentalMap[6].Status == "O")){
              Toe.push(5);
            }
            if((MentalMap[4].Status == "O")&&(MentalMap[8].Status == "-")){
              Toe.push(8);
            }
            if((MentalMap[4].Status == "-")&&(MentalMap[8].Status == "O")){
              Toe.push(4);
            }
          break;
      case 1:
      if((MentalMap[0].Status == "O")&&(MentalMap[2].Status == "-")){
        Toe.push(2);
      }
      if((MentalMap[0].Status == "-")&&(MentalMap[2].Status == "O")){
        Toe.push(0);
      }
      if((MentalMap[7].Status == "O")&&(MentalMap[4].Status == "-")){
        Toe.push(4);
      }
      if((MentalMap[7].Status == "-")&&(MentalMap[4].Status == "O")){
        Toe.push(7);
      }
      break;
      case 2:
          if((MentalMap[4].Status == "O")&&(MentalMap[6].Status == "-")){
            Toe.push(6);
          }
          if((MentalMap[4].Status == "-")&&(MentalMap[6].Status == "O")){
            Toe.push(6);
          }
          if((MentalMap[1].Status == "O")&&(MentalMap[0].Status == "-")){
            Toe.push(0);
          }
          if((MentalMap[1].Status == "-")&&(MentalMap[0].Status == "O")){
            Toe.push(1);
          }
          if((MentalMap[3].Status == "O")&&(MentalMap[8].Status == "-")){
            Toe.push(8);
          }
          if((MentalMap[3].Status == "-")&&(MentalMap[8].Status == "O")){
            Toe.push(3);
          }
        break;
        case 3:
            if((MentalMap[4].Status == "O")&&(MentalMap[5].Status == "-")){
              Toe.push(5);
            }
            if((MentalMap[4].Status == "-")&&(MentalMap[5].Status == "O")){
              Toe.push(4);
            }
            if((MentalMap[2].Status == "O")&&(MentalMap[8].Status == "-")){
              Toe.push(8);
            }
            if((MentalMap[2].Status == "-")&&(MentalMap[8].Status == "O")){
              Toe.push(2);
            }
          break;
          case 3:
              if((MentalMap[4].Status == "O")&&(MentalMap[5].Status == "-")){
                Toe.push(5);
              }
              if((MentalMap[4].Status == "-")&&(MentalMap[5].Status == "O")){
                Toe.push(4);
              }
              if((MentalMap[2].Status == "O")&&(MentalMap[8].Status == "-")){
                Toe.push(8);
              }
              if((MentalMap[2].Status == "-")&&(MentalMap[8].Status == "O")){
                Toe.push(2);
              }
            break;
          case 4:
                if((MentalMap[0].Status == "O")&&(MentalMap[8].Status == "-")){
                  Toe.push(8);
                }
                if((MentalMap[0].Status == "-")&&(MentalMap[8].Status == "O")){
                  Toe.push(0);
                }
                if((MentalMap[1].Status == "O")&&(MentalMap[7].Status == "-")){
                  Toe.push(7);
                }
                if((MentalMap[1].Status == "-")&&(MentalMap[7].Status == "O")){
                  Toe.push(1);
                }
                if((MentalMap[2].Status == "O")&&(MentalMap[6].Status == "-")){
                  Toe.push(6);
                }
                if((MentalMap[2].Status == "-")&&(MentalMap[6].Status == "O")){
                  Toe.push(2);
                }
                if((MentalMap[5].Status == "O")&&(MentalMap[3].Status == "-")){
                  Toe.push(3);
                }
                if((MentalMap[5].Status == "O")&&(MentalMap[3].Status == "-")){
                  Toe.push(5);
                }
              break;
            case 5:
                  if((MentalMap[0].Status == "O")&&(MentalMap[6].Status == "-")){
                    Toe.push(6);
                  }
                  if((MentalMap[0].Status == "-")&&(MentalMap[6].Status == "O")){
                    Toe.push(0);
                  }
                  if((MentalMap[4].Status == "O")&&(MentalMap[3].Status == "-")){
                    Toe.push(3);
                  }
                  if((MentalMap[4].Status == "-")&&(MentalMap[3].Status == "O")){
                    Toe.push(4);
                  }
                break;
              case 6:
                    if((MentalMap[7].Status == "O")&&(MentalMap[8].Status == "-")){
                        Toe.push(8);
                      }
                      if((MentalMap[7].Status == "-")&&(MentalMap[8].Status == "O")){
                        Toe.push(7);
                      }
                      if((MentalMap[5].Status == "O")&&(MentalMap[0].Status == "-")){
                        Toe.push(0);
                      }
                      if((MentalMap[5].Status == "-")&&(MentalMap[0].Status == "O")){
                        Toe.push(5);
                      }
                      if((MentalMap[4].Status == "O")&&(MentalMap[2].Status == "-")){
                        Toe.push(2);
                      }
                      if((MentalMap[4].Status == "-")&&(MentalMap[2].Status == "O")){
                        Toe.push(4);
                      }
                    break;
              case 7:
                    if((MentalMap[6].Status == "O")&&(MentalMap[8].Status == "-")){
                      Toe.push(8);
                    }
                    if((MentalMap[6].Status == "-")&&(MentalMap[8].Status == "O")){
                      Toe.push(6);
                    }
                    if((MentalMap[4].Status == "O")&&(MentalMap[1].Status == "-")){
                      Toe.push(1);
                    }
                    if((MentalMap[4].Status == "-")&&(MentalMap[1].Status == "O")){
                      Toe.push(4);
                    }
                  break;
                  case 8:
                        if((MentalMap[7].Status == "O")&&(MentalMap[6].Status == "-")){
                          Toe.push(6);
                        }
                        if((MentalMap[7].Status == "-")&&(MentalMap[6].Status == "O")){
                          Toe.push(7);
                        }
                        if((MentalMap[4].Status == "O")&&(MentalMap[0].Status == "-")){
                          Toe.push(0);
                        }
                        if((MentalMap[4].Status == "-")&&(MentalMap[0].Status == "O")){
                          Toe.push(4);
                        }
                        if((MentalMap[3].Status == "O")&&(MentalMap[2].Status == "-")){
                          Toe.push(2);
                        }
                        if((MentalMap[3].Status == "-")&&(MentalMap[2].Status == "O")){
                          Toe.push(3);
                        }
                      break;
      }
    }
  }
  return [Tic, Tac, Toe];
}

function aLittleWatch (){

    for (var i = 0;i<9;i++){
      if (MentalMap[i].Status == "O"){
        switch (i) {
          case 0:
              if((MentalMap[1].Status == "O")&&(MentalMap[2].Status == "O")){
                animation("h0");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[5].Status == "O")&&(MentalMap[6].Status == "O")){
                animation("v0");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[8].Status == "O")){
                animation("d1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
            break;
          case 1:
              if((MentalMap[0].Status == "O")&&(MentalMap[2].Status == "O")){
                animation("h0");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[7].Status == "O")&&(MentalMap[4].Status == "O")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              break;
          case 2:
            if((MentalMap[4].Status == "O")&&(MentalMap[6].Status == "O")){
              animation("d2");
              Stop = true;
              Start = false;
              judgeDesition("O");
            }
            if((MentalMap[1].Status == "O")&&(MentalMap[0].Status == "O")){
              animation("h0");
              Stop = true;
              Start = false;
              judgeDesition("O");
            }
            if((MentalMap[3].Status == "O")&&(MentalMap[8].Status == "O")){
              animation("v2");
              Stop = true;
              Start = false;
              judgeDesition("O");
            }
            break;
          case 3:
              if((MentalMap[4].Status == "O")&&(MentalMap[5].Status == "O")){
                animation("h1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[2].Status == "O")&&(MentalMap[8].Status == "-")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
            break;
          case 4:
              if((MentalMap[0].Status == "O")&&(MentalMap[8].Status == "O")){
                animation("d1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[1].Status == "O")&&(MentalMap[7].Status == "O")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[2].Status == "O")&&(MentalMap[6].Status == "O")){
                animation("d2");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[5].Status == "O")&&(MentalMap[3].Status == "O")){
                animation("h1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              break;
            case 5:
              if((MentalMap[0].Status == "O")&&(MentalMap[6].Status == "O")){
                animation("v0");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[3].Status == "O")){
                animation("h1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              break;
            case 6:
              if((MentalMap[7].Status == "O")&&(MentalMap[8].Status == "O")){
                animation("h2");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[5].Status == "O")&&(MentalMap[0].Status == "O")){
                animation("v0");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[2].Status == "O")){
                animation("d2");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              break;
            case 7:
              if((MentalMap[6].Status == "O")&&(MentalMap[8].Status == "O")){
                animation("h2");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[1].Status == "O")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              break;
            case 8:
              if((MentalMap[7].Status == "O")&&(MentalMap[6].Status == "O")){
                animation("v2");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[0].Status == "O")){
                animation("d1");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              if((MentalMap[3].Status == "O")&&(MentalMap[2].Status == "O")){
                animation("v2");
                Stop = true;
                Start = false;
                judgeDesition("O");
              }
              break;
        }
      }
      if (MentalMap[i].Status == "X"){
        switch (i) {
          case 0:
              if((MentalMap[1].Status == "X")&&(MentalMap[2].Status == "X")){
                animation("h0");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[5].Status == "X")&&(MentalMap[6].Status == "X")){
                animation("v0");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[8].Status == "X")){
                animation("d1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
            break;
          case 1:
              if((MentalMap[0].Status == "X")&&(MentalMap[2].Status == "X")){
                animation("h0");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[7].Status == "X")&&(MentalMap[4].Status == "X")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              break;
          case 2:
            if((MentalMap[4].Status == "X")&&(MentalMap[6].Status == "X")){
              animation("d2");
              Stop = true;
              Start = false;
              judgeDesition("X");
            }
            if((MentalMap[1].Status == "X")&&(MentalMap[0].Status == "X")){
              animation("h0");
              Stop = true;
              Start = false;
              judgeDesition("X");
            }
            if((MentalMap[3].Status == "X")&&(MentalMap[8].Status == "X")){
              animation("v2");
              Stop = true;
              Start = false;
              judgeDesition("X");
            }
            break;
          case 3:
              if((MentalMap[4].Status == "X")&&(MentalMap[5].Status == "X")){
                animation("h1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[2].Status == "X")&&(MentalMap[8].Status == "-")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
            break;
          case 4:
              if((MentalMap[0].Status == "X")&&(MentalMap[8].Status == "X")){
                animation("d1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[1].Status == "X")&&(MentalMap[7].Status == "X")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[2].Status == "X")&&(MentalMap[6].Status == "X")){
                animation("d2");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[5].Status == "X")&&(MentalMap[3].Status == "X")){
                animation("h1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              break;
            case 5:
              if((MentalMap[0].Status == "X")&&(MentalMap[6].Status == "X")){
                animation("v0");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[3].Status == "X")){
                animation("h1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              break;
            case 6:
              if((MentalMap[7].Status == "X")&&(MentalMap[8].Status == "X")){
                animation("h2");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[5].Status == "X")&&(MentalMap[0].Status == "X")){
                animation("v0");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[2].Status == "X")){
                animation("d2");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              break;
            case 7:
              if((MentalMap[6].Status == "X")&&(MentalMap[8].Status == "X")){
                animation("h2");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[1].Status == "X")){
                animation("v1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              break;
            case 8:
              if((MentalMap[7].Status == "X")&&(MentalMap[6].Status == "X")){
                animation("v2");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[0].Status == "X")){
                animation("d1");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              if((MentalMap[3].Status == "X")&&(MentalMap[2].Status == "X")){
                animation("v2");
                Stop = true;
                Start = false;
                judgeDesition("X");
              }
              break;
        }
      }
    }
}

function animation(Orientation){
  switch (Orientation) {
    case "h0":
      animate(0, (((1/7)*Lienzo.width)+((10/294)*Lienzo.width)), ((2/21)*Lienzo.width));
      BackgoundSounds[4].play();
      break;
    case "h1":
      break;
    case "h2":
      break;
    case "v0":
      break;
    case "v1":
      break;
    case "v2":
      break;
    case "d1":
      break;
    case "d2":
      break;
    default:

  }

}

//Dado Aleatorio

function aleatorio(Max, Min){
  var Resultado;
  Resultado = Math.floor (Math.random()*(Max - Min + 1)) + Min;
  return Resultado;
}

function drawRotated(PapelPlano, image){
  PapelPlano.save();

  var x = PapelPlano.width / 2;
  var y = PapelPlano.height / 2;
  var width = image.objeto.width;
  var height = image.objeto.height;
  PapelPlano.translate(x, y);
  PapelPlano.rotate(1.5708);
  PapelPlano.drawImage(image.objeto, -width / 2, -height / 2, width, height);
  PapelPlano.rotate(-1.5708);
  PapelPlano.translate(-x, -y);

  PapelPlano.restore();
}

function builder(Source){
  var PhotonsCollection = new Image ();
  PhotonsCollection.src = Source;
  return PhotonsCollection;
}

var MarkingALine = [];

MarkingALine.push(builder("anims/MarkingALine/frame_00_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_01_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_02_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_03_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_04_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_05_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_06_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_07_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_08_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_09_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_10_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_11_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_12_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_13_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_14_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_15_delay-0.04s.png"));
MarkingALine.push(builder("anims/MarkingALine/frame_16_delay-4.33s.png"));

var LoadedFrames = 0;
var Strike = 0;
while (Strike < 17){
  MarkingALine[Strike].addEventListener("load", loader);
  Strike ++;
}


var Animations = [];
Animations.push(MarkingALine);

function loader(){
  LoadedFrames = LoadedFrames+1;
}

function animate (Code, X, Y){
  while(LoadedFrames != Animations[Code].length){
  console.log(".");
  console.log("..");
  console.log("...");
  console.log("....");
  console.log(".....");
  console.log("....");
  console.log("...");
  console.log("..");
  console.log(".");
  }

  Counter = 0;

  framing(Code, X, Y);

  function framing(Code, X, Y){
    var TimeInterval = setInterval(function picturing(){
          PapelPlano.drawImage(Animations[Code][Counter], X, Y);
          Counter++;
          if(Counter>=Animations[0].length){
            clearInterval(TimeInterval);
          }
        }, 40);
  }
}


function drawLine (Color, X0, Y0, Xf, Yf,Lwidth, Lienzo){
  Lienzo.beginPath();
  Lienzo.strokeStyle = Color;
  Lienzo.moveTo(X0, Y0);
  Lienzo.lineTo(Xf,Yf);
  Lienzo.lineWidth = Lwidth;
  Lienzo.stroke();
  Lienzo.closePath();
}

function drawCircle (Color, CenterX, CenterY, Radio, Lienzo){
Lienzo.beginPath();
Lienzo.strokeStyle = Color;
Lienzo.arc(CenterX, CenterY, Radio, 0, 2 * Math.PI);
Lienzo.lineWidth = 30;
Lienzo.stroke();
}
