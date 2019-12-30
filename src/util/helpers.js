export function setPageRecursive(currentIndex, prevIndex, elem) {
    let index = currentIndex;
    if (index > prevIndex) {
        elem.next();
        index--;
        setPageRecursive(index, prevIndex, elem);
    } else if (index < prevIndex) {
        elem.prev();
        index++;
        setPageRecursive(index, prevIndex, elem);
    }
}