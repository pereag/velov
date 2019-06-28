import Maps from "./Maps"
import Loader from "./Loader"
import TextAnimation from "./TextAnimation"
import Slideshow from "./Slideshow"
import MobileMenu from "./MobileMenu"

window.onload = init()

// initialise tous les objets et leurs principales fonctions 
function init(){
    let map = new Maps(document.getElementById("api-google"), 45.75, 4.85, 15)
    map.play()
    let slideshow = new Slideshow(document.getElementById('info-slideshow'),  document.getElementById('slideshow-leftButton'), document.getElementById('slideshow-rightButton'), document.getElementById('slideshow-pausePlayButton'), document.getElementById('play'), document.getElementById('pause'), 'pausePlay_active', 'pausePlay_desactive', 5000)
    slideshow.init()
    slideshow.displayStopButton()

    let mobileMenu = new MobileMenu(document.getElementById("header-mobileImg"), document.getElementById("mobileMenu-background"), document.getElementById("mobileMenu-buttonGroupe"), document.getElementById("mobileMenu"))
    mobileMenu.play()
    
    let textAnimation = new TextAnimation(document.getElementById('big-one-title'))
    textAnimation.animation()

    let loader = new Loader(document.getElementById("logo-loader"), document.getElementById("loader"))
    loader.play()
}