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
    this.balls = null; // balls
  };
  self.Board.prototype = {
    get elements() {
      //
      var elements = this.bars; // retorna las paletas y las pelotas que hay adentro del tablero.
      elements.push(this.ball);
      return elements;
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
    this.contexto = canvas.getContext("2d");
  };

  self.BoardView.prototype = {
    draw: function () {
      for (let i = this.board.elements.length - 1; i >= 0; i--) {
        let el = this.board.elements[i]; //elemento a dibujar

        draw(this.contexto, el);
      }
    },
  };
  function draw(contexto, element) {
    if (element !== null && element.hasOwnProperty("kind")) {
      switch (element.kind) {
        case "rectangle":
          contexto.fillRect(
            element.x,
            element.y,
            element.width,
            element.height
          );
          break;
      }
    }
  }
})();

//intancias de obejtos
var board = new Board(800, 400);
var bars = new Bars(20, 100, 40, 100, board);
var bars = new Bars(700, 100, 40, 100, board);
var canvas = document.getElementById("canvas");
var boardView = new BoardView(canvas, board);

document.addEventListener("keydown", function (ev) {
  //cada vez que el keydown suceda se va a ejectuar la funcion
  // console.log(ev.keyCode); //ev --> trae informacion del evento
  if (ev.keyCode == 38) {
    bars.up();
  } else if (ev.keyCode == 40) {
    bars.down();
  }
});

self.addEventListener("load", main);

(function main() {
  boardView.draw();
})();
function main() {}
