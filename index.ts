function expand(element: Element) {
    element.classList.toggle("collapsed");
    let isCollapsed = element.classList.contains("collapsed");
    element.setAttribute("aria-expanded", !isCollapsed + "");
    element.setAttribute("aria-pressed", !isCollapsed + "");
}

function asArray<T extends Element>(items: HTMLCollectionOf<T>) {
    let result = new Array(items.length) as Array<T>;
    for (let i = 0; i < items.length; i++) {
        result[i] = items.item(i);
    }
    return result;
}

asArray(document.getElementsByClassName("collapsed")).forEach(item => {
    let doit = function (event: UIEvent) {
        expand(item);
        event.preventDefault();
        return false;
    };

    [item.getElementsByTagName("label").item(0)].forEach(function (label) {
        label.addEventListener("click", doit);
        label.addEventListener("keypress", function (event) {
            if (event.keyCode != 13) return;
            doit(event);
        });
    });
});
