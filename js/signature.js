class signature {

    constructor(){
        this.id = document.getElementById('signature');
        this.ctx = this.id.getContext('2d')
        this.width = this.id.width
        this.height = this.id.height
        this.paint = true
        this.clickX = new Array()
        this.clickY = new Array()
        this.clickDrag = new Array()
    }

    addClick(x, y, dragging){
        this.clickX.push(x)
        this.clickY.push(y)
        this.clickDrag.push(dragging)
    }

    deleteDraw() {
        this.ctx.clearRect(0,0, this.width, this.height)
    }

    redraw(){
        this.ctx.clearRect(0,0, this.width, this.height)
        this.ctx.strokeStyle = "black"
        this.ctx.lineJoin = "round"
        this.ctx.lineWidth = 5

        for( var i = 0; i < this.clickX.length; i++){
            this.ctx.beginPath()

            if(this.clickDrag[i] && i){
                this.ctx.moveTo(this.clickX[i-1], this.clickY[i-1])
            }
            else{
                this.ctx.moveTo(this.clickX[i] - 1, this.clickY[i])
            }
            this.ctx.lineTo(this.clickX[i], this.clickY[i])
            this.ctx.closePath()
            this.ctx.stroke()
        }
    }


    start(){
        this.id.addEventListener("mousedown", (e)=> {
            var mouseX = e.pageX - this.offsetLeft
            var mouseY = e.pageY - this.offseTop
            this.paint = true
            
            this.addClick(mouseX, mouseY, true)
            this.redraw()
        })

        this.id.addEventListener("mouseup", ()=>{
            this.paint = false
        })

        this.id.addEventListener("mouseleave", ()=> {
            this.paint = false;
        })
    }
}

signature = new signature;

signature.start()
