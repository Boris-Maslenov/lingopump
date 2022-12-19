import './index.html';
import './modules/plyr/plyr.css';
import * as Plyr from './modules/plyr/plyr.min';
import Swiper from 'swiper';
import 'swiper/css';
import './scss/app.scss';

document.addEventListener('DOMContentLoaded', () => {

    const stepPlayer = new Plyr('audio', {
        settings: [],
    });

    const swiper = new Swiper('.select-friend', {
        // init: false,
        slidesPerView: 'auto',
        // centeredSlides: true,
        spaceBetween: 60,
        // freeMode: true,
    });

    //swiper.init();

    const copyHtmlElement = function(breakpoint, copyElementSelector, copyFromSelector, copyWhereSelector) {
        const copyElement = document.querySelector(copyElementSelector),
            copyFromElement = document.querySelector(copyFromSelector),
            pastElement = document.querySelector(copyWhereSelector);
            console.log(copyElement, copyFromElement, pastElement);
        let copyEnable = true;
    
        if (document.documentElement.clientWidth < breakpoint) {
            console.log('true')
            pastElement.append(copyElement);
            copyEnable = false;
        }
    
        window.addEventListener('resize', () => {
            if (document.documentElement.clientWidth < breakpoint) {
                if (copyEnable) {
                    pastElement.append(copyElement);
                    copyEnable = false;
                }
            } else {
                if (!copyEnable && pastElement.querySelector(copyElementSelector)) {
                    copyFromElement.append(pastElement.querySelector(copyElementSelector));
                    copyEnable = true;
                }
            }
    
        });
    }
    
    copyHtmlElement(768, '.btn_copy', '.first-section__btn', '.from-btn');

    
    
});