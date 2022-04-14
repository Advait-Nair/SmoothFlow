function drag(element, target){
    let isActivitated = false;
    element.addEventListener('mousedown', e => {
        if(!isActivitated)
        isActivitated = true;
        else isActivitated = false;
    })
    document.addEventListener('mousemove', e => {
        console.log(isActivitated);
        if(isActivitated) {
            const percentageX = ( e.clientX / window.innerWidth );
            console.log(percentageX, window.innerWidth, e.clientX);
            target.style.width = `${percentageX * 100}%`;
        }
    })
}