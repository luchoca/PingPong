//Tres objetos
//funcion anonima q se ejecuta asi misma para no contaminar el scoope general del proyecto.
//BOARD
(function () {
  self.Board = function (width, height) {
    //self vale algo depende del contexto en el que se encuentre.
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = []; // bar
    this.ball = null; // ball
    this.jugador1 = 0;
    this.jugador2 = 0;
  };
  self.Board.prototype = {
    get elements() {
      var elements = this.bars.map(function (bars) {
        // pasa el arreglo como copia
        return bars;
      }); // retorna las paletas y la pelota que hay adentro del tablero.
      elements.push(this.ball);
      return elements;
    },
    get getWidth() {
      return this.width;
    },

    get getHeight() {
      return this.height;
    },

    resetBall: function () {
      ball.x = 400;
      ball.y = 100;
      ball.speed = 3;
      ball.direction = 2;
      ball.speed_x = -ball.speed_x;
    },
    detenerJuego: function () {
      !this.boar.playing;
    },
  };
})();
//BALL
(function () {
  self.Ball = function (x, y, radius, board) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed_x = 3;
    this.speed_y = 0;
    this.board = board;
    this.direction = 1;
    this.bounce_angle = 0;
    this.max_bounce_angle = Math.PI / 12;
    this.speed = 15;
    board.ball = this;
    this.kind = "circle";
  };
  function resetPuntos() {
    board.jugador1 = 0;
    board.jugador2 = 0;
    jugador1.innerHTML = board.jugador1;
    jugador2.innerHTML = board.jugador2;
  }

  self.Ball.prototype = {
    move: function () {
      this.x += this.speed_x * this.direction;
      this.y += this.speed_y;

      if (
        this.y + this.radius > this.board.getHeight ||
        this.y + this.radius <= 20
      ) {
        this.speed_y = -this.speed_y;
      }

      if (this.x + this.radius > this.board.getWidth) {
        ////////
        //vuelve la pelota al lugar inicial
        board.resetBall();
        //-----------------sumo un punto
        board.jugador1++;
        jugador1.innerHTML = board.jugador1;
        swal({
          title: "PUNTO JUGADRO 1",
          timer: 1000,
          button: false,
        });
        if (board.jugador1 == 5) {
          //reset puntos
          swal({
            title: "GANASTE LLEGASTE A 5",
            icon: "success",
            timer: 3000,
            button: false,
          });

          resetPuntos();

          // puntuacion.innerHTML = "";
        }
        //si la pelota es menor al tamanio del board
      } else if (this.x + this.radius < 0) {
        //pared dercha
        //resteo ball
        board.resetBall();
        //-----------------sumo un punto
        board.jugador2++; //suma
        jugador2.innerHTML = board.jugador2; //lo munestra en pantalla
        swal({
          title: "PUNTO JUGADRO 2!",
          timer: 1000,
          button: false,
        });

        //-cuando el marcador llega a 5 termina el juego
        if (board.jugador2 == 5) {
          swal({
            title: "GANASTE LLEGASTE A 5",
            icon: "success",
            timer: 3000,
            button: false,
          });
          //pard IZQ
          //reset puntos
          resetPuntos();
          detenerJuego();
        }
      }
    },
    get width() {
      return this.radius * 2;
    },
    get height() {
      return this.radius * 2;
    },

    collision: function (bar) {
      //reacciona a la colision con na barra que recibe como parametro
      var relative_intersect_y = bar.y + bar.height / 2 - this.y;
      console.log();
      var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

      this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

      this.speed_y = this.speed * -Math.sin(this.bounce_angle);

      this.speed_x = this.speed * Math.cos(this.bounce_angle);

      if (this.x > this.board.width / 2) {
        this.direction = -1;
      } else {
        this.direction = 1;
      }
    },
  };
})();
//BARS
(function () {
  self.Bars = function (x, y, width, height, board) {
    this.x = x; // coordenada
    this.y = y; //coordenada
    this.width = width;
    this.height = height;
    this.board = board; //elemento donde se va a dibujar
    this.board.bars.push(this);
    this.kind = "rectangle";
    this.speed = 5; //velocidad que se mueven las paletas
  };

  self.Bars.prototype = {
    // funciones para mover
    down: function () {
      if (this.y + this.height < this.board.height) this.y += this.speed;
    },
    up: function () {
      if (this.y > 0) this.y -= this.speed;
    },
    toString: function () {
      //imprimer en q coordenadas se encuentra---> tostring pasa de obejot a string
      return "x: " + this.x + " y:  " + this.y;
    },
  };
})();
//helpper method , ayuda a los objeto auqnue no pertenzcan a el

