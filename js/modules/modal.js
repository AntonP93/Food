function modalOpen(modalSelector){
    const modalTab = document.querySelector(modalSelector);
    modalTab.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function modalClose(modalSelector){
    const modalTab = document.querySelector(modalSelector);
    modalTab.style.display = 'none';
    document.body.style.overflow = '';     
}

function modal(modalTrigger, modalSelector){
    const modalTabBtn = document.querySelectorAll(modalTrigger);
    const modalTab = document.querySelector(modalSelector);
    
    
    modalTabBtn.forEach((btn)=>{
        btn.addEventListener('click',() => modalOpen(modalSelector))
    })    
  
    modalTab.addEventListener('click', function(EO){
        if(EO.target === modalTab || EO.target.getAttribute('data-close')=='close'){
            modalClose(modalSelector);    
        }
    })

    function openModalbyscroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
            modalOpen(modalSelector);
            window.removeEventListener('scroll',openModalbyscroll);
        }
    }

    window.addEventListener('scroll',openModalbyscroll);

};

export default modal;

export {modalClose};
export {modalOpen};