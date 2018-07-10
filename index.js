"use strict";
function expand(element) {
    element.classList.toggle("collapsed");
    var isCollapsed = element.classList.contains("collapsed");
    element.setAttribute("aria-expanded", (!isCollapsed) + "");
    element.setAttribute("aria-pressed", (!isCollapsed) + "");
    return !isCollapsed;
}
function asArray(items) {
    var result = new Array(items.length);
    for (var i = 0; i < items.length; i++) {
        result[i] = items.item(i);
    }
    return result;
}
function createExpander(anchor) {
    var result = document.createElement("input");
    result.type = "button";
    result.classList.add("expander", "collapsed");
    result.setAttribute("aria-label", anchor.innerText);
    result.addEventListener("click", function () {
        expand(result);
        expand(anchor);
    });
    return result;
}
function hookup(item) {
    item.addEventListener("click", function (event) {
        expand(item);
        event.preventDefault();
    });
    item.addEventListener("keypress", function (event) {
        if (event.keyCode === 13)
            expand(item);
        event.preventDefault();
    });
}
function run() {
    asArray(document.getElementsByClassName("label")).forEach(function (anchor) {
        anchor.setAttribute("aria-expanded", "false");
        anchor.setAttribute("tabindex", "0");
        anchor.classList.add("collapsed");
        var expander = createExpander(anchor);
        if (anchor.parentElement) {
            anchor.parentElement.insertBefore(expander, anchor);
        }
        anchor.addEventListener("click", function () { return console.log(anchor.outerHTML); });
    });
}
run();
