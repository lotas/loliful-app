export function authRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('login', {
            parent: 'guest',
            url: '/login',
            views: {
                'main@guest': {
                    templateUrl: 'app/main/auth/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            }
        });
}
