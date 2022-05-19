window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'), //прописали родителя для элементов выше
        tabContent = document.querySelectorAll('.info-tabcontent'); //мы fade не пишем

    //1)сейчас мы скрываем всё начиная с 1
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show'); //так мы будем использовать каждый тап
            tabContent[i].classList.add('hide'); //но шоу нам мало мы 2 раз всё удаляем

        }
    }

    hideTabContent(1); // 1 вместо а и все контенты кроме первого скрываются

    //2)сейчас мы показываем контентики
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) /*проверяем действительно ли этот элемент скрыт*/ {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    //3)назначаем обработчики для кнопочек
    info.addEventListener('click', function (event) { //применяем к родителю через делегирование
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for ( let i = 0; i < tab.length; i++) { //она закончится только тогда когда табы закончатся
                if (target == tab[i]) { //если таргет совпадает с табом то выполняем...
                    hideTabContent(0);
                    showTabContent(i); //смотри выше
                    break;
                }
            }
        }
    });

});