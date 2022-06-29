//Tres objetos
//funcion anonima q se ejecuta asi misma para no contaminar el scoope general del proyecto.

(function () {
  self.Tablero = function (width, height) {
    //self vale algo depende del contexto en el que se encuentre.
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.paletas = [];
    this.pelotas = null;
  };
  self.Tablero.prototype = {
    get elements() {
      var elements = this.paletas; // retorna las paletas y las pelotas que hay adentro del tablero.
      elements.push(pelota);
      return elements;
    },
  };
})();
//clase que va a dibujar el tablero

(function () {
  self.TableroTamaño = function (canvas, tablero) {
    this.canvas = canvas;
    this.canvas.width = tablero.width;
    this.canvas.height = tablero.height;
    this.tablero = tablero;
    this.contexto = canvas.getContext("2d");
  };
})();

window.addEventListener("load", main);

(function main() {
  var tablero = new tablero(800, 400);
  var canvas = document.getElementById("canvas");
  var TableroTamaño = new TableroTamaño(canvas, tablero);
})();
function main() {}
