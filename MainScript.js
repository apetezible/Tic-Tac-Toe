var Winner = "No one";
var Waiting = true;
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
var Ended = false;

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
var YourTeamWon = document.getElementById("your_team_won");
BackgoundSounds.push(YourTeamWon);
var YourTeamLost = document.getElementById("your_team_lost");
BackgoundSounds.push(YourTeamLost);

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
        Boton2.disabled = true;
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
          if(Stop == false){
            setTimeout(thinkingProcess, 3300);
            Stop = true;
          }
          if(Start==false){
            gameOver();
          }
          function thinkingProcess(){
            drawX(Selection)
            MentalMap[Selection].Activated = false;
            MentalMap[Selection].Status = "X";
            Turno = false;
            Stop = false;
            aLittleWatch();
            game();
          }
      }else{
          aLittleWatchForO();
          BigArray = aLittleWatchForO();
          bestSelectionForO();
          if (Stop == false){
            setTimeout(thinkingProcesso, 3300);
            Stop = true;
          }
          if(Start==false){
            gameOver();
          }
          function thinkingProcesso (){
            drawO(Selection)
            MentalMap[Selection].Activated = false;
            MentalMap[Selection].Status = "O";
            Turno = false;
            Stop = false;
            aLittleWatch();
            game();
          }
      }
    }else{
      if (Primero == "User"){
          Lienzo.addEventListener("click", continuar);
          Stop = true;
          function continuar (click){
            Stop = true;
            Click[0]=click.layerX;
            Click[1]=click.layerY;
            Retorno1 = dico (Click);
            if (Retorno1!="null"){
                Lienzo.removeEventListener("click", continuar);
                drawX(Retorno1);
                MentalMap[Retorno1].Activated = false;
                MentalMap[Retorno1].Status = "X";
                Turno = true;
                Stop = false;
                if(Ended != true){
                  aLittleWatch();
                  Stop = false;
                  game ();
                }
                if(Start==false){
                  gameOver();
                  Stop = true;
                }
            }
          }
      }else{
        Lienzo.addEventListener("click", continues);
        Stop = true;
        function continues (click){
          Click[0] = click.layerX;
          Click[1] = click.layerY;
          Retorno1 = dico (Click);
          if (Retorno1!="null"){
              Lienzo.removeEventListener("click", continues);
              drawO(Retorno1);
              MentalMap[Retorno1].Activated = false;
              MentalMap[Retorno1].Status = "O";
              Turno = true;
              if(Ended != true){
                aLittleWatch();
                Stop = false;
                game ();
              }
              if(Start==false){
                gameOver();
                Stop = true;
              }
          }
        }
      }
    }
  }
}

