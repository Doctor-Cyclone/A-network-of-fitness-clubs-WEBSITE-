const inputValidation = () => {
    const inputName = document.querySelectorAll('[name = "name"]'),
        inputPhone = document.querySelectorAll('[name = "phone"]');

    const phoneCheck = (phoneLength, item) => {
        if(phoneLength[0] !== '7' && phoneLength[0] !== '8' && (phoneLength.length > 11 || phoneLength.length < 7)){
            item.setCustomValidity(`Номер телефона должен начинаться с 8 или 7!
                    Вы ввели ${phoneLength.length} цифр. Количество цифр должно быть в диапазоне от 7 до 11!`);
        } else if(phoneLength.length > 11 || phoneLength.length < 7){
            item.setCustomValidity(`Вы ввели ${phoneLength.length} цифр. Количество цифр должно быть в диапазоне от 7 до 11!`);
        } else if(phoneLength[0] !== '7' && phoneLength[0] !== '8'){
            item.setCustomValidity(`Номер телефона должен начинаться с 8 или 7!`);
        } else {
            item.setCustomValidity(``);
        }
    };

    const blurRegExp = (item) => {
        item.addEventListener('blur', () =>{
            item.value = item.value.replace(/\-{2,}/g, '-');
            item.value = item.value.replace(/\s{2,}/g, ' ');
            item.value = item.value.replace(/\+{2,}/g, '+');
            item.value = item.value.replace(/\({2,}/g, '(');
            item.value = item.value.replace(/\){2,}/g, ')');
            item.value = item.value.replace(/^[\s]+|[ \s]+$/, '');
            item.value = item.value.replace(/^[/-]+|[/-]+$/, '');

            if(item.getAttribute('name') === 'name'){
                //Минимум два символа
                if(/\D{2}/g.test(item.value)){
                    //Первый буквы слов в верхнем регистре
                    const newArr = item.value.split(' ').map( item => {
                        return item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
                    });
                    item.value = newArr.join(' ');
                } else {
                    item.value = '';
                }                
            }
            if(item.getAttribute('name') === 'phone'){
                item.value = item.value.replace(/\-{1,}/g, '');
                item.value = item.value.replace(/\s{1,}/g, '');
                item.value = item.value.replace(/\+{1,}/g, '');
                item.value = item.value.replace(/\({1,}/g, '');
                item.value = item.value.replace(/\){1,}/g, '');
            }
        });
    };

    const validation = (item) => {
        if(item.getAttribute('name') === 'name'){
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-яё\- ]/gi, '');
            });
            blurRegExp(item);
        } else {
            item.addEventListener('input', () =>{
                item.value = item.value.replace(/[^-()\d\+ ]/g, '');
                phoneCheck(item.value, item);
            });
            blurRegExp(item);
        }
    };

    inputName.forEach( item => {
        validation(item);
    });

    inputPhone.forEach( item => {
        validation(item);
    });
};

export default inputValidation;