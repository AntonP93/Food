import { modalClose,modalOpen } from "./modal";
import { postData } from "../services/services";
function forms(){
    const forms = document.querySelectorAll('form');

    const massage ={
        loading: 'Загрузка',
        success: 'Спасибо! С вами свяжутся в ближайшее время',
        failure: 'Ошибка!'        
    }

    forms.forEach(item =>{
        bindpostData(item);
    })

    

    function bindpostData(form){
        form.addEventListener('submit',(e) =>{
            e.preventDefault();

            const statusMassage = document.createElement('div');
            statusMassage.classList.add('status');
            statusMassage.textContent = massage.loading;
            form.append(statusMassage);

           


            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests',json)
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

        })
    }

    function showThanksModal(massage){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        modalOpen('.modal');

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
            modalClose('.modal');
        },2000)
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
};

export default forms;