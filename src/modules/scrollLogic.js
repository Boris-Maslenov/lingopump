import scroll from "./scroll";

const scrollLogic = () => {
  const sectionHeight = document.querySelector(".friend").clientHeight;
  const documentHeight = document.documentElement.clientHeight;
  if (documentHeight < sectionHeight) {
    scroll("#to-top", 1);
  }
};

export default scrollLogic;
