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
    
})