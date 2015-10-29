export function authRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('login', {
            parent: 'guest',
            url: '/login',
            templateUrl: 'app/main/auth/login.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
}
