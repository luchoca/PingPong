//Tres objetos
//funcion anonima q se ejecuta asi misma para no contaminar el scoope general del proyecto.

(function () {
  self.Tablero = function (width, height) {
    //self vale algo depende del contexto en el que se encuentre.
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.paletas = []; // bars
    this.pelotas = null; // balls
  };
  self.Tablero.prototype = {
    get elements() {
      //
      var elements = this.paletas; // retorna las paletas y las pelotas que hay adentro del tablero.
      elements.push(this.pelota);
      return elements;
    },
  };
})();

(function () {
  self.Paletas = function (x, y, width, height) {
    this.x = x; // coordenada
    this.y = y; //coordenada
    this.width = width;
    this.height = height;
    this.tablero = tablero; //elemento donde se va a dibujar
    this.tablero.paletas.push(this); //relleno el arreglo , accedo al board accedo al areglo bars y le agrero un nuevo elemepo con push
    this.kind = "rectangle";
  };

  self.Paletas.prototype = {
    down: function () {
      // funciones para mover
    },
    up: function () {},
  };
})()(
  //helpper method
  //clase que va a dibujar el tablero

  function () {
    self.TableroVista = function (canvas, tablero) {
      this.canvas = canvas;
      this.canvas.width = tablero.width;
      this.canvas.height = tablero.height;
      this.tablero = tablero;
      this.contexto = canvas.getContext("2d");
    };

    self.TableroVista.prototype = {
      //
      draw: function () {
        for (var i = this.tablero.element.length - 1; i >= 0; i--) {
          var el = this.board.element[i]; //elemento a dibujar

          draw(this.contexto, el);
        }
      },
    };

    function draw(contexto, element) {
      if (element !== null && element.hasOwnProperty("kind")) {
        switch (element.kind) {
          case "rectangule":
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
  }
)();

window.addEventListener("load", main);

(function main() {
  var tablero = new tablero(800, 400);
  var paletas = new paletas(20, 100, 40, 100, tablero);
  var paletas = new paletas(700, 100, 40, 100, tablero);
  var canvas = document.getElementById("canvas");
  var TableroTamaño = new TableroTamaño(canvas, tablero);
  TableroTamaño.draw();
})();
function main() {}
