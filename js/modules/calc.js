function calc(){
    const result = document.querySelector('.calculating__result span');

    // let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female'; 
    let sex,height, weight, age, 
        ratio = 1.375;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalStorage(selector,activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(element =>{
            element.classList.remove(activeClass);
            if(localStorage.getItem('sex') === element.getAttribute('id')){
                element.classList.add(activeClass);
            }
            if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                element.classList.add(activeClass);
            }
        })
    }

    initLocalStorage('#gender div','calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div','calculating__choose-item_active');

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return;
        }
        
        if(sex === 'female'){
            result.textContent =  Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent =  Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();
    
    function getStaticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach((el)=>{
            el.addEventListener('click', (eo) =>{
                if(eo.target.getAttribute('data-ratio')){
                    ratio = +eo.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = eo.target.getAttribute('id');
                    localStorage.setItem('sex',sex)
                }
    
                console.log(ratio,sex);
    
                elements.forEach( el =>{
                    el.classList.remove(activeClass);
                })
    
                eo.target.classList.add(activeClass);
                calcTotal();
            })
        })     
    }

    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');

    function getDunamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input',() =>{

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none'; 
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                break;
                case 'weight':
                    weight = +input.value; 
                    break;
                case 'age':
                    age = +input.value; 
                    break;    
            }
            calcTotal();
        })
        
    }
    getDunamicInformation('#height');
    getDunamicInformation('#weight');
    getDunamicInformation('#age');
};

export default calc;