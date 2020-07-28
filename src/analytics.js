import * as $ from 'jquery';

function createAnalytics() {
    let counter = 0; 
    let isDestroyed = false; 

    const listener = () => counter++; 

    $(document).on('click', listener);

    return {
        destroy() {
            $(document).off();
            isDestroyed = true; 
            return 'Analytics destroyed'; 
        },

        getClicks() {
            if (isDestroyed) {
                return 'Analytics is destroyed'
            }
            return counter;
        }
    }
}

window.analytics = createAnalytics(); 