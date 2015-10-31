/**
 *
 * @param {$log} $log
 * @param {$rootScope} $rootScope
 * @param {User} User
 * @param {$state} $state
 * @param {Storage} Storage
 * @param {$location} $location
 */
export function runBlock($log, $rootScope, User, $state, Storage, $location) {
    'ngInject';

    $rootScope.isState = $state.is;
    $rootScope.stateIncludes = $state.includes;

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $log.debug('$stateChangeStart', toState, toStateParams);

        // Check for auth and send for authorization
        if (toState.data && toState.data.authRequired && !User.isAuthenticated()) {
            event.preventDefault();

            $log.debug('Prevent change, not authenticated');
            Storage.set('authRedirect', $location.url());
            $state.go('login');
        }
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState) {
        $log.warn('$stateNotFound', unfoundState, fromState);
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $log.debug('$stateChangeSuccess', toState, fromState);
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $log.debug('$stateChangeError', toState, fromState, error);
    });
}
