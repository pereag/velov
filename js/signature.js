class Signature {
  constructor(canvas) {
      this.canvas = canvas
      this.ctx = this.canvas.getContext('2d') 
      this.ctx.lineWith = 2
      this.ctx.strokeStyle = "#222222"
      this.drawing = false
      this.mousePos = { x:0, y:0 }
      this.lastPos = this.mousePos
      this.bodyElement = document.body
  }

// Initialise la signature
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

    let self = this
    function loopRender(){
      requestAnimFrame(loopRender)
      self.renderCanvas()
    } 
    loopRender() 

  // Tactile mobile
    this.canvas.addEventListener("touchstart", (e) => {
      if(this.bodyElement.classList.contains("stop-scrolling") == false){
        this.bodyElement.classList.add("stop-scrolling")
      }
      this.mousePos = getTouchPos(this.canvas, e);
      let touch = e.touches[0];
      let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });

    this.canvas.dispatchEvent(mouseEvent);
    }, false);

    this.canvas.addEventListener("touchend",  (e) => {
      if(this.bodyElement.classList.contains("stop-scrolling") == true){
        this.bodyElement.classList.remove("stop-scrolling")
      }
      let mouseEvent = new MouseEvent("mouseup", {});
      this.canvas.dispatchEvent(mouseEvent);
    }, false);
    this.canvas.addEventListener("touchmove", (e) => {
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
    }, false);

    function getTouchPos(canvasDom, touchEvent) {
      let rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }
  }
// Donne la position de la souris
  getMousePos(canvasDom, mouseEvent) {
      let rect = canvasDom.getBoundingClientRect()
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
// Desactiver le défilement

export default Signature

