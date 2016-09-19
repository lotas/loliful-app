'use strict';

angular.module('loliful.appState', [])
    .run(initAppStates);


function initAppStates($rootScope, $log) {
    'ngInject';

    $rootScope.appState = {
        online: isNavigatorOnline(),
        offline: !isNavigatorOnline(),
        virtualKeyboard: hasVirtualKeyboard()
    };

    window.addEventListener('online', () => setOnlineState(true), false);
    window.addEventListener('offline', () => setOnlineState(false), false);

    function setOnlineState(isOnline) {
        $rootScope.appState.online = isOnline;
        $rootScope.appState.offline = !isOnline;
        $log.debug(`Online state change, isOnline: ${isOnline}`);
    }
}

function isNavigatorOnline() {
    return window && window.navigator && window.navigator.onLine;
}

function hasVirtualKeyboard() {
    return false;
}