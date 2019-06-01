class Loader {
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
