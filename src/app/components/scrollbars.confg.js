'use strict';

export function scrollbarsConfig(ScrollBarsProvider) {
    'ngInject';

    ScrollBarsProvider.defaults = {
        axis: 'y',
        theme: 'minimal-dark',
        scrollButtons: {
            enable: false
        },
        advanced: {
            updateOnContentResize: true
        },
        setHeight: 400
    };
}
