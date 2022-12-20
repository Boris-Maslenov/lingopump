import './index.html';
import copyHtmlElement from './modules/copyHtml';
import './modules/plyr/plyr.css';
import * as Plyr from './modules/plyr/plyr.min';
import Swiper from 'swiper';
import 'swiper/css';
import './scss/app.scss';
import {friends} from "./modules/friends.js";

const langSrc = {
    French: 'assets/img/french-flag.png',
    German: 'assets/img/german-flag.png',
    Spanish: 'assets/img/spanish-flag.png',
    Italian: 'assets/img/italh-flag.png',
    English: 'assets/img/engl-flag.png',
    Portuguese: 'assets/img/port-flag.png',
}

document.addEventListener('DOMContentLoaded', () => {

    const stepPlayer = new Plyr('audio');

    const swiper = new Swiper('.select-friend', {
        init: false,
        slidesPerView: 'auto',
        // centeredSlides: true,
        spaceBetween: 60,
        // freeMode: true,
    });

    
    copyHtmlElement(768, '.btn_copy', '.first-section__btn', '.from-btn');

 const filter = () => {
    let filtersMap = {
        language: 'all',
        level: 'all',
        theme: 'all',
    }
    const languagesBlock = document.querySelectorAll('.language-check');
    const levelListBlock = document.querySelector('.level-list');
    const themeListBlock = document.querySelector('.theme-list');
    const selectFriendBlock = document.querySelector('.select-friend');

    const getAllThemesLanguagesLevels = (arr) => {
        let result = {
            themes: [],
            levels: [],
            languages: [],
        }
        arr.forEach(element => {
            if('themes' in element){
                Object.values(element.themes).forEach(theme => {
                    const themeToLow = theme.toLowerCase();
                    if(!result.themes.includes(themeToLow)) {
                        result.themes.push(themeToLow)
                    }
                });
                const levelToLow = element.level.toLowerCase();
                const language = element.language;
                if(!result.levels.includes(levelToLow)) {
                    result.levels.push(levelToLow)
                }
                if(!result.languages.includes(language)) {
                    result.languages.push(language)
                }
            }
        });
        return result;
    }

    const friendsArr = getAllThemesLanguagesLevels(friends);

    const renderLevels = () => {
        let resultArr = [];
        const LevelCard = (name, i) => {
            return i === 0 ? 
                    `<li class="level-list__item level-list__item_active">All</li>` : 
                    `<li class="level-list__item">${name}</li>`;
        }

        friendsArr.levels.forEach((level, i) => {
            const qoeue = LevelCard(level, i);
            resultArr.push(qoeue);
        });
        levelListBlock.innerHTML = resultArr.join('');
    }

    const renderThemes = () => {
        let resultArr = [];
        const themeCard = (name, i) => {
            const dataHidden = i < 7 ? '' : 'data-hidden'; 
            return i === 0 ? 
                    `<li class="theme-list__item theme-list__item_active">All</li>` : 
                    `<li ${dataHidden} class="theme-list__item">${name}</li>`;
        }

        friendsArr.themes.forEach((theme, i) => {
            const qoeue = themeCard(theme, i);
            resultArr.push(qoeue);
        });

        themeListBlock.innerHTML = resultArr.join('');
    }

    const renderLanguages = () => {
        let langListOutput = [];
        const lenguagesCard = (src, name, ) => {
            return `<li class="language-check__item">
                        <img src="${src}" alt="${name}">
                        <span>${name}</span>
                    </li>`
        }

        Object.keys(langSrc).forEach(lang => {
            const src = langSrc[lang];
            const step = lenguagesCard(src, lang);
            langListOutput.push(step);
        });

        languagesBlock.forEach(element => {
            element.querySelector('.language-check__list').innerHTML = langListOutput.join('');
        })
    }

    const filterFriends = (arr) => {
        const languagesFilter = (arr) => {
            if(filtersMap.language === 'all') return arr;
            return arr.filter(({language}) => language === filtersMap.language);
        }
        const levelsFilter = (arr) => {
            if(filtersMap.level === 'all') return arr;
            return arr.filter(({level}) => level === filtersMap.level);
        }
        const themesFilter = (arr) => {
            if(filtersMap.theme === 'all') return arr;
            return arr.filter(({theme}) => theme === filtersMap.theme);
        }
        const resultArr = themesFilter( levelsFilter( languagesFilter(arr) ) );
        return resultArr;
    }

    //filterFriends(friends)
    const renderFriends = ( arr ) => {
        let resultArr = [];
        const swiperCard = (html) => {
            return `<div class="swiper-wrapper">${html}</div>`;
        }

        const friendCard = (src, name, level, id) => {
            return `<div class="swiper-slide">
                        <div data-id=${id} class="friend-info">
                            <div class="friend-info__status">
                                <img src="${src}" alt="${name}" class="friend-info__avatar">
                            </div>
                            <span class="friend-info__name">${name}</span>
                            <span class="friend-info__level">Level: ${level}</span>
                        </div>
                    </div>`;
            
        }

        arr.forEach(({name, level, photo, id}) => {
            const qoeue = friendCard(photo, name, level, id);
            resultArr.push(qoeue);
        });

        return selectFriendBlock.innerHTML = swiperCard(resultArr.join(''));
    }


    const renderFriendInfo = ({name, level, result, photo, msg, audio, themes}) => {
        const parent = document.querySelector('.view-friend');
        const friendAvatar = parent.querySelector('.friend-info__avatar');
        const friendName = parent.querySelector('.friend-info__name');
        const friendLevel = parent.querySelector('.friend-info__level');
        const friendMsg = parent.querySelector('.phrase');
        const friendResult = parent.querySelector('.friend-result');
        const friendTheme = parent.querySelector('.friend-theme');
        const friendAudio = parent.querySelector('audio > source');

        friendAvatar.setAttribute('src', photo);
        friendName.innerHTML = name;
        friendLevel.innerHTML = level;
        friendMsg.innerHTML = msg;
        friendResult.innerHTML = result;
        friendTheme.innerHTML = Object.values(themes).join(', ') ;
        // friendAudio.setAttribute('src', audio);
        // stepPlayer = new Plyr('audio');
        stepPlayer.source = {
            type: 'audio',
            sources: [
              {
                src: audio,
                type: 'audio/mp3',
              }
            ],
          };

    }

    renderLanguages();   
    // render languages end
    renderLevels();
     // render Levels end
    renderThemes();
    // render Themes end
    renderFriends( filterFriends(friends) );


    selectFriendBlock.addEventListener('click', (e) => {
        const target = e.target
        if( target.closest('.friend-info') ){
            const parent = target.closest('.friend-info');
            const dataId = +parent.getAttribute('data-id');
            const friend = friends.find((data) => data.id === dataId );
            if(friend){
                renderFriendInfo(friend);
            }
        }
    });


}

filter();

swiper.init();


});