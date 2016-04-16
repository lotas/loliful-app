/**
 *
 * @param {$log} $log
 * @param {$rootScope} $rootScope
 * @param {User} User
 * @param {$state} $state
 * @param {Storage} Storage
 * @param {$location} $location
 * @param {$http} $http
 * @param apiAuth
 */
export function runBlock($log, $rootScope, User, $state, Storage, envName,
                         $location, $http, apiAuth, apiEndpoint, screenSize) {
    'ngInject';

    $http.defaults.headers.common.Authorization = apiAuth;

    $rootScope.envName = envName;
    $rootScope.isState = $state.is;
    $rootScope.stateIncludes = $state.includes;
    $rootScope.api = apiEndpoint;

    $rootScope.appLoaded = true;
    $rootScope.showStaticHeader = false;

    let dereg1 = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $log.debug('$stateChangeStart', toState, toStateParams);

        // Check for auth and send for authorization
        if (toState.data && toState.data.authRequired && !User.isAuthenticated()) {
            event.preventDefault();

            $log.debug('Prevent change, not authenticated');
            Storage.set('authRedirect', $location.url());
            $state.go('login');
        }
    });

    let dereg2 = $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState) {
        $log.warn('$stateNotFound', unfoundState, fromState);
        $state.go('not-found');
    });

    let dereg3 = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        $log.debug('$stateChangeSuccess', toState, fromState);
        $rootScope.showStaticHeader = !!toState.data.showStaticHeader;
    });

    $rootScope.$on('$destroy', () => {
        dereg1();
        dereg2();
        dereg3();
    });

    // responsive
    $rootScope.screen = {
        isPhone: screenSize.on('xs', match => $rootScope.screen.isPhone = match),
        isTablet: screenSize.on('sm, md', match => $rootScope.screen.isTablet = match),
        isDesktop: screenSize.on('lg', match => $rootScope.screen.isDesktop = match)
    };
}
