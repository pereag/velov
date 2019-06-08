window.onload = init()

// initialise tous les objets et leurs principales fonctions 
function init(){
    let loader = new Loader(document.getElementById("logo-loader"), document.getElementById("loader"))
    loader.play()

    let map = new Maps(document.getElementById("api--google"), 45.75, 4.85, 15)
    map.play()

    let slideshow = new Slideshow(document.getElementById('info-slideshow'),  document.getElementById('slideshow-leftButton'), document.getElementById('slideshow-rightButton'), document.getElementById('slideshow-pausePlayButton'), document.getElementById('play'), document.getElementById('pause'), 'pausePlay_active', 'pausePlay_desactive', 5000 )
    slideshow.init()
    slideshow.displayStopButton()

    let reservation = new Reservation(document.getElementById("reservation-button"), document.getElementById("station-name"), document.getElementById("station-address"), document.getElementById("station-status"), document.getElementById("velov-number"))
    reservation.displayForm()
    
    let textAnimation = new TextAnimation(document.getElementById('big-one-title'))
    textAnimation.animation()
}