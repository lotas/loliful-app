export function runBlock($log, $rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $log.debug('$stateChangeStart', toState, toStateParams);
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState) {
        $log.warn('$stateNotFound', unfoundState, fromState);
    });
}
