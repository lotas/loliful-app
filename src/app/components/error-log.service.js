'use strict';

export function ErrorLogService($window) {
    'ngInject';

    return {
        logError: logError
    };

    function logError(message) {
        if (angular.isFunction($window.ga)) {
            window.ga('send', 'event', 'js', 'error', '', message);
        }
    }
}

export function exceptionConfig($provide) {
    'ngInject';

    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

function extendExceptionHandler($delegate, ErrorLogService) {
    'ngInject';

    return function(exception, cause) {
        ErrorLogService.logError(exception);
        $delegate(exception, cause);
    };
}
