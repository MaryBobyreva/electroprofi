const burger = document.querySelector('.burger')
const headerMenu = document.querySelector('.header-menu')

console.log(burger)
burger.addEventListener('click', ()=> {
    if(burger.classList.contains('burger--active')) {
        burger.classList.remove('burger--active')
        headerMenu.classList.remove('header-menu--active')
        document.body.classList.remove('page--noscroll')  
        return  
    }


    console.log('click')
    burger.classList.add('burger--active')
    headerMenu.classList.add('header-menu--active')
    document.body.classList.add('page--noscroll')  
})
