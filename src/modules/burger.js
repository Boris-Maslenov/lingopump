const burger = () => {
  const breakPoint = 768;
  const buttonClass = "hamburger";
  const activeClass = "hamburger_active";
  const button = document.querySelector(`.${buttonClass}`);
  const content = document.querySelector(".js-burger-menu");

  const closed = () => {
    document.documentElement.style.overflow = "";
    button.classList.remove(activeClass);
    content.classList.remove("header__menu_active");
  };

  const open = () => {
    if (window.innerWidth <= breakPoint) {
      if (
        !button.matches(`.${activeClass}`) &&
        !content.matches(".header__menu_active")
      ) {
        document.documentElement.style.overflow = "hidden";
        button.classList.add(activeClass);
        content.classList.add("header__menu_active");
      } else {
        closed();
      }
    }
  };

  button.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });

  return closed;
};
export default burger;
