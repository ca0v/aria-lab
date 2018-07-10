"use strict";
function expand(element) {
    element.classList.toggle("collapsed");
    var isCollapsed = element.classList.contains("collapsed");
    element.setAttribute("aria-expanded", (!isCollapsed) + "");
    element.setAttribute("aria-pressed", (!isCollapsed) + "");
}
function asArray(items) {
    var result = new Array(items.length);
    for (var i = 0; i < items.length; i++) {
        result[i] = items.item(i);
    }
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
    asArray(document.getElementsByClassName("collapsed")).forEach(function (collapsedItem) {
        collapsedItem.setAttribute("aria-expanded", "false");
        collapsedItem.setAttribute("tabindex", "0");
        hookup(collapsedItem);
    });
}
run();
