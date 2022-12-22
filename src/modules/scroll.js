const scroll = (to = null, speed = 0.3, fn) => {
  let links = document.querySelectorAll("[scroll]");

  if (!to) {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (fn) fn();
        scrolling(e);
      });
    });
  }

  function scrolling(e) {
    let scrollTop = document.documentElement.scrollTop;
    let hash = to || e.target.hash;
    let toBlock = document.querySelector(hash).getBoundingClientRect().top;
    let start = null;
    requestAnimationFrame(step);
    function step(time) {
      if (!start) start = time;
      let progress = time - start;
      let r =
        toBlock < 0
          ? Math.max(scrollTop - progress / speed, scrollTop + toBlock)
          : Math.min(scrollTop + progress / speed, scrollTop + toBlock);
      document.documentElement.scrollTo(0, r);
      if (r !== scrollTop + toBlock) {
        requestAnimationFrame(step);
      }
    }
  }

  if (to) {
    scrolling();
  }
};

export default scroll;
