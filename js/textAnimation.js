class textAnimation {
    constructor(text){
        this.text = text
    }
    
    animation(){
        this.text.style.opacity = 1
        this.text.style.transition = "opacity 3s";
    }
}

textAnimation = new textAnimation(document.getElementById('big-one-title'))
textAnimation.animation()