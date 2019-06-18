
document.addEventListener('click', function (event) {
    // Kill the event
    event.preventDefault();
    event.stopPropagation();
    let el = event.target
    if (el) {

        while (el.getAttribute('data-id') == null && el.parentElement != null) {
            el = el.parentElement
        }
        let guid = el.getAttribute('data-id')
        if (guid != null) {
            location.href = `${originalOrigin}/puzzle?guid=${guid}`
        }
    }
}, true
);