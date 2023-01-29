import  tabs from './modules/tabs';
import  modal from './modules/modal';
import  timer from './modules/timer';
import  forms from './modules/forms';
import  calc from './modules/calc';
import  cards from './modules/cards';
import  slider from './modules/slider';

window.addEventListener('DOMContentLoaded',function(){
    modal('[data-modal]','.modal');
    tabs('.tabheader__item','.tabcontent','.tabheader','tabheader__item_active');
    timer('.timer','2023-03-11');
    forms();
    calc();
    cards();
    slider();
    
})