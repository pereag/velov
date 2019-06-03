class Loader {
    constructor(logo, pageLoader){
        this.logo = logo
        this.pageLoader = pageLoader
    }

    play(){
            this.pageLoader.classList.add("desactive-loader")   
    }

}
