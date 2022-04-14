
// Function that automatically creates additional styling
function style(selector, property, value){
    const dynamicStyling = document.querySelector('.dynamic-style');
    dynamicStyling.innerHTML = `${selector} { ${property}: ${value} }`;
}
function scale(amount) {
    // adds style 'zoom' to the canvas and passes amount*100 on
    const styler = document.querySelector('.zoom-styler');
    styler.innerHTML = `body { zoom: ${amount*100}% }`;
    document.head.appendChild(styler);

    // ! Zoom is disabled for now.
}

// Set max and min value a number can be, and return it.
function limit(max, min, value){
    if(value > max){
        value = max;
    } else if(value < min){
        value = min;
    }
    return value;
}

function canvas(options){
    const canvasObject = document.querySelector('.canvas');

    // Related to zooming in canvas
    canvasObject.addEventListener('wheel', e => {
        const delta = limit(options.maxZoomLevel, options.minZoomLevel, options.currentZoomLevel*100 - e.deltaY*options.strength);
        // zoomBox(Math.floor(delta))

        // scale(delta/100);
        // style('.canvas','transform', `translate(${options.currentPan.X}px, ${options.currentPan.Y}px)`);
        options.currentZoomLevel = delta/100

    }, {passive: true});
    
    
    
    
    
    // Related to panning canvas.
    
    // There will be two listeners. When mousedown is triggered, and mousemove is triggered, the user is officially 'panning'.
    // When mouseup is triggered, the user is officially 'not panning'.
    // The following code will obtain the amount the mouse has moved since mousedown, and apply it to the canvas.
    
    const states = {
        triggeredMouseDown: false,
        triggeredMouseMove: false,
        triggeredMouseUp: false,
        
        amountXMovedLastTime: 0,
        amountYMovedLastTime: 0,
        
        amountXMovedWhenStarted: 0,
        amountYMovedWhenStarted: 0,
        
        X:0,
        Y:0
    };
    const centerX = canvasObject.offsetWidth / 2;
    const centerY = canvasObject.offsetHeight / 2;
    style(
        '.canvas',
        'transform',
        `translate(${-centerX}px, ${-centerY}px)  scale(${
            options.currentZoomLevel
        })`
    );
    canvasObject.addEventListener('mousedown', e => {
        states.triggeredMouseDown = true;
        states.triggeredMouseUp = false;
        states.amountXMovedWhenStarted = e.clientX;
        states.amountYMovedWhenStarted = e.clientY;
    });
    canvasObject.addEventListener('mousemove', e => {
        if(states.triggeredMouseDown && !states.triggeredMouseUp){
            states.triggeredMouseMove = true;

            // Calculate how much mouse has moved since mousedown.
            const amountXMoved = e.clientX - states.amountXMovedWhenStarted;
            const amountYMoved = e.clientY - states.amountYMovedWhenStarted;
            
            const x = amountXMoved + states.amountXMovedLastTime;
            const y = amountYMoved + states.amountYMovedLastTime;
            const centerX = canvasObject.offsetWidth/2;
            const centerY = canvasObject.offsetHeight/2;
            style('.canvas', 'transform', `translate(${-centerX + x}px, ${-centerY + y}px)`);
            options.currentPan.X = x;
            options.currentPan.Y = y;

            states.X = x;
            states.Y = y;
        }
    });
    canvasObject.addEventListener('mouseup', e => {
        states.triggeredMouseUp = true;
        states.triggeredMouseDown = false;
        states.triggeredMouseMove = false;
        states.amountXMovedLastTime = states.X;
        states.amountYMovedLastTime = states.Y;
    });
}

// * Options for movements
scale(clientOptions.zoomLevel)

// ! Panning (!DISABLED!)
// canvas(clientOptions);