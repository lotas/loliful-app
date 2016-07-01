/**
 *
 * @param {$log} $log
 * @param {$rootScope} $rootScope
 * @param {User} User
 * @param {$state} $state
 * @param {Storage} Storage
 * @param envName
 * @param {$location} $location
 * @param {$http} $http
 * @param apiAuth
 * @param apiEndpoint
 * @param screenSize
 */
export function runBlock($log, $rootScope, User, $state, Storage, envName,
                         $location, $http, apiAuth, apiEndpoint, screenSize) {
    'ngInject';

    if (apiAuth) {
        $http.defaults.headers.common.Authorization = apiAuth;
    }

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
        $rootScope.showStaticHeader = toState && toState.data ? !!toState.data.showStaticHeader : false;
        $rootScope.previousState = fromState.name;
    });

    $rootScope.$on('$destroy', () => {
        dereg1();
        dereg2();
        dereg3();
    });

    // responsive
    $rootScope.screen = {
        isTabletOrMobile: isTabletOrModal(),
        isPhone: screenSize.on('xs', match => $rootScope.screen.isPhone = match),
        isTablet: screenSize.on('sm, md', match => $rootScope.screen.isTablet = match),
        isDesktop: screenSize.on('lg', match => $rootScope.screen.isDesktop = match)
    };

    $rootScope.swipeLeft = emitSwipeLeftEvent;
    $rootScope.swipeRight = emitSwipeRightEvent;

    function emitSwipeLeftEvent(evt) {
        $rootScope.$emit('swipe', 'left', evt);
    }
    function emitSwipeRightEvent(evt) {
        $rootScope.$emit('swipe', 'right', evt);
    }

    function isTabletOrModal() {
        var ua = navigator && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';

        return /(android|iphone|ipod|ipad)/.test(ua);
    }
}
