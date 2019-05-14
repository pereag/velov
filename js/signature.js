class signature {

    constructor(){
        this.id = document.getElementById('signature');
        this.ctx = this.id.getContext('2d')
        this.width = this.id.width
        this.height = this.id.height
    }

    start(){

    }
    deleteDrow() {
        this.ctx.clearRect(0,0, this.width, this.height);
    }
}

signature = new signature;

signature.start()
