window.addEventListener('DOMContentLoaded',function(){

    const tabItem = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'), 
          tabsParent = document.querySelector('.tabheader');
    

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });

        tabItem.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }    
    
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabItem[i].classList.add('tabheader__item_active');
        
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', function(EO){
        const target = EO.target;
        
        if(target && target.classList.contains('tabheader__item')){
            tabItem.forEach((item,i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
        
    })

    //Timer

    const endIvent = '2023-02-11';

    function getRemaining(endtime){

        let days,hours,minutes,seconds;
        const total = Date.parse(endtime) - Date.parse(new Date());

        if(total <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;    
        } else {
            days = Math.floor( total/(1000 * 60 * 60 * 24)),
            hours = Math.floor( (total/(1000 * 60 * 60))% 24),
            minutes = Math.floor( (total/(1000 * 60))% 60),
            seconds = Math.floor( (total/1000) % 60);
        }
        return {total,days,hours,minutes,seconds}
    }    


    function addZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else{
            return num;
        }
    }
    function setClock(selector,endIvent) {
        const timer = document.querySelector(selector);
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock,1000);

        updateClock();    

        
        function updateClock(){
            const t = getRemaining(endIvent);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if(t.total <= 0 ){
                clearInterval(timeInterval);
            }
        }                  
    }
    setClock('.timer',endIvent);

    //Modal

    const modalTabBtn = document.querySelectorAll('[data-modal]');
    const modalTab = document.querySelector('.modal');
    
    
    modalTabBtn.forEach((btn)=>{
        btn.addEventListener('click', modalOpen)
    })    
    function modalOpen(){
        modalTab.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function modalClose(){
        modalTab.style.display = 'none';
        document.body.style.overflow = '';     
    }
    
    modalTab.addEventListener('click', function(EO){
        if(EO.target === modalTab || EO.target.getAttribute('data-close')=='close'){
            modalClose();    
        }
    })

    function openModalbyscroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
            modalOpen();
            window.removeEventListener('scroll',openModalbyscroll);
        }
    }

    window.addEventListener('scroll',openModalbyscroll);


    //class card

    class MenuCard{
        constructor(img,alt,title,dscr,price,parentSelector){
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.dscr = dscr;
            this.price = price;
            this.parent =document.querySelector(parentSelector);
            this.transfer = 2.6;
            this.changtToBLR();
        }

        changtToBLR(){
            this.price = this.price * this.transfer;
        }
        render(){
            const element = document.createElement('div');
            element.innerHTML = ` 
            <div class="menu__item">
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                <div class="menu__item-descr">${this.dscr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> бел.руб/день</div>
                </div>
            </div>`
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        1,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        2,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        0.5,
        '.menu .container'
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');

    const massage ={
        loading: 'Загрузка',
        success: 'Спасибо! С вами свяжутся в ближайшее время',
        failure: 'Ошибка!'        
    }

    forms.forEach(item =>{
        postData(item);
    })

    function postData(form){
        form.addEventListener('submit',(e) =>{
            e.preventDefault();

            const statusMassage = document.createElement('div');
            statusMassage.classList.add('status');
            statusMassage.textContent = massage.loading;
            form.append(statusMassage);

           


            const formData = new FormData(form);
            const obj ={};
            formData.forEach(function(value,key){
                obj[key] = value;
            });

            fetch('server1.php',{
                method: 'POST',
                headers:{
                    'Content-type':'application/json'    
                },
                body: JSON.stringify(obj)   
            }).then(data => data.text())
            .then(data => {
                console.log(data)
                showThanksModal(massage.success);
                form.reset();
                statusMassage.remove();
            }).catch(() =>{
                showThanksModal(massage.failure);
                form.reset();
                statusMassage.remove();    
            }).finally(() =>{
                form.reset();
            })  

            // request.addEventListener('load',()=>{
            //     if(request.status === 200){
            //         console.log(request.response)
            //         showThanksModal(massage.success);
            //         form.reset();
            //         statusMassage.remove();
            //     } else {
            //         showThanksModal(massage.failure);
            //         form.reset();
            //         statusMassage.remove();
            //     }
            // })
        })
    }

    function showThanksModal(massage){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        modalOpen();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class =  "modal__close">×</div> 
                <div class = "modal__title">${massage}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose();
        },2000)
    }

    // fetch('https://jsonplaceholder.typicode.com/posts',
    // {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Antomos'}),
    //     headers:{
    //         'Content-type': 'application/json'
    //     }
    // })
    //   .then(response => response.json()) //ответ
    //   .then(json => console.log(json))

})