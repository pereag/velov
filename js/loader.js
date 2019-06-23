class Loader {
    constructor(logo, pageLoader){
        this.logo = logo
        this.pageLoader = pageLoader
    }
// Change la clave de la div loader 
    play(){
        window.setTimeout(()=> {
            this.pageLoader.classList.add("desactive-loader")
        }, 300)   
    }

}

export default Loader