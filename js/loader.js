class loader {
    constructor(logo, pageLoader){
        this.logo = logo
        this.pageLoader = pageLoader
    }

    play(){
        window.setTimeout(()=>{
            this.pageLoader.classList.add("desactive-loader")   
        }, 500)
    }

}

loader = new loader(document.getElementById("logo-loader"), document.getElementById("loader"))
loader.play()
