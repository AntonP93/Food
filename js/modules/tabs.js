function tabs(tabsSelector,tabsContentSrlector,tabsParentSelector,activeClass) {
    const tabItem = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSrlector), 
          tabsParent = document.querySelector(tabsParentSelector);
    

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });

        tabItem.forEach(item => {
            item.classList.remove(activeClass)
        })
    }    
    
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabItem[i].classList.add(activeClass)
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', function(EO){
        const target = EO.target;
        
        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabItem.forEach((item,i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
        
    })
}

export default tabs;