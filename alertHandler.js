function raiseAlert(titleInput, info, type, finish) {
    finalType = type;
    const alert = document.querySelector('.alert');
    const title = document.querySelector('.alert-title');
    const desc = document.querySelector('.alert-description');
    title.textContent = titleInput;
    desc.textContent = info;

    alert.className = `${finalType} alert glassy basic privacy alert-shown`;    
    let timeout = finish;
    if (!timeout) timeout = 5000;
    setTimeout(() => {
        alert.className = 'alert glassy basic privacy';
    }, timeout)
}
function zoomBox(zoom) {
    document.querySelector('.zoom-text').innerHTML = `${zoom}%`;
}