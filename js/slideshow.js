/**On crée un object slideshow */
var slideshow = new Object();

/**On lui ajoute des propriétés */
slideshow.id = document.getElementById('info-slideshow');
slideshow.leftButton = document.getElementById('slideshow-leftButton');
slideshow.rightButton = document.getElementById('slideshow-rightButton');
slideshow.time = 5;
slideshow.image = 1;


/**On ajoute une fonction pour modifier l'image en arrière plan*/

slideshow.changeImage = function(){
    slideshow.id.style.background = "url('images/image-"+ slideshow.image +".jpg')";
}


/**On ajoute une fonction qui change de diaporama automatiquement selon le temps indiqué*/

slideshow.play = function(){
    setInterval(function(){
        if(slideshow.image < 4 ){
            slideshow.image == slideshow.image ++;
        }
        else{
            slideshow.image = 1;
        }
        slideshow.changeImage();
    },slideshow.time * 1000);
}
/**On ajoute une fonction qui passe l'image du diaporama quand l'utilisateur click sur un des deux bouttons boutton*/

slideshow.passImage = function(button) {
    button.addEventListener('click', function(){
        if(button == slideshow.leftButton){
            if(slideshow.image > 1){
                slideshow.image = slideshow.image -1;
            }
            else if(slideshow.image = 1) {
                slideshow.image = 4;
            }

        }
        else if(button == slideshow.rightButton){
            if(slideshow.image < 4){
                slideshow.image = slideshow.image +1;
            }
            else if(slideshow.image = 4){
                slideshow.image = 1;
            }
        }
        slideshow.changeImage()
    })
}

slideshow.play()
slideshow.passImage(slideshow.leftButton);
slideshow.passImage(slideshow.rightButton);
