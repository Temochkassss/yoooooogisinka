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

    // а эт таймер))))))))

    let deadline = '2022-06-01'; //задали конечную дата

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), //из даты дедлайна вычли дату сейчас и получили t 
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));
        // hours = Math.floor((t/1000/60/60) % 24), //2 способ записать часы
        // days = Math.floor((t/(1000*60*60*24)));

        return { //говорим функции что она нам должна что-то вернуть, результаат + {} МЫ СОЗДАЁМ OBJ
            'total' : t, //вычленяет полностью время
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) { //мы по id и будем вызывать нашу функцию
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),//пишем timer потому что ищем только там а не во всём доке
            minutes = timer.querySelector('.minutes'),//selector получает первый элемент с таким классом
            seconds = timer.querySelector('.seconds');
        let timeInerval = setInterval(updateClock, 1000); //мы эту фунцию будем вызывать каждую секунду


        function updateClock () {
            let t = getTimeRemaining(endtime);//наводя на obj t мы видим всё что в ней находится
            // hours.textContent = t.hours; // мы через . в t вызываем её элемент
            // minutes.textContent = t.minutes;
            // seconds.textContent = t.seconds;
            function zeroTimerNone (num) {//и этот аргумент num мы ниже вписываем t. ...
                if (num<=9) { // то есть если в панеле часов <=9 то
                    return '0' + num //мы к этому числу приписываем 0
                } else { //если всё ок то
                    return num; //просто возвращаем num
                };
            }
            hours.textContent = zeroTimerNone(t.hours); // мы через . в t вызываем её элемент
            minutes.textContent = zeroTimerNone(t.minutes);// я про вот эту фтучку
            seconds.textContent = zeroTimerNone(t.seconds);

            if (t.total <= 0) { //когда всё приравняется к 0 то 
                clearInterval(timeInerval);//остановится интервал, для этого мы и задали let
                hours.textContent = '00'; 
                minutes.textContent = '00';
                seconds.textContent = '00';
            }

        };

        
       
    }

    setClock('timer', deadline);//там мы записали эти 2 аргумента тут мы их обозначили!!!!!!

    //Modal(модельное окно)

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';//принимает блочную модель
        this.classList.add('more-splash');
     //чтобы при открытии нельзы было листать дальше сайт то пишем:
        document.body.style.overflow = 'hidden';//запрещаем прокрутку страницы !!
    });
    close.addEventListener('click', function() {
        more.classList.remove('more-splash');//не this ведь мы уже удаляем у more
        overlay.style.display = 'none';
        document.body.style.overflow = '';//отменяем запрет
    });



});