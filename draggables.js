
function generate (object, parent) {
    let processed = '';
    object.forEach(draggable => {
        let template = `<div 
        class='create-flowy data-${draggable.category} glassy privacy basic p1 flex acenter jcenter column l noselect ${
				draggable.id
			}-draggable ${draggable.class ? draggable.class : ''}'
            data-tooltip='${draggable.name} - ${draggable.description}'
        >
            <div class='top-title flex acenter jcenter wf'>
                <i class='fa-solid fa-${draggable.icon} ${
			draggable.icon_color
		} flowy-object-icon'></i>

                <h2 class='ubuntu-weight wf ${draggable.icon_color}'>
                    ${draggable.title}
                </h2>
			</div>

            <h4 class='ubuntu-light wf'>
                ${
					draggable.editInfo
						? `<input class='wf flowy-info ubuntu-normal' type='text' placeholder='Click to Add info...' />`
						: ''
				}
            </h4>
            <h6 class='ubuntu-light wf'>${
				draggable.footer ? draggable.footer : ''
			}</h6>
        </div>`;
        processed+=template;
    });
    
    parent.innerHTML = processed;
}

// Categorisations:

function addCategories(categories){
    let output = '';
    categories.forEach(category => {
        let baseplate = `
        <div class="category-option glassy pane btn flex acenter jcenter hf ${category.start ? 'category-active' : ''}" data-tooltip="${category.tooltip}" data-category-owner="${category.name}">
            <i class="fa-solid fa-${category.icon} icon-full"></i>
        </div>
        `;
        output += baseplate;
    });
    document.querySelector('.categories-container').innerHTML = output;
}


function categorise() {
    const categories = document.querySelectorAll('*[data-category-owner]');
    categories.forEach(category => {
        const categoryName = category.dataset.categoryOwner;

        category.addEventListener('click', e => {

            if(categoryName !== '*') {
                const allItemsInTargetCategory = document.querySelectorAll(`.data-${categoryName}`);
                document.querySelectorAll('.create-flowy').forEach(item => {
                    item.classList.add('noshow');
                });
                allItemsInTargetCategory.forEach(item => {
                    item.classList.remove('noshow');
                });

                // Highlight handling
                document.querySelectorAll('*[data-category-owner]').forEach(item => {
                    item.classList.remove('category-active');
                });
                category.classList.add('category-active');
                
            } else {
                const allItemsInTargetCategory = document.querySelectorAll(`.create-flowy`);
                
                allItemsInTargetCategory.forEach(item => {
                    item.classList.remove('noshow');
                });
                
                // Highlight handling
                document.querySelectorAll('*[data-category-owner]').forEach(item => {
                    item.classList.remove('category-active');
                });
                category.classList.add('category-active');
            }
        })
    });

}
// baseplate function

const categoryInfo = [
    {
        name: '*',
        tooltip: 'All',
        icon: 'asterisk',
        start: true,
    },
    {
        name: 'computer',
        tooltip: 'Computers',
        icon: 'computer',
    },
    {
        name: 'decision',
        tooltip: 'Decision Trees',
        icon: 'network-wired',
    },
]


generate(
    data,
    document.querySelector('.category-content-container')
)
addCategories(categoryInfo)
categorise();
tooltipInit();
