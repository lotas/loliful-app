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

    User.getCurrent().$promise.then(user => {
        if ($window.trackJs && user && user.id) {
            $window.trackJs.configure({
                userId: String(user.id)
            });
        }
    });
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