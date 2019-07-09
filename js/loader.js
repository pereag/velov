class Loader {
    constructor(logo, pageLoader){
        this.logo = logo;
        this.pageLoader = pageLoader;
    }
// Change la clave de la div loader 
    play(){
        this.pageLoader.classList.add("desactive-loader");
    };

};

export default Loader;