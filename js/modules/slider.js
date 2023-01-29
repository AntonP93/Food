function slider(){
    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const currSlide = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

   


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide =>{
        slide.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    let dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;    
    `;
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0){
            dot.style.opacity = '1';
        } 
        indicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click',() =>{
        if(offset == +width.replace(/\D/g,'')* (slides.length - 1)){
            offset= 0; 
        } else{
            offset += +width.replace(/\D/g,'');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        (slideIndex == slides.length)?slideIndex = 1 : slideIndex++;
        currSlide.innerHTML = `0${slideIndex}`;

        dots.forEach( dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

        
    })

    prev.addEventListener('click',() =>{
        if( offset== 0){
            offset = +width.replace(/\D/g,'') * (slides.length - 1)
        } else{
            offset -= +width.replace(/\D/g,'');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        (slideIndex == 1)?slideIndex = slides.length: slideIndex--;
        currSlide.innerHTML = `0${slideIndex}`;

        dots.forEach( dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
        
    
    dots.forEach( dot => {
        dot.addEventListener('click', (eo) =>{
            const slideTo = eo.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.slice(0,width.length-2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach( dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

            currSlide.innerHTML = `0${slideIndex}`;
            
        });

    });
};

export default slider;