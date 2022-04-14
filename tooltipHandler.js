const tooltip = document.querySelector('.tooltip');
const contentMaster = document.querySelector('.content-master');

const tooltipActivatedElements = [];

function tooltipInit(){
    document.querySelectorAll('*').forEach(element => {
        if(element.dataset.tooltip) {
            tooltipActivatedElements.push(element);
        }
    })
    function resetTooltip(){
        tooltip.style.top = `-100px`;
        tooltip.style.left = `-100px`;
    }
    
    function adjust (e) {
        const windowX = window.innerWidth;
        const windowY = window.innerHeight;
        
        const tooltipSizeX = tooltip.offsetWidth;
        const tooltipSizeY = tooltip.offsetHeight;
        if(windowX / 2 < e.clientX) {
            tooltip.style.top = `${e.clientY}px`;
            tooltip.style.left = `${e.clientX - tooltipSizeX}px`;
        }
        else {
            tooltip.style.top = `${e.clientY}px`;
            tooltip.style.left = `${e.clientX}px`;
        }
    }
    
    tooltipActivatedElements.forEach(item => {
        item.addEventListener('mouseenter', e => {
            if(tooltip.textContent != item.dataset.toolip)
            tooltip.textContent = item.dataset.tooltip;
    
            if(tooltip.classList.contains('hidden'))
            tooltip.classList.remove('hidden')
        });
    
        item.addEventListener('mousemove', adjust);
    
        item.addEventListener('mouseleave', e => {
            tooltip.textContent = item.dataset.tooltip;
            tooltip.classList.add('hidden')
            resetTooltip();
        })
    })
}
