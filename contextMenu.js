// Context Menu

// Initialise context menu

function contextify(menu) {
	let innerHTML = '';

	menu.forEach(item => {
		innerHTML += `
        <div class="ctx-item flex acenter jcenter c red-context-bleed ${item.class ? item.class : ''} ${item.name}">
                <div class="ctx-icon flex acenter jcenter">
                    <i class="fa-solid fa-${item.icon}"></i>
                </div>

                <div class="ctx-title l">
                    ${item.title}
                </div>

        </div>
        `;
	});
    document.querySelector('.context-menu').innerHTML = innerHTML;

    menu.forEach(item => {
        document.querySelector(`.${item.name}`).addEventListener('mouseup', e => {
            item.whenClick(e);
            const contextMenu = document.querySelector('.context-menu');
            contextMenu.classList.add('hidden');
        });
    })
}


// When activated context menu

let isContextOpen = false;
const animationSpaced = 20;
document.addEventListener('contextmenu', e => {
	e.preventDefault();

	const menu = document.querySelector('.context-menu');


    // Totally not stolen from tooltipHandler.js
    function fadeMenu() {
        menu.classList.add('hidden')
        menu.style.top = Number(menu.style.top.replace('px','')) - animationSpaced + 'px';
    }
    function bringMenu(e) {
        adjust(e, () => {
            menu.style.top = Number(menu.style.top.replace('px','')) + animationSpaced + 'px';
            setTimeout(() => {
                menu.classList.remove('hidden')
                menu.style.top = Number(menu.style.top.replace('px','')) - animationSpaced + 'px';
            }, 100)
        });
    }

    function adjust(e, cb) {
        const windowX = window.innerWidth;
        const windowY = window.innerHeight;

        const menuSizeX = menu.offsetWidth;
        const menuSizeY = menu.offsetHeight;
        let toBeX = 0;
        let toBeY = 0;
        if (windowX / 1.2 < e.clientX) {
            // menu.style.top = `${e.clientY}px`;
            // menu.style.left = `${e.clientX - menuSizeX}px`;
            toBeX = e.clientX - menuSizeX;
        } else {
            toBeX = e.clientX;
        }

        if(windowY / 1.2 < e.clientY) {
            toBeY = e.clientY - menuSizeY;
        } else {
            toBeY = e.clientY;
        }

        menu.style.top = `${toBeY}px`;
        menu.style.left = `${toBeX}px`;

        if(cb) cb();
    }
    function isWithinMargin(test, object, margin) {
        const max = object + margin;
        const min = object - margin;
        let isWithin = false;

        if(test >= min && test <= max) {
            isWithin = true;
        }

        return isWithin;
    }

    function userHasNotMoved(){
        const top = menu.style.top.replace('px','');
        const left = menu.style.left.replace('px','');
        if(isWithinMargin(e.clientY, top, 5) && isWithinMargin(e.clientX, left, 5)){
            return true;
        }
    }

    // Show and hide context menu
    if (!isContextOpen) {
        isContextOpen = true;
        bringMenu(e);
    } else if (isContextOpen && userHasNotMoved()) {
        isContextOpen = false;
        fadeMenu();
        setTimeout(() => {
            adjust(e);
        }, 100)
    } else  {
        isContextOpen = true;
        adjust(e);
    }
});
