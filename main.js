//Tres objetos
//funcion anonima q se ejecuta asi misma para no contaminar el scoope general del proyecto.

(function () {
  self.Board = function (width, height) {
    //self vale algo depende del contexto en el que se encuentre.
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = []; // bars
    this.ball = null; // ball
    this.playing = false;
  };
  self.Board.prototype = {
    get elements() {
      //
      var elements = this.bars.map(function (bars) {
        // pasa el arreglo como copia
        return bars;
      }); // retorna las paletas y la pelota que hay adentro del tablero.
      elements.push(this.ball);
      return elements;
    },
  };
})();

(function () {
  self.Ball = function (x, y, radius, board) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed_x = 0;
    this.speed_y = 0;
    this.board = board;
    this.direction = 1;

    board.ball = this;
    this.kind = "circle";
  };
  self.Ball.prototype = {
    move: function () {
      this.x += this.speed_x * this.direction;
      this.y += this.speed_y;
    },
  };
})();

(function () {
  self.Bars = function (x, y, width, height, board) {
    this.x = x; // coordenada
    this.y = y; //coordenada
    this.width = width;
    this.height = height;
    this.board = board; //elemento donde se va a dibujar
    this.board.bars.push(this);
    this.kind = "rectangle";
    this.speed = 10; //velocidad que se mueven las paletas
  };

  self.Bars.prototype = {
    // funciones para mover
    down: function () {
      this.y += this.speed;
    },
    up: function () {
      this.y += this.speed;
    },
    toString: function () {
      //imprimer en q coordenadas se encuentra, tostring pasa de obejot a string
      return "x: " + this.x + " y:  " + this.y;
    },
  };
})();
//helpper method , ayuda a los objeto sauqnue no pertenzcan a el
//clase que va a dibujar el tablero

(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
  };

  self.BoardView.prototype = {
    //BORRAR
    cleaen: function () {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height); //dibuja un cuadrado transparente desde la posicion x0 y0 y el temanio del board
    },

    //DIBUJAR
    draw: function () {
      for (let i = this.board.elements.length - 1; i >= 0; i--) {
        let el = this.board.elements[i]; //elemento a dibujar

        draw(this.ctx, el);
      }
    },

    //JUGAR
    play: function () {
      if (this.board.playing) {
        this.draw();
        this.cleaen();
        this.board.ball.move();
      }
    },
  };

  function draw(ctx, element) {
    switch (element.kind) {
      case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, 7); // el 0 y 7 dibujan un ciruclo
        ctx.fill();
        ctx.closePath();
        break;
    }
  }
})();

//intancias de obejtos
var board = new Board(800, 400);
var bars = new Bars(20, 100, 40, 100, board);
var bars2 = new Bars(700, 100, 40, 100, board);
var canvas = document.getElementById("canvas");
var boardView = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);

document.addEventListener("keydown", function (ev) {
  //cada vez que el keydown suceda se va a ejectuar la funcion
  // console.log(ev.keyCode); //ev --> trae informacion del evento

  if (ev.keyCode == 38) {
    ev.preventDefault();

    bars.up();
  } else if (ev.keyCode == 40) {
    ev.preventDefault();
    bars.down();
  } else if (ev.keyCode == 87) {
    ev.preventDefault();
    //W
    bars2.up();
  } else if (ev.keyCode == 83) {
    ev.preventDefault();
    //S
    bars2.down();
  } else if (ev.keyCode == 32) {
    ev.preventDefault();
    //BARRA ESPACIADORA
    board.playing = !board.playing;
  }
});

boardView.draw();
self.requestAnimationFrame(controller); //ANIMACION
// self.addEventListener("load", main);

// (function controller() {
//   window.requestAnimationFrame(controller); //ANIMACION , ACA TAMBIEN PARA QUE SE SIGA ACTUALIZNADO CTE.
// })();
function controller() {
  boardView.play();

  //Para que se ejecute cosntantemente la animación lo colocamos aquí también
  self.requestAnimationFrame(controller);
}
