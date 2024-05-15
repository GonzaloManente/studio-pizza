const div = document.querySelector('body > header');
let prevY = window.scrollY;

window.addEventListener('scroll',function(){
    if(prevY > window.scrollY){
        div.classList.remove('off')
    }else{
        div.classList.add('off')
    }
    prevY=window.scrollY;
});