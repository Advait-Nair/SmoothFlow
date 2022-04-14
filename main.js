// Handle main window drag (disabled)
// drag(document.querySelector('.dragme'), document.querySelector('.toolbar'))

// Handle Flowy.js

flowy(document.querySelector('.canvas'))

// Context Menu

// All items and their functions in an array
const menu = [
    {
        icon: 'trash',
        name: 'delete-all',
        title: 'Delete All',
        whenClick: e => {
            flowy.deleteBlocks();
            flowy(document.querySelector('.canvas'))
        },
        style: 'red',
    }
]

contextify(menu)


// Handle Options and save loads

// Options
const preferencesElement = document.querySelector('.preferences');
preferencesElement.addEventListener('click', e => {
    // backup();
    modal(preferencesModalObject)
    // Generate preferences modal (Fetch it from seperate file)
});

// Saves
const performManualSave = document.querySelector('.save');
performManualSave.addEventListener('click', e => {
    const getCurrentProjectName = document.querySelector('.current-file-name-input').value;
    const projectObject = new Project(flowy.output(), null, getCurrentProjectName, null, null);
    save(getCurrentProjectName, projectObject);
});

// Change title when input is changed
const titleInput = document.querySelector('.current-file-name-input');

let inputContent = titleInput.value;
let lastInput = titleInput.value;
// User is a about to change name possibly, retrieve what's in the input
titleInput.addEventListener('click', e => {
    inputContent = titleInput.value;
    console.log(inputContent)
});

let isInputEmpty = false;
titleInput.addEventListener('keyup', e => {
    // Get Project Data (If it exists)
    const projectData = new LSHandler().retrieveObject(PREFIX + inputContent);
    
    console.log(inputContent, projectData)
    if(projectData && titleInput.value.trim() !== '') {
        // If project data exists, change the title in the metadata
        projectData.meta.title = titleInput.value;
        new LSHandler().removeObject(PREFIX + inputContent);
        new LSHandler().setObject(PREFIX + projectData.meta.title, projectData);
    } else if (titleInput.value.trim() == '') {
        isInputEmpty = true;
        lastInput = inputContent;
    }
    inputContent = titleInput.value;
});

titleInput.addEventListener('focusout', e => {
    if(isInputEmpty)
    titleInput.value = lastInput;
    isInputEmpty = false;
});



// TODO Create LocalStorage class handler for saving and loading