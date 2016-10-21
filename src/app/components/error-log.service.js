'use strict';

export function ErrorLogService($window) {
    'ngInject';

    return {
        logError: logError
    };

    function logError(message) {
        if ($window.trackJs && $window.trackJs.track) {
            $window.trackJs.track(message);
        }
    }
}

export function configureTrackJs(User, $window) {
    'ngInject';

    if ($window.trackJs && $window.localStorage && $window.localStorage['$LoopBack$currentUserId']) {
        $window.trackJs.configure({
            userId: String($window.localStorage['$LoopBack$currentUserId'])
        });
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
