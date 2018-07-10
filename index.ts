function expand(element: Element) {
    element.classList.toggle("collapsed");
    let isCollapsed = element.classList.contains("collapsed");
    element.setAttribute("aria-expanded", (!isCollapsed) + "");
    element.setAttribute("aria-pressed", (!isCollapsed) + "");
}

function asArray<T extends Element>(items: HTMLCollectionOf<T> | NodeListOf<T>) {
    let result = new Array(items.length) as Array<T>;
    for (let i = 0; i < items.length; i++) {
        result[i] = items.item(i);
    }
    return result;
}

function hookup(item: Element) {

    item.addEventListener("click", event => {
        expand(item);
        event.preventDefault();
    });

    item.addEventListener("keypress", event => {
        if (event.keyCode === 13) expand(item);
        event.preventDefault();
    });
}

function run() {
    asArray(document.getElementsByClassName("collapsed")).forEach(collapsedItem => {
        collapsedItem.setAttribute("aria-expanded", "false");
        collapsedItem.setAttribute("tabindex", "0");
        hookup(collapsedItem);
    });
}

run();