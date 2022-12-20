const copyHtmlElement = function(breakpoint, copyElementSelector, copyFromSelector, copyWhereSelector) {
    const copyElement = document.querySelector(copyElementSelector),
        copyFromElement = document.querySelector(copyFromSelector),
        pastElement = document.querySelector(copyWhereSelector);
    let copyEnable = true;

    if (document.documentElement.clientWidth < breakpoint) {
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

export default copyHtmlElement;