const showMore = () => {
  const getAllThemesButton = document.querySelector(".chose-theme__show-more");
  const itemsAll = document.querySelectorAll(".theme-list .theme-list__item");
  let themeButtonStatus;
  getAllThemesButton.addEventListener("click", () => {
    if (!themeButtonStatus) {
      themeButtonStatus = true;
      getAllThemesButton.textContent = "hidden more";
      itemsAll.forEach((elem, i) => {
        setTimeout(() => {
          elem.removeAttribute("data-hidden");
        }, i * 5);
      });
    } else {
      themeButtonStatus = false;
      getAllThemesButton.textContent = "show more";
      itemsAll.forEach((elem, i) => {
        if (i > 6) {
          setTimeout(() => {
            elem.setAttribute("data-hidden", "");
          }, i * 5);
        }
      });
    }
  });
};

export default showMore;
