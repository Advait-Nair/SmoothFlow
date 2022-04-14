// Modal handler

// !  WARNING - modal() USES ARRAY DESTRUCTURING. PASS IN ARGUMENTS AS AN ARRAY.


const modalObject = document.querySelector('.main-modal-container');

function hideModal() {
    document.querySelector('.modal').classList.add('hidden-z-1000');
}
function showModal() {
    document.querySelector('.modal').classList.remove('hidden-z-1000');
}

const functionStack = [];
const m = {


    text: (t,size, classItem) => {
        return `<div class="modal-text ${classItem ? classItem : ''}" style="font-size:${!size ? 1 : size}rem">${t}</div>`;
    },


    button: (t, cb, classItem) => {
        const id = unique();

        functionStack.push({
            cb: function(element) {
                if(!element) return;
                element.addEventListener('click', cb);
            },
            executeOnCall: () => {
            return document.querySelector(`.${id}`);
        }});

        return `<button class="${classItem ? classItem : ''} ${id}">${t}</button>`;

    },


    input: (placeholder, cb, baseValue, footerText, classItem) => {
        const id = unique();
        functionStack.push({cb, executeOnCall: ()=> {
            return document.querySelector(`.${id}`);
        }});

        return `
        <input class="${classItem ? classItem : ''} ${id} ubuntu-normal input-styled modal-input" placeholder="${placeholder}" value="${baseValue ? baseValue : ''}"></input>
        <div class="modal-item-footer-text">${footerText ? footerText : ''}</div>
        `;
    },


    toggle: (whereIsValueStored, cb, identifier, classItem) => {
        const id = unique();
        functionStack.push({cb: element => {
            if(!element) return;
            element.classList.add(`switch-${whereIsValueStored[identifier] ? 'on' : 'off'}`);
            
            let isOn = whereIsValueStored[identifier];
            element.addEventListener('click', e => {
                if(element.classList.contains('switch-on')){
                    isOn = false;
                    element.classList.remove('switch-on');
                    element.classList.add('switch-off');
                } else {
                    isOn = true;
                    element.classList.remove('switch-off');
                    element.classList.add('switch-on');
                }
                cb(isOn);
            })
        }, executeOnCall: () => {
            return document.querySelector(`.${id}`);
        }});

        return `
        <div class="switch ${id} ${identifier ? identifier : ''} ${classItem ? classItem : ''}">
            <div class="switch-tab"></div>
        </div>
        `;
    },


    div: (classItem, children, cb) => {
        let innerHTML = '';
        children.forEach(element => {
            innerHTML += element;
        });

        const id = unique();

        functionStack.push({
            cb: function (element) {
                if (!element) return;
                element.addEventListener('click', cb);
            },
            executeOnCall: () => {
                return document.querySelector(`.${id}`);
            },
        });
        return `<div class="${classItem ? classItem : ''} ${id}">${innerHTML}</div>`;
    }
}

function modal([
	title,
	optionsTop,
    optionsLeft,
	optionsRight,
	optionsBottom,
    classItem,
	onLeave
]) {
	let modalContentTop = '';
	optionsTop.forEach(element => {
		modalContentTop += element;
	});
	let modalContentLeft = '';
	optionsLeft.forEach(element => {
		modalContentLeft += element;
	});
	let modalContentRight = '';
	optionsRight.forEach(element => {
		modalContentRight += element;
	});
	let modalContentBottom = '';
	optionsBottom.forEach(element => {
		modalContentBottom += element;
	});

	const innerHTMLForModal = `
    <div class="modal-content p1">
        <div class="modal-header wf flex acenter jstart">
            <span class="close-modal" onclick="hideModal()">
                <i class="fa-solid fa-times"></i>
            </span>
            <h2 class="modal-title noselect">${title}</h2>
        </div>

        <!-- Modal Content -->
        <div class="modal-top">
            ${modalContentTop}
        </div>
        <div class="modal-content grid grid-2">

            <div class="modal-left">
                ${modalContentLeft}
            </div>
            <div class="modal-right">
                ${modalContentRight}
            </div>
        </div>
        <div class="modal-bottom">
            ${modalContentBottom}
        </div>
    </div>
    `;
	modalObject.innerHTML = innerHTMLForModal;
	functionStack.forEach(item => {
		item.cb(item.executeOnCall());
	});
	showModal();
}


// * Uncomment this to see the example in action.
// const modalContentExample = [

//     // Title

//     'Modal Title',

//     // Top
//     [
//         m.text('Configure your options.',1.2),
//     ],
//     // Left
//     [
//         m.text('Basic',1),
//         m.input('Option 2', inputElement => {
//             inputElement.addEventListener('keyup', () => {
//                 console.log(inputElement.value);
//             });
    
    
//         }, '', 'Note this can affect your experience using this product.'),
//     ],
//     // Right
//     [
//         m.text('Account',1),
//         m.input('Option 2', inputElement => {
//             inputElement.addEventListener('keyup', () => {
//                 console.log(inputElement.value);
//             });


//         }, '', 'Note this can affect your experience using this product.'),
//     ],
//     // Bottom
//     [
//         m.div('flex acenter jcenter absolute bottom left wf p1', [
//             m.button('Cancel', e => {
//                 hideModal();
//             }, 'btn basic semi-strong p1 wh mr1 mt1 red-context-bleed ubuntu-normal cancel'),
//             m.button('Confirm', e => {
//                 hideModal();
//             }, 'btn basic semi-strong p1 wh ml1 mt1 blue-context-bleed ubuntu-normal cancel'),
//         ])
//     ],
//     'relative'
// ];

// modal(modalContentExample)


// * Later Notes

// I 'accidentally' made a really smart technique using callback functions.

// So you create an array called 'functionStack', which will contain some callback functions. (We will push them into the array later).

// After creating this stack, lets say the developer wants to insert a callback function when an element is clicked, for example. However, the element does not exist yet.

// So what we do, is take the developer's callback function, and push it into the stack, along with another function, created by us, that references the user's element. This function will return the element (which does not exist right now) when called.

// So when the element does exist, we loop through the stack, and call the callback, and pass in the function we created earlier.


