import './index.html';
import copyHtmlElement from './modules/copyHtml';
import './modules/plyr/plyr.css';
import * as Plyr from './modules/plyr/plyr.min';
import Swiper from 'swiper';
import 'swiper/css';
import './scss/app.scss';
import {friends} from "./modules/friends.js";
import { filter } from './modules/filter';
import scroll from './modules/scroll';
import showMore from './modules/showMore';
import burger from './modules/burger';

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.select-friend', {
        init: false,
        slidesPerView: 'auto',
        spaceBetween: 60,
        observer: true,
        centeredSlides: true,
    });
    const stepPlayer = new Plyr('audio');
    copyHtmlElement(768, '.btn_copy', '.first-section__btn', '.from-btn');
    filter(friends, swiper, stepPlayer, scroll);
    swiper.init();
    showMore();
    const mobileMenu = burger();
    scroll('', 0.5, mobileMenu);
});