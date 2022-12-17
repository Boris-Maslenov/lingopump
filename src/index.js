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

});