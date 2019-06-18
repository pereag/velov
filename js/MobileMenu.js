class MobileMenu {
    constructor(buttonMobileMenu, backgroundMobileMenu, buttonsMobilesMenu, contentMobileMenu ){
        this.buttonMobileMenu = buttonMobileMenu
        this.backgroundMobileMenu = backgroundMobileMenu
        this.buttonsMobilesMenu = buttonsMobilesMenu
        this.contentMobileMenu = contentMobileMenu
    }

    play(){
        this.displayContentMobileMenu(this.buttonMobileMenu)
        this.displayContentMobileMenu(this.backgroundMobileMenu)
        this.displayContentMobileMenu(this.buttonsMobilesMenu)
        this.listenSizeWindow()
    }
    displayContentMobileMenu(element){
        element.addEventListener("click", ()=>{
            if(this.contentMobileMenu.classList.contains("mobileMenu_disable")){
                this.contentMobileMenu.classList.replace("mobileMenu_disable", "mobileMenu_active")
                if(this.backgroundMobileMenu.classList.contains("mobileMenu-background_disable")) {
                    this.backgroundMobileMenu.classList.replace("mobileMenu-background_disable", "mobileMenu-background_active")
                }
            }
            else if(this.contentMobileMenu.classList.contains("mobileMenu_active")){
                this.contentMobileMenu.classList.replace("mobileMenu_active", "mobileMenu_disable")
                if(this.backgroundMobileMenu.classList.contains("mobileMenu-background_active")) {
                    this.backgroundMobileMenu.classList.replace("mobileMenu-background_active", "mobileMenu-background_disable")
                }
            }
        })
    }
    listenSizeWindow(){
        setInterval(() => {
            if(window.innerWidth > 800) {
                if(this.contentMobileMenu.classList.contains("mobileMenu_active")){
                    this.contentMobileMenu.classList.replace("mobileMenu_active", "mobileMenu_disable")
                    if(this.backgroundMobileMenu.classList.contains("mobileMenu-background_active")) {
                        this.backgroundMobileMenu.classList.replace("mobileMenu-background_active", "mobileMenu-background_disable")
                    }
                }
            }
        }, 150)
    }
}