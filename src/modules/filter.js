import scrollLogic from "./scrollLogic";
import * as resource from "./resource";

export const filter = (friends, slider, player, scroll) => {
  let selectFriend;

  let filtersMap = {
    language: "all",
    level: "all",
    theme: "all",
  };
  const langSrc = {
    French: "assets/img/french-flag.png",
    German: "assets/img/german-flag.png",
    Spanish: "assets/img/spanish-flag.png",
    Italian: "assets/img/italh-flag.png",
    English: "assets/img/engl-flag.png",
    Portuguese: "assets/img/port-flag.png",
  };

  const playAudio = document.querySelector(".audio-button-mob-only");
  const playAudioIcon = playAudio.querySelector(".audio-button-mob-only__icon");
  playAudio.addEventListener("click", () => {
    const iconDefault = "assets/img/speaker.png";
    const iconActive = "assets/img/speaker.gif";
    if (playAudio.matches(".play")) {
      playAudio.classList.remove("play");
      playAudioIcon.setAttribute("src", iconDefault);
      player.pause();
    } else {
      playAudio.classList.add("play");
      player.play();
      playAudioIcon.setAttribute("src", iconActive);
    }
  });

  const languagesBlock = document.querySelectorAll(".language-check");
  const levelListBlock = document.querySelector(".level-list");
  const themeListBlock = document.querySelector(".theme-list");
  const selectFriendBlock = document.querySelector(
    ".select-friend .swiper-wrapper"
  );

  const getAllThemesLanguagesLevels = (arr) => {
    let result = {
      themes: [],
      levels: [],
      languages: [],
    };
    arr.forEach((element) => {
      if ("themes" in element) {
        Object.values(element.themes).forEach((theme) => {
          const themeToLow = theme.toLowerCase();
          if (!result.themes.includes(themeToLow)) {
            result.themes.push(themeToLow);
          }
        });
        const levelToLow = element.level.toLowerCase();
        const language = element.language;
        if (!result.levels.includes(levelToLow)) {
          result.levels.push(levelToLow);
        }
        if (!result.languages.includes(language)) {
          result.languages.push(language);
        }
      }
    });
    return result;
  };

  const friendsArr = getAllThemesLanguagesLevels(friends);

  const renderLevels = () => {
    let resultArr = [];
    resultArr.push(
      "<li data-filter='level' data-value='all' class='level-list__item level-list__item_active'>All</li>"
    );
    const LevelCard = (name, i) => {
      return `<li data-filter='level' data-value="${name}" class="level-list__item">${name}</li>`;
    };

    friendsArr.levels.forEach((level, i) => {
      const qoeue = LevelCard(level, i);
      resultArr.push(qoeue);
    });

    levelListBlock.innerHTML = resultArr.join("");
  };

  const renderThemes = () => {
    let resultArr = [];
    resultArr.push(
      "<li data-filter='theme' data-value='all' class='theme-list__item theme-list__item_active'>ALL</li>"
    );
    const themeCard = (name, i) => {
      const dataHidden = i < 7 ? "" : "data-hidden";
      return `<li ${dataHidden} data-filter='theme' data-value="${name}" class="theme-list__item">${name}</li>`;
    };

    friendsArr.themes.forEach((theme, i) => {
      const qoeue = themeCard(theme, i);
      resultArr.push(qoeue);
    });

    themeListBlock.innerHTML = resultArr.join("");
  };

  const renderLanguages = () => {
    let langListOutput = [];
    const lenguagesCard = (src, name) => {
      return `<li data-filter='language' data-value="${name}" class="language-check__item">
                        <img src="${src}" alt="${name}">
                        <span>${name}</span>
                    </li>`;
    };

    Object.keys(langSrc).forEach((lang) => {
      const src = langSrc[lang];
      const step = lenguagesCard(src, lang);
      langListOutput.push(step);
    });

    languagesBlock.forEach((element) => {
      element.querySelector(".language-check__list").innerHTML =
        langListOutput.join("");
    });
  };

  const filterFriends = (arr) => {
    const languagesFilter = (arr) => {
      if (filtersMap.language === "all") return arr;
      return arr.filter(({ language }) => language === filtersMap.language);
    };
    const levelsFilter = (arr) => {
      if (filtersMap.level === "all") return arr;
      return arr.filter(
        ({ level }) => level.toLowerCase() === filtersMap.level
      );
    };
    const themesFilter = (arr) => {
      if (filtersMap.theme === "all") return arr;
      return arr.filter(({ themes }) =>
        Object.values(themes).includes(filtersMap.theme)
      );
    };
    const resultArr = themesFilter(levelsFilter(languagesFilter(arr)));

    resultArr.length > 0 ? renderFriendInfo(resultArr[0]) : null;

    return resultArr;
  };

  const renderFriends = (arr) => {
    let resultArr = [];
    const swiperCard = (html) => {
      return `${html}`;
    };

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
    };

    arr.forEach(({ name, level, photo, id }) => {
      const qoeue = friendCard(photo, name, level, id);
      resultArr.push(qoeue);
    });

    return (selectFriendBlock.innerHTML = swiperCard(resultArr.join("")));
  };

  const renderFriendInfo = ({
    name,
    level,
    result,
    photo,
    msg,
    audio,
    themes,
  }) => {
    selectFriend = name;
    playAudio.classList.remove("play");
    const parent = document.querySelector(".view-friend");
    const friendAvatar = parent.querySelector(".friend-info__avatar");
    const friendName = parent.querySelector(".friend-info__name");
    const friendLevel = parent.querySelector(".friend-info__level");
    const friendMsg = parent.querySelector(".phrase");
    const friendResult = parent.querySelector(".friend-result");
    const friendTheme = parent.querySelector(".friend-theme");
    friendAvatar.setAttribute("src", photo);
    friendName.innerHTML = name;
    friendLevel.innerHTML = level;
    friendMsg.innerHTML = msg;
    friendResult.innerHTML = result;
    friendTheme.innerHTML = Object.values(themes).join(", ");
    player.source = {
      type: "audio",
      sources: [
        {
          src: audio,
          type: "audio/mp3",
        },
      ],
    };
  };

  renderLanguages();
  renderLevels();
  renderThemes();
  renderFriends(filterFriends(friends));
  renderFriendInfo(friends[0]);

  selectFriendBlock.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".friend-info")) {
      const parent = target.closest(".friend-info");
      const dataId = +parent.getAttribute("data-id");
      const friend = friends.find((data) => data.id === dataId);
      if (friend) {
        renderFriendInfo(friend);
        selectFriendBlock
          .querySelectorAll(".friend-info .friend-info__status")
          .forEach((elem) =>
            elem.classList.remove("friend-info__status_active")
          );
        parent
          .querySelector(".friend-info__status")
          .classList.add("friend-info__status_active");
        scrollLogic();
      }
    }
    if (target.closest(".language-check_first")) {
      console.log("language-check_first");
    }
  });

  const filtersElements = document.querySelectorAll(".js-filter");
  filtersElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      const target = e.target;
      const filterItem = target.closest("[data-filter]");
      if (filterItem) {
        const parent = target.closest(".js-filter");
        const allFilterElements = parent.querySelectorAll("[data-filter]");
        let classActive;
        allFilterElements.forEach((element) => {
          classActive = element.classList[0] + "_active";
          element.classList.remove(classActive);
        });
        filterItem.classList.add(classActive);
        const dataFilter = filterItem.getAttribute("data-filter");
        const dataValue = filterItem.getAttribute("data-value");
        if (filtersMap[dataFilter] === dataValue) return;
        filtersMap[dataFilter] = dataValue;
        renderFriends(filterFriends(friends));
        slider.init();
        scrollLogic();
      }
    });
  });

  const firstSelectLanguage = () => {
    const langItemsFirst = document.querySelectorAll(
      ".first-section  .language-check__item"
    );
    const langItemsMain = document.querySelectorAll(
      ".friend .language-check__item"
    );
    langItemsFirst.forEach((elem, i) => {
      elem.addEventListener("click", () => {
        if (elem.getAttribute("data-filter") === "language") {
          filtersMap.language = elem.getAttribute("data-value");
          renderFriends(filterFriends(friends));
          langItemsMain.forEach((elem) => {
            elem.classList.remove("language-check__item_active");
          });
          langItemsMain[i].classList.add("language-check__item_active");
          scroll("#choose-speaker", 0.5);
        }
      });
    });
  };

  firstSelectLanguage();

  const outputLanguage = (name, pic) => {
    const selectedLanguageName = document.querySelector(
      ".selected-language__name"
    );
    const selectedLanguagePic = document.querySelector(
      ".selected-language__pic"
    );
    selectedLanguageName.textContent = name;
    selectedLanguagePic.setAttribute("src", pic);
  };

  const outputSpeaker = (friend) => {
    const select = document.querySelector("#select-speaker");
    const option = select.querySelector("option");
    option.value = friend;
    option.textContent = friend;
    option.selected = true;
  };

  const chooseFriend = () => {
    const buttons = document.querySelectorAll(".js-choose-friend");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        outputLanguage(filtersMap.language, langSrc[filtersMap.language]);
        outputSpeaker(selectFriend);
      });
    });
  };

  chooseFriend();
};
