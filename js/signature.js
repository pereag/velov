class Signature {
  constructor(canvas) {
      this.canvas = canvas
      this.ctx = this.canvas.getContext('2d') 
      this.ctx.lineWith = 2
      this.ctx.strokeStyle = "#222222"
      this.drawing = false
      this.mousePos = { x:0, y:0 }
      this.lastPos = this.mousePos
  }

// initialise la signature
  play() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.drawing = true;
      this.lastPos = this.getMousePos(this.canvas, e)
    }, false);
    document.addEventListener("mouseup", () => {
      this.drawing = false;
    }, false);
    this.canvas.addEventListener("mousemove", (e) => {
      this.mousePos = this.getMousePos(this.canvas, e)
    }, false);  
    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function (callback) {
        window.setTimeout(callback, 1000/60)
      };
    })();

    self = this
    function loopRender(){
      requestAnimFrame(loopRender)
      self.renderCanvas()
    } 
    loopRender() 

  // Tactile mobile
    this.canvas.addEventListener("touchstart", (e) => {
      this.mousePos = getTouchPos(this.canvas, e);
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });

    this.canvas.dispatchEvent(mouseEvent);
    }, false);

    this.canvas.addEventListener("touchend",  () => {
    var mouseEvent = new MouseEvent("mouseup", {});
    this.canvas.dispatchEvent(mouseEvent);
    }, false);
    this.canvas.addEventListener("touchmove", (e) => {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
    }, false);

    function getTouchPos(canvasDom, touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }
  }

// Donne la position de la souris
  getMousePos(canvasDom, mouseEvent) {
      var rect = canvasDom.getBoundingClientRect()
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
      };
  }

// Retourne le rendu du canvas
  renderCanvas() {
    if (this.drawing === true) {
      this.ctx.moveTo(this.lastPos.x, this.lastPos.y)
      this.ctx.lineTo(this.mousePos.x, this.mousePos.y)
      this.ctx.stroke();
      this.lastPos = this.mousePos;
    }
  }

// Efface le canvas
  clearCanvas() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
    this.canvas.width = this.canvas.width
  }

//Sauvegarder la signature
  saveSignature(){
   return this.canvas.toDataURL() 
  }

}