function gameOver(){
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
                Winner = "O";
                animation("h2");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[5].Status == "O")&&(MentalMap[6].Status == "O")){
                Winner = "O";
                animation("v0");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[8].Status == "O")){
                Winner = "O";
                animation("d1");
                Ended = true;
                Start = false;
                i = 9;
              }
            break;
          case 1:
              if((MentalMap[0].Status == "O")&&(MentalMap[2].Status == "O")){
                Winner = "O";
                animation("h2");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[7].Status == "O")&&(MentalMap[4].Status == "O")){
                Winner = "O";
                animation("v1");
                Ended = true;
                Start = false;
                i = 9;
              }
              break;
          case 2:
            if((MentalMap[4].Status == "O")&&(MentalMap[6].Status == "O")){
              Winner = "O";
              animation("d2");
              Ended = true;
              Start = false;
              i = 9;
            }
            if((MentalMap[1].Status == "O")&&(MentalMap[0].Status == "O")){
              Winner = "O";
              animation("h2");
              Ended = true;
              Start = false;
              i = 9;
            }
            if((MentalMap[3].Status == "O")&&(MentalMap[8].Status == "O")){
              Winner = "O";
              animation("v2");
              Ended = true;
              Start = false;
              i = 9;
            }
            break;
          case 3:
              if((MentalMap[4].Status == "O")&&(MentalMap[5].Status == "O")){
                Winner = "O";
                animation("h1");
                Ended= true;
                Start = false;
                i = 9;
              }
              if((MentalMap[2].Status == "O")&&(MentalMap[8].Status == "-")){
                Winner = "O";
                animation("v2");
                Ended = true;
                Start = false;
                i = 9;
              }
            break;
          case 4:
              if((MentalMap[0].Status == "O")&&(MentalMap[8].Status == "O")){
                Winner = "O";
                animation("d1");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[1].Status == "O")&&(MentalMap[7].Status == "O")){
                Winner = "O";
                animation("v1");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[2].Status == "O")&&(MentalMap[6].Status == "O")){
                Winner = "O";
                animation("d2");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[5].Status == "O")&&(MentalMap[3].Status == "O")){
                Winner = "O";
                animation("h1");
                Ended = true;
                Start = false;
                i = 9;
              }
              break;
            case 5:
              if((MentalMap[0].Status == "O")&&(MentalMap[6].Status == "O")){
                Winner = "O";
                animation("v0");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[3].Status == "O")){
                Winner = "O";
                animation("h1");
                Ended = true;
                Start = false;
                i = 9;
              }
              break;
            case 6:
              if((MentalMap[7].Status == "O")&&(MentalMap[8].Status == "O")){
                Winner = "O";
                animation("h0");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[5].Status == "O")&&(MentalMap[0].Status == "O")){
                Winner = "O";
                animation("v0");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[2].Status == "O")){
                Winner = "O";
                animation("d2");
                Ended = true;
                Start = false;
                i = 9;
              }
              break;
            case 7:
              if((MentalMap[6].Status == "O")&&(MentalMap[8].Status == "O")){
                Winner = "O";
                animation("h0");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[1].Status == "O")){
                Winner = "O";
                animation("v1");
                Ended = true;
                Start = false;
                i = 9;
              }
              break;
            case 8:
              if((MentalMap[7].Status == "O")&&(MentalMap[6].Status == "O")){
                Winner = "O";
                animation("h2");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[4].Status == "O")&&(MentalMap[0].Status == "O")){
                Winner = "O";
                animation("d1");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[3].Status == "O")&&(MentalMap[2].Status == "O")){
                Winner = "O";
                animation("v2");
                Ended = true;
                Start = false;
                i = 9;
              }
              break;
        }
      }
      if (MentalMap[i].Status == "X"){
        switch (i) {
          case 0:
              if((MentalMap[1].Status == "X")&&(MentalMap[2].Status == "X")){
                Winner = "X";
                animation("h0");
                Ended = true;
                Start = false;
                i = 9;
              }
              if((MentalMap[5].Status == "X")&&(MentalMap[6].Status == "X")){
                Winner = "X";
                animation("v0");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[8].Status == "X")){
                Winner = "X";
                animation("d2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
            break;
          case 1:
              if((MentalMap[0].Status == "X")&&(MentalMap[2].Status == "X")){
                Winner = "X";
                animation("h0");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[7].Status == "X")&&(MentalMap[4].Status == "X")){
                Winner = "X";
                animation("v1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              break;
          case 2:
            if((MentalMap[4].Status == "X")&&(MentalMap[6].Status == "X")){
              Winner = "X";
              animation("d1");
              Ended = true;
              Start = false;
              Winner = "X";
              i = 9;
            }
            if((MentalMap[1].Status == "X")&&(MentalMap[0].Status == "X")){
              Winner = "X";
              animation("h0");
              Ended = true;
              Start = false;
              Winner = "X";
              i = 9;
            }
            if((MentalMap[3].Status == "X")&&(MentalMap[8].Status == "X")){
              Winner = "X";
              animation("v2");
              Ended = true;
              Start = false;
              Winner = "X";
              i = 9;
            }
            break;
          case 3:
              if((MentalMap[4].Status == "X")&&(MentalMap[5].Status == "X")){
                Winner = "X";
                animation("h1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[2].Status == "X")&&(MentalMap[8].Status == "-")){
                Winner = "X";
                animation("v2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
            break;
          case 4:
              if((MentalMap[0].Status == "X")&&(MentalMap[8].Status == "X")){
                Winner = "X";
                animation("d2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[1].Status == "X")&&(MentalMap[7].Status == "X")){
                Winner = "X";
                animation("v1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[2].Status == "X")&&(MentalMap[6].Status == "X")){
                Winner = "X";
                animation("d1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[5].Status == "X")&&(MentalMap[3].Status == "X")){
                Winner = "X";
                animation("h1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              break;
            case 5:
              if((MentalMap[0].Status == "X")&&(MentalMap[6].Status == "X")){
                Winner = "X";
                animation("v0");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[3].Status == "X")){
                Winner = "X";
                animation("h1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              break;
            case 6:
              if((MentalMap[7].Status == "X")&&(MentalMap[8].Status == "X")){
                Winner = "X";
                animation("h2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[5].Status == "X")&&(MentalMap[0].Status == "X")){
                Winner = "X";
                animation("v0");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[2].Status == "X")){
                Winner = "X";
                animation("d1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              break;
            case 7:
              if((MentalMap[6].Status == "X")&&(MentalMap[8].Status == "X")){
                Winner = "X";
                animation("h2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[1].Status == "X")){
                Winner = "X";
                animation("v1");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              break;
            case 8:
              if((MentalMap[7].Status == "X")&&(MentalMap[6].Status == "X")){
                Winner = "X";
                animation("v2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[4].Status == "X")&&(MentalMap[0].Status == "X")){
                Winner = "X";
                animation("d2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              if((MentalMap[3].Status == "X")&&(MentalMap[2].Status == "X")){
                Winner = "X";
                animation("v2");
                Ended = true;
                Start = false;
                Winner = "X";
                i = 9;
              }
              break;
        }
      }
    }
}

function animation(Orientation){
  switch (Orientation) {
    case "h0":
      animate(0, (((1/7)*Lienzo.width)+((10/294)*Lienzo.width)), ((2/21)*Lienzo.width), 24);
      BackgoundSounds[4].play();
      break;
    case "h1":
      animate(0, (((1/7)*Lienzo.width)+((10/294)*Lienzo.width)-5), (((2/21)*Lienzo.width)+((10/42)*Lienzo.width))-4, 24);
      BackgoundSounds[5].play();
      break;
    case "h2":
      animate(0, (((1/7)*Lienzo.width)+((10/294)*Lienzo.width))-11, (((2/21)*Lienzo.width)+((20/42)*Lienzo.width)), 24);
      BackgoundSounds[6].play();
      break;
    case "v0":
      animate(1, (((1/7)*Lienzo.width)+((2/21)*Lienzo.width))-5, ((10/294)*Lienzo.width), 24);
      BackgoundSounds[4].play();
      break;
    case "v1":
      animate(1, (((1/7)*Lienzo.width)+((2/21)*Lienzo.width))+((10/42)*Lienzo.width)-5, ((10/294)*Lienzo.width)-5, 24);
      BackgoundSounds[5].play();
      break;
    case "v2":
      animate(1, (((1/7)*Lienzo.width)+((2/21)*Lienzo.width))+((20/42)*Lienzo.width), ((10/294)*Lienzo.width), 24);
      BackgoundSounds[6].play();
      break;
    case "d1":
      animate(2, ((1/7)*Lienzo.width)+((5/42)*Lienzo.width), ((5/42)*Lienzo.width), 24);
      BackgoundSounds[7].play();
      break;
    case "d2":
      animate(3, ((1/7)*Lienzo.width)+((5/42)*Lienzo.width)-25-17, ((5/42)*Lienzo.width), 24);
      BackgoundSounds[8].play();
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

var MarkingAVerticalLine = [];

MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_00_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_01_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_02_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_03_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_04_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_05_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_06_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_07_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_08_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_09_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_10_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_11_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_12_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_13_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_14_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_15_delay-0.04s.png"));
MarkingAVerticalLine.push(builder("anims/MarkingAVerticalLine/frame_16_delay-4.33s.png"));

var LoadedHorizontalFrames = 0;
var HorizontalStrike = 0;
while (HorizontalStrike < 17){
  MarkingALine[HorizontalStrike].addEventListener("load", loader);
  HorizontalStrike ++;
}

var LoadedVerticalFrames = 0;
var VerticalStrike = 0;
while (VerticalStrike < 17){
  MarkingAVerticalLine[VerticalStrike].addEventListener("load", vLoader);
  VerticalStrike ++;
}

var MarkingADiagonalLineLeft = [];

MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_00_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_01_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_02_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_03_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_04_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_05_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_06_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_07_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_08_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_09_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_10_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_11_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_12_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_13_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_14_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_15_delay-0.04s.png"));
MarkingADiagonalLineLeft.push(builder("anims/MarkingADiagonalLineLeft/frame_16_delay-4.33s.png"));

var LoadedDiagonalLeftFrames = 0;
var DiagonalLeftStrike = 0;
while (DiagonalLeftStrike < 17){
  MarkingADiagonalLineLeft[DiagonalLeftStrike].addEventListener("load", dLLoader);
  DiagonalLeftStrike ++;
}

var MarkingADiagonalLineRight = [];

MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_00_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_01_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_02_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_03_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_04_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_05_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_06_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_07_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_08_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_09_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_10_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_11_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_12_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_13_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_14_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_15_delay-0.04s.png"));
MarkingADiagonalLineRight.push(builder("anims/MarkingADiagonalLineRight/frame_16_delay-4.33s.png"));

var LoadedDiagonalRightFrames = 0;
var DiagonalRightStrike = 0;
while (DiagonalRightStrike < 17){
  MarkingADiagonalLineRight[DiagonalRightStrike].addEventListener("load", dRLoader);
  DiagonalRightStrike ++;
}

var Victory = [];

Victory.push(builder("anims/Victory/Victory0000.png"));
Victory.push(builder("anims/Victory/Victory0001.png"));
Victory.push(builder("anims/Victory/Victory0002.png"));
Victory.push(builder("anims/Victory/Victory0003.png"));
Victory.push(builder("anims/Victory/Victory0004.png"));
Victory.push(builder("anims/Victory/Victory0005.png"));
Victory.push(builder("anims/Victory/Victory0006.png"));
Victory.push(builder("anims/Victory/Victory0007.png"));
Victory.push(builder("anims/Victory/Victory0008.png"));
Victory.push(builder("anims/Victory/Victory0009.png"));
Victory.push(builder("anims/Victory/Victory0010.png"));
Victory.push(builder("anims/Victory/Victory0011.png"));
Victory.push(builder("anims/Victory/Victory0012.png"));
Victory.push(builder("anims/Victory/Victory0013.png"));
Victory.push(builder("anims/Victory/Victory0014.png"));
Victory.push(builder("anims/Victory/Victory0015.png"));
Victory.push(builder("anims/Victory/Victory0016.png"));
Victory.push(builder("anims/Victory/Victory0017.png"));
Victory.push(builder("anims/Victory/Victory0018.png"));
Victory.push(builder("anims/Victory/Victory0019.png"));
Victory.push(builder("anims/Victory/Victory0020.png"));
Victory.push(builder("anims/Victory/Victory0021.png"));
Victory.push(builder("anims/Victory/Victory0022.png"));
Victory.push(builder("anims/Victory/Victory0023.png"));
Victory.push(builder("anims/Victory/Victory0024.png"));
Victory.push(builder("anims/Victory/Victory0025.png"));
Victory.push(builder("anims/Victory/Victory0026.png"));
Victory.push(builder("anims/Victory/Victory0027.png"));
Victory.push(builder("anims/Victory/Victory0028.png"));
Victory.push(builder("anims/Victory/Victory0029.png"));
Victory.push(builder("anims/Victory/Victory0030.png"));
Victory.push(builder("anims/Victory/Victory0031.png"));
Victory.push(builder("anims/Victory/Victory0032.png"));
Victory.push(builder("anims/Victory/Victory0033.png"));
Victory.push(builder("anims/Victory/Victory0034.png"));
Victory.push(builder("anims/Victory/Victory0035.png"));
Victory.push(builder("anims/Victory/Victory0036.png"));
Victory.push(builder("anims/Victory/Victory0037.png"));
Victory.push(builder("anims/Victory/Victory0038.png"));
Victory.push(builder("anims/Victory/Victory0039.png"));
Victory.push(builder("anims/Victory/Victory0040.png"));
Victory.push(builder("anims/Victory/Victory0041.png"));
Victory.push(builder("anims/Victory/Victory0042.png"));
Victory.push(builder("anims/Victory/Victory0043.png"));
Victory.push(builder("anims/Victory/Victory0044.png"));
Victory.push(builder("anims/Victory/Victory0045.png"));
Victory.push(builder("anims/Victory/Victory0046.png"));
Victory.push(builder("anims/Victory/Victory0047.png"));
Victory.push(builder("anims/Victory/Victory0048.png"));
Victory.push(builder("anims/Victory/Victory0049.png"));
Victory.push(builder("anims/Victory/Victory0050.png"));
Victory.push(builder("anims/Victory/Victory0051.png"));
Victory.push(builder("anims/Victory/Victory0052.png"));
Victory.push(builder("anims/Victory/Victory0053.png"));
Victory.push(builder("anims/Victory/Victory0054.png"));
Victory.push(builder("anims/Victory/Victory0055.png"));
Victory.push(builder("anims/Victory/Victory0056.png"));
Victory.push(builder("anims/Victory/Victory0057.png"));
Victory.push(builder("anims/Victory/Victory0058.png"));
Victory.push(builder("anims/Victory/Victory0059.png"));
Victory.push(builder("anims/Victory/Victory0060.png"));
Victory.push(builder("anims/Victory/Victory0061.png"));
Victory.push(builder("anims/Victory/Victory0062.png"));
Victory.push(builder("anims/Victory/Victory0063.png"));
Victory.push(builder("anims/Victory/Victory0064.png"));
Victory.push(builder("anims/Victory/Victory0065.png"));
Victory.push(builder("anims/Victory/Victory0066.png"));
Victory.push(builder("anims/Victory/Victory0067.png"));
Victory.push(builder("anims/Victory/Victory0068.png"));
Victory.push(builder("anims/Victory/Victory0069.png"));
Victory.push(builder("anims/Victory/Victory0070.png"));
Victory.push(builder("anims/Victory/Victory0071.png"));
Victory.push(builder("anims/Victory/Victory0072.png"));
Victory.push(builder("anims/Victory/Victory0073.png"));
Victory.push(builder("anims/Victory/Victory0074.png"));
Victory.push(builder("anims/Victory/Victory0075.png"));
Victory.push(builder("anims/Victory/Victory0076.png"));
Victory.push(builder("anims/Victory/Victory0077.png"));
Victory.push(builder("anims/Victory/Victory0078.png"));
Victory.push(builder("anims/Victory/Victory0079.png"));
Victory.push(builder("anims/Victory/Victory0080.png"));
Victory.push(builder("anims/Victory/Victory0081.png"));
Victory.push(builder("anims/Victory/Victory0082.png"));
Victory.push(builder("anims/Victory/Victory0083.png"));
Victory.push(builder("anims/Victory/Victory0084.png"));
Victory.push(builder("anims/Victory/Victory0085.png"));
Victory.push(builder("anims/Victory/Victory0086.png"));
Victory.push(builder("anims/Victory/Victory0087.png"));
Victory.push(builder("anims/Victory/Victory0088.png"));
Victory.push(builder("anims/Victory/Victory0089.png"));
Victory.push(builder("anims/Victory/Victory0090.png"));
Victory.push(builder("anims/Victory/Victory0091.png"));
Victory.push(builder("anims/Victory/Victory0092.png"));
Victory.push(builder("anims/Victory/Victory0093.png"));
Victory.push(builder("anims/Victory/Victory0094.png"));
Victory.push(builder("anims/Victory/Victory0095.png"));
Victory.push(builder("anims/Victory/Victory0096.png"));
Victory.push(builder("anims/Victory/Victory0097.png"));
Victory.push(builder("anims/Victory/Victory0098.png"));
Victory.push(builder("anims/Victory/Victory0099.png"));
Victory.push(builder("anims/Victory/Victory0100.png"));
Victory.push(builder("anims/Victory/Victory0101.png"));
Victory.push(builder("anims/Victory/Victory0102.png"));
Victory.push(builder("anims/Victory/Victory0103.png"));
Victory.push(builder("anims/Victory/Victory0104.png"));
Victory.push(builder("anims/Victory/Victory0105.png"));
Victory.push(builder("anims/Victory/Victory0106.png"));
Victory.push(builder("anims/Victory/Victory0107.png"));
Victory.push(builder("anims/Victory/Victory0108.png"));
Victory.push(builder("anims/Victory/Victory0109.png"));
Victory.push(builder("anims/Victory/Victory0110.png"));
Victory.push(builder("anims/Victory/Victory0111.png"));
Victory.push(builder("anims/Victory/Victory0112.png"));
Victory.push(builder("anims/Victory/Victory0113.png"));
Victory.push(builder("anims/Victory/Victory0114.png"));
Victory.push(builder("anims/Victory/Victory0115.png"));
Victory.push(builder("anims/Victory/Victory0116.png"));
Victory.push(builder("anims/Victory/Victory0117.png"));
Victory.push(builder("anims/Victory/Victory0118.png"));
Victory.push(builder("anims/Victory/Victory0119.png"));
Victory.push(builder("anims/Victory/Victory0120.png"));
Victory.push(builder("anims/Victory/Victory0121.png"));
Victory.push(builder("anims/Victory/Victory0122.png"));
Victory.push(builder("anims/Victory/Victory0123.png"));
Victory.push(builder("anims/Victory/Victory0124.png"));
Victory.push(builder("anims/Victory/Victory0125.png"));
Victory.push(builder("anims/Victory/Victory0126.png"));
Victory.push(builder("anims/Victory/Victory0127.png"));
Victory.push(builder("anims/Victory/Victory0128.png"));
Victory.push(builder("anims/Victory/Victory0129.png"));
Victory.push(builder("anims/Victory/Victory0130.png"));
Victory.push(builder("anims/Victory/Victory0131.png"));
Victory.push(builder("anims/Victory/Victory0132.png"));
Victory.push(builder("anims/Victory/Victory0133.png"));
Victory.push(builder("anims/Victory/Victory0134.png"));
Victory.push(builder("anims/Victory/Victory0135.png"));
Victory.push(builder("anims/Victory/Victory0136.png"));
Victory.push(builder("anims/Victory/Victory0137.png"));
Victory.push(builder("anims/Victory/Victory0138.png"));
Victory.push(builder("anims/Victory/Victory0139.png"));
Victory.push(builder("anims/Victory/Victory0140.png"));
Victory.push(builder("anims/Victory/Victory0141.png"));
Victory.push(builder("anims/Victory/Victory0142.png"));
Victory.push(builder("anims/Victory/Victory0143.png"));
Victory.push(builder("anims/Victory/Victory0144.png"));
Victory.push(builder("anims/Victory/Victory0145.png"));
Victory.push(builder("anims/Victory/Victory0146.png"));
Victory.push(builder("anims/Victory/Victory0147.png"));
Victory.push(builder("anims/Victory/Victory0148.png"));
Victory.push(builder("anims/Victory/Victory0149.png"));

var LoadedVictoryFrames = 0;
var VictoryStrike = 0;
while (VictoryStrike < 17){
  Victory[VictoryStrike].addEventListener("load", viLoader);
  VictoryStrike ++;
}

var YouFailed = [];

YouFailed.push(builder("anims/YouFailed/YouFailed0000.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0001.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0002.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0003.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0004.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0005.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0006.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0007.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0008.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0009.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0010.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0011.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0012.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0013.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0014.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0015.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0016.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0017.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0018.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0019.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0020.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0021.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0022.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0023.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0024.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0025.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0026.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0027.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0028.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0029.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0030.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0031.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0032.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0033.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0034.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0035.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0036.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0037.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0038.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0039.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0040.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0041.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0042.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0043.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0044.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0045.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0046.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0047.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0048.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0049.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0050.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0051.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0052.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0053.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0054.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0055.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0056.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0057.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0058.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0059.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0060.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0061.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0062.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0063.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0064.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0065.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0066.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0067.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0068.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0069.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0070.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0071.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0072.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0073.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0074.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0075.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0076.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0077.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0078.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0079.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0080.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0081.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0082.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0083.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0084.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0085.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0086.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0087.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0088.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0089.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0090.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0091.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0092.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0093.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0094.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0095.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0096.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0097.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0098.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0099.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0100.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0101.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0102.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0103.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0104.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0105.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0106.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0107.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0108.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0109.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0110.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0111.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0112.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0113.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0114.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0115.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0116.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0117.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0118.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0119.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0120.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0121.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0122.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0123.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0124.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0125.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0126.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0127.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0128.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0129.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0130.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0131.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0132.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0133.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0134.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0135.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0136.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0137.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0138.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0139.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0140.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0141.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0142.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0143.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0144.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0145.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0146.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0147.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0148.png"));
YouFailed.push(builder("anims/YouFailed/YouFailed0149.png"));

var LoadedYouFailedFrames = 0;
var YouFailedStrike = 0;
while (YouFailedStrike < 17){
  YouFailed[YouFailedStrike].addEventListener("load", yFLoader);
  YouFailedStrike ++;
}

var Loading = [];

Loading.push(builder("anims/Loading/frame_00_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_01_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_02_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_03_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_04_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_05_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_06_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_07_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_08_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_09_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_10_delay-0.1s.png"));
Loading.push(builder("anims/Loading/frame_11_delay-0.1s.png"));
var LoadedLoadingFrames = 0;
var LoadingStrike = 0;
while (LoadingStrike <= 11){
  Loading[LoadingStrike].addEventListener("load", lLoader);
  LoadingStrike ++;
}

var Animations = [];
Animations.push(MarkingALine);
Animations.push(MarkingAVerticalLine);
Animations.push(MarkingADiagonalLineLeft);
Animations.push(MarkingADiagonalLineRight);
Animations.push(Victory);
Animations.push(YouFailed);
Animations.push(Loading);

function loader(){
  LoadedHorizontalFrames = LoadedHorizontalFrames+1;
}

function vLoader(){
  LoadedVerticalFrames = LoadedVerticalFrames+1;
}

function dLLoader(){
  LoadedDiagonalLeftFrames = LoadedDiagonalLeftFrames+1;
}

function dRLoader(){
  LoadedDiagonalRightFrames = LoadedDiagonalRightFrames+1;
}

function viLoader(){
  LoadedVictoryFrames = LoadedVictoryFrames+1;
}

function yFLoader(){
  LoadedYouFailedFrames = LoadedYouFailedFrames+1;
}

function lLoader(){
  LoadedLoadingFrames++;
}

function animate (Code, X, Y, FrameRate){

  if (Code == 0){
    while(LoadedHorizontalFrames != Animations[Code].length){
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
  }

  if (Code == 1){
    while(LoadedVerticalFrames != Animations[Code].length){
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
  }

  Counter = 0;

  framing(Code, X, Y, FrameRate);

  function framing(Code, X, Y, FrameRate){
    var TimeInterval = setInterval(function picturing(){
          PapelPlano.drawImage(Animations[Code][Counter], X, Y);
          Counter++;
          if(Counter>=Animations[Code].length){
            clearInterval(TimeInterval);
            if((Code != 4)&&(Code != 5)&&(Code != 6)){
              judgeDesition(Winner);
            }
          }
        }, Math.ceil(1000/FrameRate));
  }
}
setTimeout(animate(6, ((Lienzo.width)/2)-33, ((Lienzo.height)/16), 10), 120);
function judgeDesition(Winner){
  if (Winner == "O"){
    if(Primero == "PC"){
      animate(4, ((1/7)*Lienzo.width), ((5/21)*Lienzo.width)-51, 30);
      BackgoundSounds[10].play();
    }else{
      animate(5, ((1/7)*Lienzo.width)+51, ((5/21)*Lienzo.width)-51, 30);
      BackgoundSounds[11].play();
    }
  }else{
    if(Primero == "PC"){
      animate(5, ((1/7)*Lienzo.width)+51, ((5/21)*Lienzo.width)-51, 30);
      BackgoundSounds[11].play();
    }else{
        animate(4, ((1/7)*Lienzo.width), ((5/21)*Lienzo.width)-51, 30);
        BackgoundSounds[10].play();
    }
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
