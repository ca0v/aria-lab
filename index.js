"use strict";
function expand(element) {
    element.classList.toggle("collapsed");
    var isCollapsed = element.classList.contains("collapsed");
    element.setAttribute("aria-expanded", !isCollapsed + "");
    element.setAttribute("aria-pressed", !isCollapsed + "");
}
function asArray(items) {
    var result = new Array(items.length);
    for (var i = 0; i < items.length; i++) {
        result[i] = items.item(i);
    }
    return result;
}
asArray(document.getElementsByClassName("collapsed")).forEach(function (item) {
    var doit = function (event) {
        expand(item);
        event.preventDefault();
        return false;
    };
    [item.getElementsByTagName("label").item(0)].forEach(function (label) {
        label.addEventListener("click", doit);
        label.addEventListener("keypress", function (event) {
            if (event.keyCode != 13)
                return;
            doit(event);
        });
    });
});
