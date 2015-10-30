export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider.state('guest', {
        abstract: true,
        templateUrl: 'app/layouts/guest.html'
    });

    $stateProvider.state('app', {
        abstract: true,
        templateUrl: 'app/layouts/app.html',
        resolve: {
            auth: function(User, $location, $state, Storage, $log) {
                'ngInject';

                if (!User.isAuthenticated()) {
                    Storage.set('authRedirect', $location.absUrl());

                    $log.debug('Not authorized');
                    $state.go('login');
                } else {
                    $log.debug('Authorized', User.getCurrentId());
                    return User.getCurrentId();
                }
            }
        }
    });

    $urlRouterProvider
        .otherwise('/');
}
