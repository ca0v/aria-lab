function expand(element: Element) {
    element.classList.toggle("collapsed");
    let isCollapsed = element.classList.contains("collapsed");
    element.setAttribute("aria-expanded", (!isCollapsed) + "");
    element.setAttribute("aria-pressed", (!isCollapsed) + "");
    return !isCollapsed;
}

function asArray<T extends Element>(items: HTMLCollectionOf<T> | NodeListOf<T>) {
    let result = new Array(items.length) as Array<T>;
    for (let i = 0; i < items.length; i++) {
        result[i] = items.item(i);
    }
    return result;
}

function createExpander(anchor: HTMLElement) {
    let result = document.createElement("input");
    result.type = "button";
    result.classList.add("expander", "collapsed");
    result.setAttribute("aria-label", anchor.innerText);
    result.addEventListener("click", () => {
        expand(result);
        expand(anchor);
    });
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

function clickable(element: HTMLElement) {
    element.addEventListener("keypress", event => {
        (event.keyCode === 13) && element.click();
        switch (event.key) {
            case " ":
                element.click();
                break;
        }
    });
}

function run() {
    asArray(document.getElementsByTagName("label")).forEach(anchor => {
        anchor.setAttribute("tabindex", "0");
        anchor.setAttribute("role", "link");
        expand(anchor);
        let expander = createExpander(anchor);
        if (anchor.parentElement) {
            anchor.parentElement.insertBefore(expander, anchor);
        }
        anchor.addEventListener("click", () => console.log(anchor.outerHTML));
        clickable(anchor);
    });
}

run();