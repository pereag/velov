class TextAnimation {
    constructor(text){
        this.text = text
    }
// Affiche le text  
    animation(){
        this.text.style.opacity = 1
        this.text.style.transition = "opacity 3s";
    }
}

export default TextAnimation