//clase que va a dibujar el tablero
//BOARD-VIEW
(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
  };

  self.BoardView.prototype = {
    //limpiar bars para que no se vea mientras se mueve

    clean: function () {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height); //dibuja un cuadrado transparente desde la posicion x0 y0 y el temanio del board
    },

    //DIBUJAR
    draw: function () {
      for (let i = this.board.elements.length - 1; i >= 0; i--) {
        let el = this.board.elements[i]; //elemento a dibujar

        draw(this.ctx, el);
      }
    },
    checkCollisions: function () {
      for (var i = this.board.bars.length - 1; i >= 0; i--) {
        var bar = this.board.bars[i];
        if (hit(bar, this.board.ball)) {
          this.board.ball.collision(bar); //objeto colision de la pelota y paremetros la bars
        }
      }
    },

    //JUGAR
    play: function () {
      if (this.board.playing) {
        this.clean();
        this.draw();
        this.checkCollisions();
        this.board.ball.move();
      }
    },
  };

  function hit(a, b) {
    //HIT DEVUELVE FALSO CUANDO NO HAY COLISION Y VERDADERO CUANDO HAY COLISION

    // Revisa si a colisiona con b
    var hit = false;

    // Colsiones horizontales
    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
      // console.log("choco horizontal");

      // Colisiones verticales
      if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
      // console.log("choco vertical");
    }

    // Colisión de a con b
    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
      if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
      // console.log("choco pared izq");
    }
    // Colisión b con a
    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
      if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
      // console.log("choco pared derecha");
    }
    return hit;
  }

  function draw(ctx, element) {
    switch (element.kind) {
      case "rectangle":
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(element.x, element.y, element.width, element.height);

        break;
      case "circle":
        ctx.fillStyle = "#ff6600";
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, 7); // el 0 y 7 dibujan un ciruclo
        ctx.fill();
        ctx.closePath();
        break;
    }
  }
})();

//intancias de obejtos
var board = new Board(900, 400);
var bars = new Bars(10, 150, 20, 100, board);
var bars2 = new Bars(870, 150, 20, 100, board);
var canvas = document.getElementById("canvas");
var boardView = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);
//POR CADA LETRA APRETADA HACE ALGO
document.addEventListener("keydown", function (e) {
  console.log(e.keyCode);
  //cada vez que el keyCodedown suceda se va a ejectuar la funcion
  // console.log(ev.keyCodeCode); //e --> trae informacion del evento

  if (e.keyCode === 87) {
    e.preventDefault();
    bars.up();
  } else if (e.keyCode === 83) {
    e.preventDefault();
    bars.down();
  }
  //Si oprimimos W o S movemos la barra 2
  if (e.keyCode === 38) {
    e.preventDefault();
    bars2.up();
  } else if (e.keyCode === 40) {
    e.preventDefault();
    bars2.down();
  }
  //Si oprimimos la barra espaciadora se pausa o reanuda el juego
  else if (e.keyCode === 32) {
    e.preventDefault();
    board.playing = !board.playing;
  }
});
//Puntuacion

var puntuacion = document.getElementById("puntuacion");
var jugador1 = document.getElementById("jugador1");
var jugador2 = document.getElementById("jugador2");

boardView.draw(); //Muestro el board
window.requestAnimationFrame(controller); //ANIMACION
// self.addEventListener("load", main);
//CONTROLLER
function controller() {
  window.requestAnimationFrame(controller); //ANIMACION , ACA TAMBIEN PARA QUE SE SIGA ACTUALIZNADO CTE.
  boardView.play();
}

// Cada punto que gane cada jugador debe aparecer un mensaje
// de felicitaciones que no dure más de 3 segundos y siga el juego.
